from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import ContactMessage, NewsletterSubscription
from .serializers import ContactMessageSerializer, NewsletterSubscriptionSerializer

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    http_method_names = ['get', 'post']

class NewsletterSubscriptionViewSet(viewsets.ModelViewSet):
    queryset = NewsletterSubscription.objects.all()
    serializer_class = NewsletterSubscriptionSerializer
    http_method_names = ['get', 'post']
    
    def create(self, request, *args, **kwargs):
        email = request.data.get('email')
        if NewsletterSubscription.objects.filter(email=email).exists():
            return Response(
                {'error': 'This email is already subscribed to our newsletter.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        return super().create(request, *args, **kwargs)
