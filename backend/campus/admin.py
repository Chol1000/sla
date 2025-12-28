from django.contrib import admin
from .models import CampusTour

@admin.register(CampusTour)
class CampusTourAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    fields = ['title', 'description', 'video', 'video_url', 'is_active']
