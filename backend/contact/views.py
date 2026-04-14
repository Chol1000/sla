from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.throttling import AnonRateThrottle
from school_backend.email_utils import send_notification
from .models import ContactMessage, NewsletterSubscription
from .serializers import ContactMessageSerializer, NewsletterSubscriptionSerializer


class ContactRateThrottle(AnonRateThrottle):
    scope = 'contact'


class NewsletterRateThrottle(AnonRateThrottle):
    scope = 'newsletter'


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]
    throttle_classes = [ContactRateThrottle]
    http_method_names = ['post']   # No GET — contact messages are private PII

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # Use validated (sanitized) data, never raw request.data
            d = serializer.validated_data
            send_notification(
                subject=f'New Contact Message — {d.get("name", "")}',
                rows=[
                    ('Name',    d.get('name', '')),
                    ('Email',   d.get('email', '')),
                    ('Phone',   d.get('phone', '') or None),
                    ('Message', d.get('message', '')),
                ],
                plain_text=(
                    f'New contact message from {d.get("name", "")}:\n\n'
                    f'{d.get("message", "")}\n\n'
                    f'Reply to: {d.get("email", "")}'
                ),
                footer_note=f'Reply directly to: {d.get("email", "")}',
            )
            return Response(
                {'message': 'Your message has been received. We will contact you soon.'},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NewsletterSubscriptionViewSet(viewsets.ModelViewSet):
    queryset = NewsletterSubscription.objects.all()
    serializer_class = NewsletterSubscriptionSerializer
    permission_classes = [AllowAny]
    throttle_classes = [NewsletterRateThrottle]
    http_method_names = ['post']   # No GET — subscriber emails are private PII

    def create(self, request, *args, **kwargs):
        email = request.data.get('email', '').strip().lower()
        if NewsletterSubscription.objects.filter(email=email).exists():
            return Response(
                {'error': 'This email is already subscribed to our newsletter.'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'message': 'Successfully subscribed to newsletter!'},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
