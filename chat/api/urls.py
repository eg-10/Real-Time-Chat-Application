from django.urls import path
from chat.api.views import ContactsListView, ChatsListView, ChatDetailView

urlpatterns = [
    path('contacts/', ContactsListView.as_view()),
    path('chats/', ChatsListView.as_view()),
    path('chat/<int:pk>/', ChatDetailView.as_view()),
]