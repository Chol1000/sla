from rest_framework import viewsets
from .models import StudentLeader
from .serializers import StudentLeaderSerializer

class StudentLeaderViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = StudentLeader.objects.filter(is_active=True)
    serializer_class = StudentLeaderSerializer
