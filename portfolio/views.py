import requests
from django.conf import settings
from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import Home, About, SkillSection, Skill, WorkSection, Contact, MyContactInfo, Certificate
                        
# Create your views here.
def index(request):
    # Record visitor
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    
    from .models import Visitor
    Visitor.objects.create(ip_address=ip)

    home = Home.objects.first()
    about = About.objects.first()
    skill_section = SkillSection.objects.first()
    skills = Skill.objects.all()
    works = WorkSection.objects.all()
    certificates = Certificate.objects.all()
    my_contact_info = MyContactInfo.objects.first()
    return render(request, 'portfolio/index.html', {
        'home': home, 
        'about': about, 
        'skill_section': skill_section, 
        'skills': skills, 
        'works': works, 
        'certificates': certificates,
        'my_contact_info': my_contact_info
    })

def contact_ajax(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')
        
        if name and email and message:
            try:
                # Save to database
                Contact.objects.create(
                    name=name,
                    email=email,
                    message=message
                )
                
                # Send Telegram Notification
                bot_token = settings.TELEGRAM_BOT_TOKEN
                chat_id = settings.TELEGRAM_CHAT_ID
                telegram_message = f"New Contact Form Submission:\n\nName: {name}\nEmail: {email}\nMessage: {message}"
                url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
                data = {"chat_id": chat_id, "text": telegram_message}
                
                try:
                    requests.post(url, data=data)
                except Exception as e:
                    print(f"Telegram Error: {e}") # Log error but don't fail the request

                return JsonResponse({'status': 'success', 'message': 'Thank you for your message! We will get back to you soon.'})
            except Exception as e:
                return JsonResponse({'status': 'error', 'message': 'Something went wrong. Please try again later.'}, status=500)
        else:
            return JsonResponse({'status': 'error', 'message': 'Please fill in all fields.'}, status=400)
    
    return JsonResponse({'status': 'error', 'message': 'Invalid request method.'}, status=405) 