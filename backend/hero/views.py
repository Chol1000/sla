from rest_framework import viewsets
from .models import HeroSection
from .serializers import HeroSectionSerializer

class HeroSectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HeroSection.objects.filter(is_active=True).prefetch_related('images')
    serializer_class = HeroSectionSerializer
