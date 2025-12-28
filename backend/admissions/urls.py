from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegistrationStatusViewSet, NurseryRegistrationViewSet, PrimaryRegistrationViewSet, SecondaryRegistrationViewSet

router = DefaultRouter()
router.register(r'status', RegistrationStatusViewSet, basename='registration-status')
router.register(r'registration-status', RegistrationStatusViewSet, basename='registration-status-alt')
router.register(r'nursery', NurseryRegistrationViewSet, basename='nursery-registration')
router.register(r'primary', PrimaryRegistrationViewSet, basename='primary-registration')
router.register(r'secondary', SecondaryRegistrationViewSet, basename='secondary-registration')

urlpatterns = [
    path('', include(router.urls)),
]
