from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from django.db.models import Avg
from school_backend.email_utils import send_notification
from .models import Review
from .serializers import ReviewSerializer


class ReviewSubmitThrottle(AnonRateThrottle):
    scope = 'review'   # 5/hour — for POST only

class ReviewReadThrottle(AnonRateThrottle):
    scope = 'anon'     # 200/hour — for GET


class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class  = ReviewSerializer
    http_method_names = ['get', 'post']

    def get_throttles(self):
        if self.request.method == 'POST':
            return [ReviewSubmitThrottle()]
        return [ReviewReadThrottle()]

    def get_queryset(self):
        return Review.objects.filter(is_approved=True)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # Use validated (sanitized) data, never raw request.data
            d = serializer.validated_data
            send_notification(
                subject=f'New Review — {d.get("name", "")} ({d.get("rating", "")}★)',
                rows=[
                    ('Name',          d.get('name', '')),
                    ('Role',          d.get('role', '') or None),
                    ('Reviewer Type', d.get('reviewer_type', '') or None),
                    ('Rating',        f'{d.get("rating", "")} / 5'),
                    ('Review',        d.get('text', '')),
                ],
                plain_text=(
                    f'New review from {d.get("name", "")} — {d.get("rating", "")}/5\n\n'
                    f'{d.get("text", "")}'
                ),
                footer_note='This review is pending approval — go to the admin panel to approve or reject it.',
            )
            return Response(
                {'message': 'Thank you! Your review has been submitted and will be visible after approval.'},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'], url_path='summary')
    def summary(self, request):
        qs    = Review.objects.filter(is_approved=True)
        total = qs.count()
        avg   = qs.aggregate(avg=Avg('rating'))['avg'] or 0
        dist  = {str(i): qs.filter(rating=i).count() for i in range(1, 6)}
        return Response({
            'total':        total,
            'average':      round(avg, 1),
            'distribution': dist,
        })
