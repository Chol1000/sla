from django.db import models
from django.utils import timezone

class RegistrationStatus(models.Model):
    TERM_CHOICES = [
        ('Term 1', 'Term 1'),
        ('Term 2', 'Term 2'),
        ('Term 3', 'Term 3'),
    ]

    is_open = models.BooleanField(default=False)
    term = models.CharField(max_length=100, choices=TERM_CHOICES)
    year = models.CharField(max_length=4)
    closing_date = models.DateField()
    message = models.TextField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Registration Status'

    def __str__(self):
        status = "OPEN" if self.is_open else "CLOSED"
        return f"Registration {status} - {self.term}, {self.year}"

    def is_deadline_passed(self):
        return timezone.now().date() > self.closing_date


class HiringAnnouncement(models.Model):
    is_active = models.BooleanField(default=True)
    title = models.CharField(max_length=200, default='We\'re Hiring')
    description = models.TextField()
    positions = models.TextField(help_text='Comma-separated list of positions')
    deadline = models.DateField()
    requirements = models.TextField(blank=True)
    benefits = models.TextField(blank=True)
    application_email = models.EmailField(default='info@stlawrenceacademy.edu')
    location = models.CharField(max_length=200, default='Hai Referendum, Juba')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Hiring Announcements'
        ordering = ['-created_at']

    def __str__(self):
        status = "ACTIVE" if self.is_active and not self.is_deadline_passed() else "CLOSED"
        return f"Hiring {status} - {self.title}"

    def is_deadline_passed(self):
        return timezone.now().date() > self.deadline


class CampusVisitRequest(models.Model):
    TIME_CHOICES = [
        ('8:00 AM', '8:00 AM'),
        ('9:00 AM', '9:00 AM'),
        ('10:00 AM', '10:00 AM'),
        ('11:00 AM', '11:00 AM'),
        ('1:00 PM', '1:00 PM'),
        ('2:00 PM', '2:00 PM'),
        ('3:00 PM', '3:00 PM'),
    ]

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
    ]

    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=30)
    email = models.EmailField(blank=True)
    preferred_date = models.DateField(null=True, blank=True)
    preferred_time = models.CharField(max_length=20, choices=TIME_CHOICES, blank=True)
    number_of_adults = models.CharField(max_length=10, blank=True)
    interested_in = models.CharField(max_length=100, blank=True)
    notes = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    admin_notes = models.TextField(blank=True, help_text='Internal notes — not visible to the visitor')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Campus Visit Request'
        verbose_name_plural = 'Campus Visit Requests'

    def __str__(self):
        date_str = self.preferred_date.strftime('%d %b %Y') if self.preferred_date else 'Date TBD'
        return f"{self.name} — {date_str} ({self.get_status_display()})"
