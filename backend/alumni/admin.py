from django.contrib import admin
from .models import Alumni


@admin.register(Alumni)
class AlumniAdmin(admin.ModelAdmin):
    list_display = ['name', 'graduation_year', 'title', 'is_active', 'order', 'created_at']
    list_filter = ['is_active', 'graduation_year']
    search_fields = ['name', 'title', 'graduation_year', 'email']
    list_editable = ['order', 'is_active']
    readonly_fields = ['created_at', 'updated_at']

    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'graduation_year', 'title', 'email', 'image')
        }),
        ('Description', {
            'fields': ('short_desc', 'full_desc')
        }),
        ('Social Media', {
            'fields': ('linkedin', 'twitter', 'facebook', 'instagram')
        }),
        ('Settings', {
            'fields': ('order', 'is_active', 'created_at', 'updated_at')
        }),
    )
