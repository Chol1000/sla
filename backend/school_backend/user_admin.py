"""
Custom User admin:
- Adds Email field to the Add User form
- Sends a welcome email with login credentials when a new staff/superuser is created
- Does NOT include the admin URL in the email
"""
import threading
from django import forms
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model
from django.core.mail import EmailMultiAlternatives
from django.conf import settings

User = get_user_model()


class CustomUserCreationForm(UserCreationForm):
    email = forms.EmailField(
        required=True,
        label='Email address',
        help_text='Required. The welcome email with login details will be sent to this address.',
    )
    first_name = forms.CharField(required=False, label='First name')
    last_name  = forms.CharField(required=False, label='Last name')

    class Meta(UserCreationForm.Meta):
        model  = User
        fields = ('username', 'email', 'first_name', 'last_name')


def _send_welcome_email(user, raw_password):
    """Send welcome email in a background thread."""
    if not user.email:
        return

    recipients = getattr(settings, 'ADMIN_EMAILS', [])
    # Always send to the new user themselves
    to = [user.email]

    display_name = user.get_full_name() or user.username
    plain = (
        f'Hello {display_name},\n\n'
        f'You have been added as an admin on the St. Lawrence Academy system.\n\n'
        f'Your login details:\n'
        f'  Username: {user.username}\n'
        f'  Password: {raw_password}\n\n'
        f'Please log in and change your password immediately.\n\n'
        f'— St. Lawrence Academy'
    )

    html = f'''<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:24px;font-family:Arial,sans-serif;color:#222;background:#fff;">
  <p style="margin:0 0 4px;font-size:12px;color:#999;">St. Lawrence Academy</p>
  <h2 style="margin:0 0 20px;font-size:18px;font-weight:700;color:#111;">Welcome, {display_name}</h2>
  <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#222;">
    You have been added as an admin on the St. Lawrence Academy system.
  </p>
  <p style="margin:0 0 6px;font-size:14px;color:#222;"><strong>Username:</strong> {user.username}</p>
  <p style="margin:0 0 20px;font-size:14px;color:#222;"><strong>Temporary Password:</strong> {raw_password}</p>
  <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#555;">
    Please log in and change your password immediately after your first sign-in.
  </p>
  <hr style="margin:20px 0;border:none;border-top:1px solid #eee;">
  <p style="margin:0;font-size:12px;color:#bbb;">St. Lawrence Academy — Juba, South Sudan</p>
</body>
</html>'''

    def _send():
        try:
            msg = EmailMultiAlternatives(
                subject='You have been added to St. Lawrence Academy — Login Details',
                body=plain,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=to,
            )
            msg.attach_alternative(html, 'text/html')
            msg.send(fail_silently=True)
        except Exception:
            pass

    threading.Thread(target=_send, daemon=True).start()


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm

    # Show email + name fields on the Add User page
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'first_name', 'last_name', 'password1', 'password2'),
        }),
    )

    def save_model(self, request, obj, form, change):
        # Capture raw password before hashing (only on creation)
        raw_password = None
        if not change:
            raw_password = form.cleaned_data.get('password1')

        super().save_model(request, obj, form, change)

        # Send welcome email to any new user with an email address
        if not change and raw_password and obj.email:
            _send_welcome_email(obj, raw_password)


# Unregister default and register custom
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)

# Hide Axes models from admin — they are internal security logs, not for daily use
from axes.models import AccessAttempt, AccessFailureLog, AccessLog
for _axes_model in (AccessAttempt, AccessFailureLog, AccessLog):
    try:
        admin.site.unregister(_axes_model)
    except admin.sites.NotRegistered:
        pass
