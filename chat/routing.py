from . import consumers
from django.urls import path

websocket_urlpatterns = [
    path('ws/chat/<int:chat_id>/', consumers.ChatConsumer),
]