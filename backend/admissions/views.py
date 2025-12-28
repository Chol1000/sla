from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import RegistrationStatus, NurseryRegistration, PrimaryRegistration, SecondaryRegistration
from .serializers import RegistrationStatusSerializer, NurseryRegistrationSerializer, PrimaryRegistrationSerializer, SecondaryRegistrationSerializer

class RegistrationStatusViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = RegistrationStatus.objects.all().order_by('-updated_at')
    serializer_class = RegistrationStatusSerializer

class NurseryRegistrationViewSet(viewsets.ModelViewSet):
    queryset = NurseryRegistration.objects.all()
    serializer_class = NurseryRegistrationSerializer
    http_method_names = ['get', 'post']
    
    def create(self, request, *args, **kwargs):
        reg_status = RegistrationStatus.objects.first()
        if not reg_status or not reg_status.is_open or reg_status.is_deadline_passed():
            return Response(
                {'error': 'Registration is currently closed or deadline has passed'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Validate term and year match
        if request.data.get('term') != reg_status.term or request.data.get('year') != reg_status.year:
            return Response(
                {'error': f'Please select {reg_status.term}, {reg_status.year}. Registration is only open for this term.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        return super().create(request, *args, **kwargs)

class PrimaryRegistrationViewSet(viewsets.ModelViewSet):
    queryset = PrimaryRegistration.objects.all()
    serializer_class = PrimaryRegistrationSerializer
    http_method_names = ['get', 'post']
    
    def create(self, request, *args, **kwargs):
        reg_status = RegistrationStatus.objects.first()
        if not reg_status or not reg_status.is_open or reg_status.is_deadline_passed():
            return Response(
                {'error': 'Registration is currently closed or deadline has passed'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Validate term and year match
        if request.data.get('term') != reg_status.term or request.data.get('year') != reg_status.year:
            return Response(
                {'error': f'Please select {reg_status.term}, {reg_status.year}. Registration is only open for this term.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        return super().create(request, *args, **kwargs)

class SecondaryRegistrationViewSet(viewsets.ModelViewSet):
    queryset = SecondaryRegistration.objects.all()
    serializer_class = SecondaryRegistrationSerializer
    http_method_names = ['get', 'post']
    
    def create(self, request, *args, **kwargs):
        reg_status = RegistrationStatus.objects.first()
        if not reg_status or not reg_status.is_open or reg_status.is_deadline_passed():
            return Response(
                {'error': 'Registration is currently closed or deadline has passed'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Validate term and year match
        if request.data.get('term') != reg_status.term or request.data.get('year') != reg_status.year:
            return Response(
                {'error': f'Please select {reg_status.term}, {reg_status.year}. Registration is only open for this term.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        return super().create(request, *args, **kwargs)
