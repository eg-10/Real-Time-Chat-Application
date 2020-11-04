from django.contrib import admin
from .models import Message, Chat, Customer, Administrator 

admin.site.register(Message)
admin.site.register(Chat)
admin.site.register(Customer)
admin.site.register(Administrator)