from django.urls import path, include
from chat.views import CustomerSignUpView, IndexView, ChatView, AddContactsView

urlpatterns = [
    path('', IndexView.as_view(), name='home'),
    path('api/', include('chat.api.urls')),
    path(
        'accounts/customer-signup/', 
        CustomerSignUpView.as_view(), 
        name='customer-signup'),
    path('chat/<int:pk>/', ChatView.as_view(), name='chat-view'),
    path('chat/<int:pk>/add-contacts/', AddContactsView.as_view(), name='add-contacts'),
]
