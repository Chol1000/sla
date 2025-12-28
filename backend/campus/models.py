from django.db import models

class CampusTour(models.Model):
    title = models.CharField(max_length=200, default="Campus Tour")
    description = models.TextField()
    video = models.FileField(upload_to='campus_tour/', blank=True, null=True)
    video_url = models.URLField(max_length=500, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Campus Tour'
        verbose_name_plural = 'Campus Tours'
    
    def __str__(self):
        return self.title
