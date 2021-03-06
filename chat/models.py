from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class Message(models.Model):
    text_content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    chat = models.ForeignKey('Chat', on_delete=models.CASCADE, 
                             related_name='messages')
    sender = models.ForeignKey('Customer', null=True, on_delete=models.SET_NULL)

    class Meta:
        ordering = ['timestamp', 'pk']

    def __str__(self):
        return str(self.sender) + ':' + str(self.text_content)


class Chat(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    participants = models.ManyToManyField('Customer', related_name='chats')
    last_active = models.DateTimeField(auto_now=True)
    is_group = models.BooleanField(default=True)

    class Meta:
        ordering = ['-last_active', 'name', '-pk']

    def __str__(self):
        return str([str(p) for p in self.participants.all()])


class Customer(models.Model):
    user = models.OneToOneField(
        User, 
        on_delete=models.CASCADE, 
        related_name='customer_profile')
    contacts = models.ManyToManyField(to='self')
    profile_photo = models.ImageField(upload_to='profile_photos', null=True, 
                                      blank=True)

    class Meta:
        ordering = ['user__first_name', 'user__last_name', 'user__username', '-pk']

    def __str__(self):
        return self.user.username


class Administrator(models.Model):
    user = models.OneToOneField(
        User, 
        on_delete=models.CASCADE, 
        related_name='admin_profile')

    def __str__(self):
        return self.user.username


@receiver(post_save, sender=Message)
def update_chat_last_active(sender, instance, **kwargs):
    instance.chat.save()