from django.db import models
from django.contrib.auth.models import AbstractUser


class Message(models.Model):
    text_content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    chat = models.ForeignKey('Chat', on_delete=models.CASCADE)


class Chat(models.Model):
    last_active = models.DateTimeField(auto_now=True)


