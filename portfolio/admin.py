from django.contrib import admin
from .models import Home, About, SkillSection, Skill, WorkSection, Contact, MyContactInfo


@admin.register(Home)
class HomeAdmin(admin.ModelAdmin):
    list_display = ('name', 'title', 'created_at', 'updated_at')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('name', 'title', 'description')
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)


@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'updated_at')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('title', 'bio')
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)


@admin.register(SkillSection)
class SkillSectionAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'updated_at')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('title', 'bio')
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'skill_section', 'percentage', 'created_at', 'updated_at')
    list_filter = ('skill_section', 'percentage', 'created_at', 'updated_at')
    search_fields = ('name', 'skill_section__title')
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)
    list_editable = ('percentage',)


@admin.register(WorkSection)
class WorkSectionAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'updated_at')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('title', 'bio')
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at', 'updated_at')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('name', 'email', 'message')
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)
    date_hierarchy = 'created_at'


@admin.register(MyContactInfo)
class MyContactInfoAdmin(admin.ModelAdmin):
    list_display = ('phone', 'email', 'address', 'created_at', 'updated_at')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('phone', 'email', 'address')
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)
    fieldsets = (
        ('Basic Information', {
            'fields': ('phone', 'email', 'address')
        }),
        ('Social Media Links', {
            'fields': ('linkein_url', 'github_url', 'instagram_url', 'facebook_url', 'twitter_url'),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    ) 

