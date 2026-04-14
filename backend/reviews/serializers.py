from rest_framework import serializers
from school_backend.security import sanitize_text, validate_name, validate_text
from .models import Review


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Review
        fields = ['id', 'name', 'role', 'reviewer_type', 'rating', 'text', 'created_at']
        read_only_fields = ['id', 'created_at']

    def validate_name(self, value):
        validate_name(value, field='Name', max_len=150)
        return sanitize_text(value)

    def validate_role(self, value):
        if value:
            validate_name(value, field='Role', min_len=2, max_len=100)
            return sanitize_text(value)
        return value

    def validate_rating(self, value):
        if not 1 <= value <= 5:
            raise serializers.ValidationError('Rating must be between 1 and 5.')
        return value

    def validate_text(self, value):
        validate_text(value, field='Review', min_len=10, max_len=2000)
        return sanitize_text(value)
