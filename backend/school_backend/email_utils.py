"""
Shared email utility for SLA backend.
- Sends HTML emails with a clean design
- Always runs in a background thread so submissions never wait for email delivery
- Gets admin recipients from Django staff/superusers (no hardcoding)
"""
import threading
import html as html_lib
from django.core.mail import EmailMultiAlternatives
from django.conf import settings


def get_admin_emails():
    """Return email addresses of all active Django staff/superusers."""
    try:
        from django.contrib.auth import get_user_model
        User = get_user_model()
        emails = list(
            User.objects.filter(is_active=True, is_staff=True)
            .exclude(email='')
            .values_list('email', flat=True)
        )
        return emails if emails else getattr(settings, 'ADMIN_EMAILS', [])
    except Exception:
        return getattr(settings, 'ADMIN_EMAILS', [])


def _html_email(title, rows, footer_note=''):
    """Plain email — no tables, no colours, reads like a normal email.
    All user-supplied values are HTML-escaped to prevent injection in email clients.
    """
    def esc(v):
        return html_lib.escape(str(v)) if v else '—'

    lines_html = ''.join(
        f'<p style="margin:0 0 10px;font-size:14px;color:#222;line-height:1.6;">'
        f'<strong>{html_lib.escape(str(label))}:</strong> {esc(value)}</p>'
        for label, value in rows
    )
    safe_title  = html_lib.escape(str(title))
    safe_footer = html_lib.escape(str(footer_note)) if footer_note else ''
    footer_html = f'<p style="margin:16px 0 0;font-size:12px;color:#999;">{safe_footer}</p>' if safe_footer else ''
    return f'''<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:24px;font-family:Arial,sans-serif;color:#222;background:#fff;">
  <p style="margin:0 0 4px;font-size:12px;color:#999;">St. Lawrence Academy</p>
  <h2 style="margin:0 0 20px;font-size:18px;font-weight:700;color:#111;">{safe_title}</h2>
  {lines_html}
  <hr style="margin:20px 0;border:none;border-top:1px solid #eee;">
  <p style="margin:0;font-size:12px;color:#bbb;">Automated notification — St. Lawrence Academy</p>
  {footer_html}
</body>
</html>'''


def send_notification(subject, rows, plain_text, footer_note=''):
    """
    Send an HTML notification email to all admin staff users.
    Runs in a background thread — never blocks the HTTP response.

    Args:
        subject    : Email subject line
        rows       : list of (label, value) for the email body table
        plain_text : Fallback plain text version
        footer_note: Optional small note in the footer
    """
    recipients = get_admin_emails()
    if not recipients:
        return

    html_body = _html_email(subject, rows, footer_note)

    def _send():
        try:
            msg = EmailMultiAlternatives(
                subject=f'[SLA] {subject}',
                body=plain_text,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=recipients,
            )
            msg.attach_alternative(html_body, 'text/html')
            msg.send(fail_silently=True)
        except Exception:
            pass

    threading.Thread(target=_send, daemon=True).start()
