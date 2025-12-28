from django.db import models
from django.utils.text import slugify
import math

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    author = models.CharField(max_length=100)
    excerpt = models.TextField(max_length=300)
    content = models.TextField()
    image = models.ImageField(upload_to='blog/images/', blank=True, null=True)
    video = models.FileField(upload_to='blog/videos/', blank=True, null=True)
    video_url = models.URLField(max_length=500, blank=True, null=True)
    category = models.CharField(max_length=50)
    read_time = models.IntegerField(default=5, help_text='Estimated reading time in minutes')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Blog Post'
        verbose_name_plural = 'Blog Posts'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        if not self.read_time or self.read_time == 5:
            words = len(self.content.split())
            self.read_time = max(1, math.ceil(words / 200))
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
