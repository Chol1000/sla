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


class NurseryRegistration(models.Model):
    # Term Information
    term = models.CharField(max_length=100, default='Term 1')
    year = models.CharField(max_length=4, default='2025')
    
    # Student Information
    student_name = models.CharField(max_length=200)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10, choices=[('male', 'Male'), ('female', 'Female')])
    class_level = models.CharField(max_length=50, choices=[('baby', 'Baby Class'), ('middle', 'Middle Class'), ('top', 'Top Class')])
    
    # Parent/Guardian Information
    parent_name = models.CharField(max_length=200)
    relationship = models.CharField(max_length=50)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    address = models.TextField()
    
    # Emergency Contact
    emergency_contact_name = models.CharField(max_length=200)
    emergency_contact_phone = models.CharField(max_length=20)
    
    # Additional Information
    medical_conditions = models.TextField(blank=True)
    previous_school = models.CharField(max_length=200, blank=True)
    
    # Document Uploads
    birth_certificate = models.FileField(upload_to='registrations/nursery/birth_certificates/', blank=True, null=True)
    previous_report = models.FileField(upload_to='registrations/nursery/reports/', blank=True, null=True)
    recommendation_letter = models.FileField(upload_to='registrations/nursery/recommendations/', blank=True, null=True)
    payment_receipt = models.FileField(upload_to='registrations/nursery/receipts/', default='temp.pdf')
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-year', '-created_at']
    
    def __str__(self):
        return f"{self.student_name} - Nursery ({self.class_level}) - {self.term} {self.year}"


class PrimaryRegistration(models.Model):
    # Term Information
    term = models.CharField(max_length=100, default='Term 1')
    year = models.CharField(max_length=4, default='2025')
    
    # Student Information
    student_name = models.CharField(max_length=200)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10, choices=[('male', 'Male'), ('female', 'Female')])
    class_level = models.CharField(max_length=50, choices=[('p1', 'P1'), ('p2', 'P2'), ('p3', 'P3'), ('p4', 'P4'), ('p5', 'P5'), ('p6', 'P6'), ('p7', 'P7'), ('p8', 'P8')])
    
    # Parent/Guardian Information
    parent_name = models.CharField(max_length=200)
    relationship = models.CharField(max_length=50)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    address = models.TextField()
    
    # Emergency Contact
    emergency_contact_name = models.CharField(max_length=200)
    emergency_contact_phone = models.CharField(max_length=20)
    
    # Additional Information
    medical_conditions = models.TextField(blank=True)
    previous_school = models.CharField(max_length=200, blank=True)
    
    # Document Uploads (Required)
    birth_certificate = models.FileField(upload_to='registrations/primary/birth_certificates/')
    previous_transcripts = models.FileField(upload_to='registrations/primary/transcripts/')
    payment_receipt = models.FileField(upload_to='registrations/primary/receipts/', default='temp.pdf')
    # Optional Documents
    transfer_certificate = models.FileField(upload_to='registrations/primary/transfer_certificates/', blank=True, null=True)
    recommendation_letter = models.FileField(upload_to='registrations/primary/recommendations/', blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-year', '-created_at']
    
    def __str__(self):
        return f"{self.student_name} - Primary ({self.class_level}) - {self.term} {self.year}"


class SecondaryRegistration(models.Model):
    # Term Information
    term = models.CharField(max_length=100, default='Term 1')
    year = models.CharField(max_length=4, default='2025')
    
    # Student Information
    student_name = models.CharField(max_length=200)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10, choices=[('male', 'Male'), ('female', 'Female')])
    class_level = models.CharField(max_length=50, choices=[('s1', 'Senior 1'), ('s2', 'Senior 2'), ('s3', 'Senior 3'), ('s4', 'Senior 4')])
    track = models.CharField(max_length=50, choices=[('science', 'Science Track'), ('arts', 'Arts Track')], blank=True)
    
    # Parent/Guardian Information
    parent_name = models.CharField(max_length=200)
    relationship = models.CharField(max_length=50)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    address = models.TextField()
    
    # Emergency Contact
    emergency_contact_name = models.CharField(max_length=200)
    emergency_contact_phone = models.CharField(max_length=20)
    
    # Additional Information
    medical_conditions = models.TextField(blank=True)
    previous_school = models.CharField(max_length=200, blank=True)
    
    # Document Uploads (Required)
    birth_certificate = models.FileField(upload_to='registrations/secondary/birth_certificates/')
    previous_transcripts = models.FileField(upload_to='registrations/secondary/transcripts/')
    payment_receipt = models.FileField(upload_to='registrations/secondary/receipts/', default='temp.pdf')
    # Optional Documents
    transfer_certificate = models.FileField(upload_to='registrations/secondary/transfer_certificates/', blank=True, null=True)
    recommendation_letter = models.FileField(upload_to='registrations/secondary/recommendations/', blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-year', '-created_at']
    
    def __str__(self):
        return f"{self.student_name} - Secondary ({self.class_level}) - {self.term} {self.year}"
