from django.contrib import admin
from .models import Alumni

@admin.register(Alumni)
class AlumniAdmin(admin.ModelAdmin):
    list_display = ['name', 'graduation_year', 'title', 'order', 'is_active']
    list_filter = ['is_active', 'graduation_year']
    search_fields = ['name', 'title', 'graduation_year']
    list_editable = ['order', 'is_active']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'graduation_year', 'title', 'image')
        }),
        ('Description', {
            'fields': ('short_desc', 'full_desc')
        }),
        ('Social Media', {
            'fields': ('linkedin', 'twitter', 'facebook', 'instagram')
        }),
        ('Additional Details', {
            'fields': ('order', 'is_active')
        }),
    )
