#!/usr/bin/env python
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')
django.setup()

from django.contrib.auth.models import User

# Create superuser if it doesn't exist
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser(
        username='admin',
        email='admin@example.com',
        password='123456'
    )
    print("Superuser created successfully!")
    print("Username: admin")
    print("Password: 123456")
else:
    print("Superuser 'admin' already exists.")
