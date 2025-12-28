from rest_framework import serializers
from .models import RegistrationStatus, NurseryRegistration, PrimaryRegistration, SecondaryRegistration

class RegistrationStatusSerializer(serializers.ModelSerializer):
    is_deadline_passed = serializers.SerializerMethodField()
    
    class Meta:
        model = RegistrationStatus
        fields = '__all__'
    
    def get_is_deadline_passed(self, obj):
        return obj.is_deadline_passed()

class NurseryRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = NurseryRegistration
        fields = '__all__'

class PrimaryRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrimaryRegistration
        fields = '__all__'

class SecondaryRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SecondaryRegistration
        fields = '__all__'
