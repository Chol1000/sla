from rest_framework import serializers
from school_backend.security import (
    sanitize_text, validate_name, validate_email_field,
    validate_phone_field, validate_text,
)
from .models import ContactMessage, NewsletterSubscription


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'
        read_only_fields = ['created_at', 'is_read']

    def validate_name(self, value):
        validate_name(value, field='Name')
        return sanitize_text(value)

    def validate_email(self, value):
        validate_email_field(value)
        return sanitize_text(value)

    def validate_phone(self, value):
        if value:
            validate_phone_field(value)
            return sanitize_text(value)
        return value

    def validate_message(self, value):
        validate_text(value, field='Message', min_len=10, max_len=5000)
        return sanitize_text(value)


class NewsletterSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscription
        fields = '__all__'
        read_only_fields = ['subscribed_at', 'is_active']

    def validate_name(self, value):
        validate_name(value, field='Name')
        return sanitize_text(value)

    def validate_email(self, value):
        validate_email_field(value)
        return sanitize_text(value)
