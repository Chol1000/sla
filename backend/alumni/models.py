from django.db import models

class Alumni(models.Model):
    name = models.CharField(max_length=200)
    graduation_year = models.CharField(max_length=50)
    title = models.CharField(max_length=200)
    short_desc = models.TextField()
    full_desc = models.TextField()
    image = models.ImageField(upload_to='alumni/')
    linkedin = models.URLField(blank=True)
    twitter = models.URLField(blank=True)
    facebook = models.URLField(blank=True)
    instagram = models.URLField(blank=True)
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'graduation_year', 'name']
        verbose_name_plural = 'Alumni'

    def __str__(self):
        return f"{self.name} - {self.graduation_year}"
