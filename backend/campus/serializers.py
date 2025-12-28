from rest_framework import serializers
from .models import CampusTour

class CampusTourSerializer(serializers.ModelSerializer):
    class Meta:
        model = CampusTour
        fields = '__all__'
