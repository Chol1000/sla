from django.contrib import admin
from .models import RegistrationStatus, NurseryRegistration, PrimaryRegistration, SecondaryRegistration

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

@admin.register(NurseryRegistration)
class NurseryRegistrationAdmin(admin.ModelAdmin):
    list_display = ['student_name', 'class_level', 'term', 'year', 'parent_name', 'phone', 'created_at']
    list_filter = ['term', 'year', 'class_level', 'gender', 'created_at']
    search_fields = ['student_name', 'parent_name', 'phone', 'email']
    readonly_fields = ['created_at']

@admin.register(PrimaryRegistration)
class PrimaryRegistrationAdmin(admin.ModelAdmin):
    list_display = ['student_name', 'class_level', 'term', 'year', 'parent_name', 'phone', 'created_at']
    list_filter = ['term', 'year', 'class_level', 'gender', 'created_at']
    search_fields = ['student_name', 'parent_name', 'phone', 'email']
    readonly_fields = ['created_at']

@admin.register(SecondaryRegistration)
class SecondaryRegistrationAdmin(admin.ModelAdmin):
    list_display = ['student_name', 'class_level', 'track', 'term', 'year', 'parent_name', 'phone', 'created_at']
    list_filter = ['term', 'year', 'class_level', 'track', 'gender', 'created_at']
    search_fields = ['student_name', 'parent_name', 'phone', 'email']
    readonly_fields = ['created_at']
