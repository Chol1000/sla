from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from school_backend.email_utils import send_notification
from .models import RegistrationStatus, HiringAnnouncement, CampusVisitRequest
from .serializers import (
    RegistrationStatusSerializer, HiringAnnouncementSerializer,
    CampusVisitRequestSerializer,
)


class VisitRateThrottle(AnonRateThrottle):
    scope = 'visit'


class RegistrationStatusViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = RegistrationStatus.objects.all().order_by('-updated_at')
    serializer_class = RegistrationStatusSerializer


class HiringAnnouncementViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HiringAnnouncement.objects.filter(is_active=True).order_by('-created_at')
    serializer_class = HiringAnnouncementSerializer


class CampusVisitRequestViewSet(viewsets.ModelViewSet):
    queryset = CampusVisitRequest.objects.all()
    serializer_class = CampusVisitRequestSerializer
    http_method_names = ['post']
    throttle_classes  = [VisitRateThrottle]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            d = serializer.validated_data
            send_notification(
                subject=f'Campus Visit Request — {d.get("name", "")}',
                rows=[
                    ('Name',           d.get('name', '')),
                    ('Email',          d.get('email', '') or None),
                    ('Phone',          d.get('phone', '')),
                    ('Preferred Date', str(d.get('preferred_date', '')) or None),
                    ('Preferred Time', d.get('preferred_time', '') or None),
                    ('Interested In',  d.get('interested_in', '') or None),
                    ('No. of Adults',  d.get('number_of_adults', '') or None),
                    ('Notes',          d.get('notes', '') or None),
                ],
                plain_text=(
                    f'Campus visit request from {d.get("name", "")}.\n'
                    f'Date: {d.get("preferred_date", "")}\n'
                    f'Phone: {d.get("phone", "")}'
                ),
            )
            return Response(
                {'message': 'Your visit request has been received. We will contact you to confirm.'},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
