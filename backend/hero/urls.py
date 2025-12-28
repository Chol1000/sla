from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HeroSectionViewSet

router = DefaultRouter()
router.register(r'sections', HeroSectionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
