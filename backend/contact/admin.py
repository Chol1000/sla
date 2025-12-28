from django.contrib import admin
from .models import ContactMessage, NewsletterSubscription

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'is_read', 'created_at']
    list_filter = ['is_read', 'created_at']
    search_fields = ['name', 'email', 'phone', 'message']
    list_editable = ['is_read']
    readonly_fields = ['created_at']

@admin.register(NewsletterSubscription)
class NewsletterSubscriptionAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'is_active', 'subscribed_at']
    list_filter = ['is_active', 'subscribed_at']
    search_fields = ['name', 'email']
    list_editable = ['is_active']
    readonly_fields = ['subscribed_at']
