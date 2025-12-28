from django.contrib import admin
from .models import HeroSection, HeroImage

class HeroImageInline(admin.TabularInline):
    model = HeroImage
    extra = 1
    fields = ['image', 'order']

@admin.register(HeroSection)
class HeroSectionAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_active', 'created_at']
    list_filter = ['is_active']
    fields = ['title', 'video', 'video_url', 'is_active']
    inlines = [HeroImageInline]
