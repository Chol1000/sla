from django.contrib import admin
from .models import Staff


class SectionFilter(admin.SimpleListFilter):
    title = 'Department'
    parameter_name = 'section'

    def lookups(self, request, model_admin):
        return Staff.SECTION_CHOICES

    def queryset(self, request, queryset):
        if self.value():
            return queryset.filter(section=self.value())
        return queryset


@admin.register(Staff)
class StaffAdmin(admin.ModelAdmin):
    list_display = [
        'name', 'position', 'email', 'phone', 'order', 'is_active'
    ]
    list_display_links = ['name']
    list_editable = ['order', 'is_active']
    list_filter = [SectionFilter, 'is_active']
    search_fields = ['name', 'position', 'email', 'phone', 'bio']
    ordering = ['section', 'order', 'name']
    list_per_page = 25

    fieldsets = (
        ('Basic Information', {
            'description': (
                'Section guide — Leadership: Founder/Managing Director, Head Teacher (Nursery & Primary), '
                'Principal, Deputy Principal | Admin: Admin officers & support staff | '
                'Nursery/Primary/Secondary: Teachers in each school | PTA: Parent-Teacher Association members'
            ),
            'fields': ('name', 'position', 'section', 'photo', 'order', 'is_active'),
        }),
        ('Contact Information', {
            'fields': ('email', 'phone'),
        }),
        ('Social Media', {
            'classes': ('collapse',),
            'fields': ('facebook', 'twitter', 'linkedin', 'instagram'),
        }),
        ('Biography', {
            'fields': ('bio',),
        }),
    )

