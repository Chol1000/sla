from django.db import models


class Review(models.Model):
    REVIEWER_TYPE_CHOICES = [
        ('Parent',   'Parent'),
        ('Student',  'Student'),
        ('Alumni',   'Alumni'),
        ('Staff',    'Staff'),
        ('Visitor',  'Visitor'),
        ('Other',    'Other'),
    ]

    name          = models.CharField(max_length=150)
    role          = models.CharField(max_length=100)
    reviewer_type = models.CharField(max_length=20, choices=REVIEWER_TYPE_CHOICES, default='Other')
    rating        = models.PositiveSmallIntegerField()   # 1 – 5
    text          = models.TextField()
    is_approved   = models.BooleanField(default=True)    # shows immediately; admin can remove if inappropriate
    created_at    = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} ({self.rating}\u2605) \u2014 {self.created_at.strftime('%d %b %Y')}"

    def clean(self):
        from django.core.exceptions import ValidationError
        if not (1 <= self.rating <= 5):
            raise ValidationError({'rating': 'Rating must be between 1 and 5.'})
