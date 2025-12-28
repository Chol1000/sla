from rest_framework import viewsets
from .models import Alumni
from .serializers import AlumniSerializer

class AlumniViewSet(viewsets.ModelViewSet):
    queryset = Alumni.objects.filter(is_active=True)
    serializer_class = AlumniSerializer
    
    def get_queryset(self):
        if self.action == 'list' or self.action == 'retrieve':
            return Alumni.objects.filter(is_active=True)
        return Alumni.objects.all()
