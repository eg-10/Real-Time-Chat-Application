from django.urls import path, include
from chat.views import CustomerSignUpView, IndexView, ChatView

urlpatterns = [
    path('', IndexView.as_view(), name='home'),
    path(
        'accounts/customer-signup/', 
        CustomerSignUpView.as_view(), 
        name='customer-signup'),
    path('chat/<int:pk>/', ChatView.as_view(), name='chat-view'),
]
