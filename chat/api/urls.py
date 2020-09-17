from django.urls import path, include

from knox.views import LogoutView
from chat.api.views import (
    ContactsListView, 
    ChatsListView, 
    ChatDetailView,
    RegisterAPIView,
    LoginAPIView)


urlpatterns = [
    path('contacts/', ContactsListView.as_view()),
    path('chats/', ChatsListView.as_view()),
    path('chat/<int:pk>/', ChatDetailView.as_view()),
    path('auth/register/', RegisterAPIView.as_view()),
    path('auth/login/', LoginAPIView.as_view()),
    path('auth/logout/', LogoutView.as_view(), name='knox_logout'),
    path('', include('knox.urls')),
    
]