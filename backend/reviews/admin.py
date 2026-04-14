from django.contrib import admin
from .models import Review


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display  = ('name', 'reviewer_type', 'rating', 'is_approved', 'created_at')
    list_filter   = ('reviewer_type', 'rating', 'is_approved')
    search_fields = ('name', 'role', 'text')
    list_editable = ('is_approved',)
    ordering      = ('-created_at',)
