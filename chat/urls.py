from django.urls import path, include
from chat.views import CustomerSignUpView, IndexView

urlpatterns = [
    path('', IndexView.as_view(), name='home'),
    path(
        'accounts/customer-signup/', 
        CustomerSignUpView.as_view(), 
        name='customer-signup'),
]
