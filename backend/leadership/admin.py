from django.contrib import admin
from .models import StudentLeader

@admin.register(StudentLeader)
class StudentLeaderAdmin(admin.ModelAdmin):
    list_display = ['year', 'position', 'name', 'order', 'is_active']
    list_filter = ['is_active', 'year', 'position']
    search_fields = ['name', 'position', 'year']
    list_editable = ['order', 'is_active']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('year', 'position', 'name', 'image')
        }),
        ('Additional Details', {
            'fields': ('order', 'is_active')
        }),
    )
