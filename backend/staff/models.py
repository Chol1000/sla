from django.db import models

class Staff(models.Model):
    SECTION_CHOICES = [
        ('director', 'Leadership'),
        ('admin', 'Admin'),
        ('nursery', 'Nursery School'),
        ('primary', 'Primary School'),
        ('secondary', 'Secondary School'),
        ('pta', 'PTA'),
    ]
    
    name = models.CharField(max_length=200)
    position = models.CharField(max_length=100)
    section = models.CharField(max_length=50, choices=SECTION_CHOICES)
    photo = models.ImageField(upload_to='staff/photos/', blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    facebook = models.URLField(blank=True, null=True)
    twitter = models.URLField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    instagram = models.URLField(blank=True, null=True)
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['section', 'order', 'name']
        verbose_name = 'Staff Member'
        verbose_name_plural = 'Staff Members'
    
    def __str__(self):
        return f"{self.name} - {self.position} ({self.get_section_display()})"
