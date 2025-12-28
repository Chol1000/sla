from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentLeaderViewSet

router = DefaultRouter()
router.register(r'', StudentLeaderViewSet, basename='leadership')

urlpatterns = [
    path('', include(router.urls)),
]
