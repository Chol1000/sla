from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CampusTourViewSet

router = DefaultRouter()
router.register(r'tours', CampusTourViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
