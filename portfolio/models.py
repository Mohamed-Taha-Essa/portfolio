from django.db import models

# Create your models here.
#i will add database to make my portfolio dynamic
class Home(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to='portfolio/images/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    class Meta:
        verbose_name = "Home"
        verbose_name_plural = "Homes"

class About(models.Model):
    image = models.ImageField(upload_to='portfolio/images/')
    title = models.CharField( max_length=50)
    bio = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
    class Meta:
        verbose_name = "About"
        verbose_name_plural = "Abouts"

class SkillSection(models.Model):
    title = models.CharField(max_length=50)
    bio = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    class Meta:
        verbose_name = "SkillSection"
        verbose_name_plural = "SkillSections"

class Skill(models.Model):
    skill_section = models.ForeignKey(SkillSection, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    icone = models.ImageField(upload_to='portfolio/images/')
    percentage = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    

    def __str__(self):
        return self.name
    class Meta:
        verbose_name = "Skill"
        verbose_name_plural = "Skills"

#it will a cards have img ,tilte ,url ,bio 
class WorkSection(models.Model):
    title = models.CharField(max_length=100)
    bio = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to='portfolio/images/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    class Meta:
        verbose_name = "WorkSection"
        verbose_name_plural = "WorkSections"


class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    class Meta:
        verbose_name = "Contact"
        verbose_name_plural = "Contacts"

class MyContactInfo(models.Model):
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    address = models.CharField(max_length=100)
    linkein_url= models.URLField(null=True, blank=True)
    github_url = models.URLField(null=True, blank=True)
    instagram_url=models.URLField(null=True, blank=True)
    facebook_url=models.URLField(null=True, blank=True)
    twitter_url=models.URLField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.phone

    class Meta:
        verbose_name = "MyContactInfo"
        verbose_name_plural = "MyContactInfos"



    

    