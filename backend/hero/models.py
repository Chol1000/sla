from django.db import models

class HeroSection(models.Model):
    title = models.CharField(max_length=200, default="Home Hero Section")
    video = models.FileField(upload_to='hero/videos/', blank=True, null=True)
    video_url = models.URLField(max_length=500, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Hero Section'
        verbose_name_plural = 'Hero Sections'
    
    def __str__(self):
        return self.title

class HeroImage(models.Model):
    hero_section = models.ForeignKey(HeroSection, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='hero/images/')
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = 'Hero Image'
        verbose_name_plural = 'Hero Images'
        ordering = ['order']
    
    def __str__(self):
        return f"Image {self.order} for {self.hero_section.title}"
