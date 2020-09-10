from django.db import models
from django.contrib.auth.models import User


class Message(models.Model):
    text_content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    chat = models.ForeignKey(
        'Chat', 
        on_delete=models.CASCADE, 
        related_name='messages')
    sender = models.ForeignKey('Customer', on_delete=models.CASCADE)


class Chat(models.Model):
    last_active = models.DateTimeField(auto_now=True)
    participants = models.ManyToManyField('Customer')


class Customer(models.Model):
    user = models.OneToOneField(
        User, 
        on_delete=models.CASCADE, 
        related_name='customer_profile')
    contacts = models.ManyToManyField(to='self')


class AdminUser(models.Model):
    user = models.OneToOneField(
        User, 
        on_delete=models.CASCADE, 
        related_name='admin_profile')
