from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AlumniViewSet, AlumniSubmissionView

router = DefaultRouter()
router.register(r'profiles', AlumniViewSet, basename='alumni')

urlpatterns = [
    path('', include(router.urls)),
    path('submit/', AlumniSubmissionView.as_view(), name='alumni-submit'),
]
