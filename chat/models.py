from django.db import models
from django.contrib.auth.models import User


class Message(models.Model):
    text_content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    chat = models.ForeignKey(
        'Chat', 
        on_delete=models.CASCADE, 
        related_name='messages')
    sender = models.ForeignKey('Customer', null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return str(self.sender) + ':' + str(self.text_content)


class Chat(models.Model):
    last_active = models.DateTimeField(auto_now=True)
    participants = models.ManyToManyField('Customer', related_name='chats')

    def __str__(self):
        return str([str(p) for p in self.participants.all()])


class Customer(models.Model):
    user = models.OneToOneField(
        User, 
        on_delete=models.CASCADE, 
        related_name='customer_profile')
    contacts = models.ManyToManyField(to='self')

    def __str__(self):
        return self.user.username


class AdminUser(models.Model):
    user = models.OneToOneField(
        User, 
        on_delete=models.CASCADE, 
        related_name='admin_profile')

    def __str__(self):
        return self.user.username
