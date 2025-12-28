from rest_framework import viewsets
from .models import CampusTour
from .serializers import CampusTourSerializer

class CampusTourViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CampusTour.objects.filter(is_active=True)
    serializer_class = CampusTourSerializer
