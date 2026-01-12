from django.shortcuts import render
from .models import Home, About, SkillSection, Skill, WorkSection, Contact, MyContactInfo

# Create your views here.
def index(request):
    home = Home.objects.first()
    about = About.objects.first()
    skill_section = SkillSection.objects.first()
    skills = Skill.objects.all()
    work_section = WorkSection.objects.first()
    contact = Contact.objects.first()
    my_contact_info = MyContactInfo.objects.first()
    return render(request, 'portfolio/index.html', {'home': home, 'about': about, 'skill_section': skill_section, 'skills': skills, 'work_section': work_section, 'contact': contact, 'my_contact_info': my_contact_info})