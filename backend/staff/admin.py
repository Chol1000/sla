from django.contrib import admin
from .models import Staff

@admin.register(Staff)
class StaffAdmin(admin.ModelAdmin):
    list_display = ['name', 'position', 'section', 'email', 'phone', 'order', 'is_active']
    list_filter = ['section', 'is_active']
    search_fields = ['name', 'position', 'email', 'phone']
    ordering = ['section', 'order', 'name']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'position', 'section', 'photo', 'order')
        }),
        ('Contact Information', {
            'fields': ('email', 'phone')
        }),
        ('Social Media', {
            'fields': ('facebook', 'twitter', 'linkedin', 'instagram')
        }),
        ('Additional Details', {
            'fields': ('bio', 'is_active')
        }),
    )
