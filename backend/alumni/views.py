from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.throttling import AnonRateThrottle
from school_backend.email_utils import send_notification
from .models import Alumni
from .serializers import AlumniSerializer, AlumniSubmissionSerializer


class AlumniSubmitThrottle(AnonRateThrottle):
    scope = 'alumni'


class AlumniViewSet(viewsets.ReadOnlyModelViewSet):
    """Read-only public API — alumni profiles are admin-managed."""
    queryset = Alumni.objects.filter(is_active=True)
    serializer_class = AlumniSerializer


class AlumniSubmissionView(generics.CreateAPIView):
    serializer_class = AlumniSubmissionSerializer
    parser_classes   = [MultiPartParser, FormParser]
    throttle_classes = [AlumniSubmitThrottle]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        d = request.data
        send_notification(
            subject=f'New Alumni Submission — {d.get("name", "")}',
            rows=[
                ('Name',            d.get('name', '')),
                ('Email',           d.get('email', '') or None),
                ('Graduation Year', d.get('graduation_year', '') or None),
                ('Title / Role',    d.get('title', '') or None),
                ('Short Bio',       d.get('short_desc', '') or None),
                ('Full Bio',        d.get('full_desc', '') or None),
            ],
            plain_text=f'New alumni profile submitted by {d.get("name", "")}. Awaiting review in admin panel.',
            footer_note='This profile is pending approval — go to the admin panel to review it.',
        )
        return Response(
            {'message': 'Thank you! Your profile has been submitted and will be reviewed by the school team before going live.'},
            status=status.HTTP_201_CREATED,
        )
