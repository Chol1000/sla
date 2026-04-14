from rest_framework import serializers
from school_backend.security import (
    sanitize_text, validate_name, validate_email_field,
    validate_text, validate_url, validate_image_upload,
)
from .models import Alumni


class AlumniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alumni
        # email is excluded — it's private contact info, not for public display
        fields = ['id', 'name', 'graduation_year', 'title', 'short_desc', 'full_desc',
                  'image', 'linkedin', 'twitter', 'facebook', 'instagram', 'order']


class AlumniSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alumni
        fields = ['name', 'graduation_year', 'title', 'short_desc', 'full_desc', 'image', 'email']

    def validate_name(self, value):
        validate_name(value, field='Name')
        return sanitize_text(value)

    def validate_title(self, value):
        if value:
            validate_name(value, field='Title', min_len=2, max_len=200)
            return sanitize_text(value)
        return value

    def validate_email(self, value):
        if value:
            validate_email_field(value)
            return sanitize_text(value)
        return value

    def validate_graduation_year(self, value):
        if value:
            return sanitize_text(str(value))
        return value

    def validate_short_desc(self, value):
        if value:
            validate_text(value, field='Short bio', min_len=10, max_len=500)
            return sanitize_text(value)
        return value

    def validate_full_desc(self, value):
        if value:
            validate_text(value, field='Full bio', min_len=10, max_len=3000)
            return sanitize_text(value)
        return value

    def validate_image(self, value):
        validate_image_upload(value)
        return value

    def create(self, validated_data):
        validated_data['is_active'] = False
        return super().create(validated_data)
