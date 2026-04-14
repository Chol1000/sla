from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegistrationStatusViewSet, HiringAnnouncementViewSet, CampusVisitRequestViewSet

router = DefaultRouter()
router.register(r'status', RegistrationStatusViewSet, basename='registration-status')
router.register(r'hiring', HiringAnnouncementViewSet, basename='hiring-announcement')
router.register(r'visit-requests', CampusVisitRequestViewSet, basename='visit-request')

urlpatterns = [
    path('', include(router.urls)),
]
