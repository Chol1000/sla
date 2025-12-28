from rest_framework import serializers
from .models import HeroSection, HeroImage

class HeroImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroImage
        fields = ['id', 'image', 'order']

class HeroSectionSerializer(serializers.ModelSerializer):
    images = HeroImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = HeroSection
        fields = '__all__'
