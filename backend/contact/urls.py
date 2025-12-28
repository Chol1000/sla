from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContactMessageViewSet, NewsletterSubscriptionViewSet

router = DefaultRouter()
router.register(r'messages', ContactMessageViewSet, basename='contact-message')
router.register(r'newsletter', NewsletterSubscriptionViewSet, basename='newsletter')

urlpatterns = [
    path('', include(router.urls)),
]
