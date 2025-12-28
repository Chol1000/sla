from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AlumniViewSet

router = DefaultRouter()
router.register(r'', AlumniViewSet, basename='alumni')

urlpatterns = [
    path('', include(router.urls)),
]
