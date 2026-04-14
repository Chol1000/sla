from rest_framework import serializers
from django.utils import timezone
from school_backend.security import (
    sanitize_text, validate_name, validate_email_field,
    validate_phone_field, validate_text,
)
from .models import RegistrationStatus, HiringAnnouncement, CampusVisitRequest


class RegistrationStatusSerializer(serializers.ModelSerializer):
    is_deadline_passed = serializers.SerializerMethodField()

    class Meta:
        model = RegistrationStatus
        fields = '__all__'

    def get_is_deadline_passed(self, obj):
        return obj.is_deadline_passed()


class HiringAnnouncementSerializer(serializers.ModelSerializer):
    is_deadline_passed = serializers.SerializerMethodField()

    class Meta:
        model = HiringAnnouncement
        fields = '__all__'

    def get_is_deadline_passed(self, obj):
        return obj.is_deadline_passed()


class CampusVisitRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CampusVisitRequest
        fields = ['id', 'name', 'phone', 'email', 'preferred_date', 'preferred_time',
                  'number_of_adults', 'interested_in', 'notes', 'created_at']
        read_only_fields = ['id', 'created_at']

    def validate_name(self, value):
        validate_name(value, field='Name')
        return sanitize_text(value)

    def validate_phone(self, value):
        validate_phone_field(value)
        return sanitize_text(value)

    def validate_email(self, value):
        if value:
            validate_email_field(value)
            return sanitize_text(value)
        return value

    def validate_notes(self, value):
        if value:
            validate_text(value, field='Notes', min_len=1, max_len=1000)
            return sanitize_text(value)
        return value

    def validate_preferred_date(self, value):
        if value:
            if value < timezone.now().date():
                raise serializers.ValidationError('Preferred date cannot be in the past.')
            if value.weekday() >= 5:
                raise serializers.ValidationError('Campus visits are only available Monday – Friday.')
        return value
