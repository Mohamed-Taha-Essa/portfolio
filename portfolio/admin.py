from django.contrib import admin
from .models import Home, About, SkillSection, Skill, WorkSection, Contact, MyContactInfo, Certificate, Visitor
from unfold.admin import ModelAdmin, TabularInline


@admin.register(Visitor)
class VisitorAdmin(ModelAdmin):
    list_display = ('ip_address', 'visit_time')
    readonly_fields = ('ip_address', 'visit_time')
    ordering = ('-visit_time',)


@admin.register(Home)
class HomeAdmin(ModelAdmin):
    list_display = ('name', 'title', 'cv', 'created_at', 'updated_at')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('name', 'title', 'description')
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)


@admin.register(About)
class AboutAdmin(ModelAdmin):
    list_display = ('title', 'created_at', 'updated_at')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('title', 'bio')
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)


class SkillInline(TabularInline):
    model = Skill
    extra = 1
    fields = ('name', 'icone', 'percentage')
    readonly_fields = ()


@admin.register(SkillSection)
class SkillSectionAdmin(ModelAdmin):
    list_display = ('title', 'created_at', 'updated_at')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('title', 'bio')
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)
    inlines = [SkillInline]


@admin.register(Skill)
class SkillAdmin(ModelAdmin):
    list_display = ('name', 'skill_section', 'percentage', 'created_at', 'updated_at')
    list_filter = ('skill_section', 'percentage', 'created_at', 'updated_at')
    search_fields = ('name', 'skill_section__title')
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)
    list_editable = ('percentage',)


@admin.register(WorkSection)
class WorkSectionAdmin(ModelAdmin):
    list_display = ('title', 'url', 'created_at', 'updated_at')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('title', 'bio', 'url')
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)


@admin.register(Contact)
class ContactAdmin(ModelAdmin):
    list_display = ('name', 'email', 'created_at', 'updated_at')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('name', 'email', 'message')
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)
    date_hierarchy = 'created_at'


@admin.register(MyContactInfo)
class MyContactInfoAdmin(ModelAdmin):
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


@admin.register(Certificate)
class CertificateAdmin(ModelAdmin):
    list_display = ('title', 'created_at', 'updated_at')
    search_fields = ('title',) 

