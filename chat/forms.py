from django.contrib.auth.forms import UserCreationForm, UsernameField
from django.contrib.auth.models import User

from chat.models import Customer


class CustomerCreationForm(UserCreationForm):

    class Meta(UserCreationForm.Meta):
        fields = ("username","first_name","last_name","email")

    def save(self, commit=True):
        user = super().save(commit=True)
        Customer.objects.create(user=user)
        return user