from django.contrib import admin
from .models import RegistrationStatus, HiringAnnouncement, CampusVisitRequest

@admin.register(RegistrationStatus)
class RegistrationStatusAdmin(admin.ModelAdmin):
    list_display = ['term', 'year', 'is_open', 'closing_date', 'updated_at']
    list_filter = ['is_open', 'year']
    search_fields = ['term', 'year']
    list_editable = ['is_open']
    
    fieldsets = (
        ('Status', {
            'fields': ('is_open',)
        }),
        ('Term Information', {
            'fields': ('term', 'year', 'closing_date')
        }),
        ('Additional Message', {
            'fields': ('message',)
        }),
    )

@admin.register(CampusVisitRequest)
class CampusVisitRequestAdmin(admin.ModelAdmin):
    list_display = ['name', 'phone', 'preferred_date', 'status', 'created_at']
    list_filter = ['status', 'preferred_date', 'interested_in']
    search_fields = ['name', 'phone', 'email', 'notes']
    list_editable = ['status']
    ordering = ['-created_at']
    readonly_fields = ['name', 'phone', 'email', 'preferred_date', 'preferred_time',
                       'number_of_adults', 'interested_in', 'notes', 'created_at']

    fieldsets = (
        ('Visitor Details', {
            'fields': ('name', 'phone', 'email', 'created_at')
        }),
        ('Visit Preferences', {
            'fields': ('preferred_date', 'preferred_time', 'number_of_adults', 'interested_in')
        }),
        ('Additional Notes', {
            'fields': ('notes',)
        }),
        ('Admin', {
            'fields': ('status', 'admin_notes')
        }),
    )


@admin.register(HiringAnnouncement)
class HiringAnnouncementAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_active', 'deadline', 'created_at']
    list_filter = ['is_active', 'deadline']
    search_fields = ['title', 'positions']
    list_editable = ['is_active']
    
    fieldsets = (
        ('Status', {
            'fields': ('is_active',)
        }),
        ('Announcement Details', {
            'fields': ('title', 'description', 'positions', 'deadline')
        }),
        ('Requirements & Benefits', {
            'fields': ('requirements', 'benefits')
        }),
        ('Contact Information', {
            'fields': ('application_email', 'location')
        }),
    )
