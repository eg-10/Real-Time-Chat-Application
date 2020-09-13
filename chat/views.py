from django.shortcuts import render
from django.views.generic import TemplateView
from django.views.generic.edit import FormView
from chat.forms import CustomerCreationForm, UserCreationForm


class IndexView(TemplateView):
    template_name = 'chat/index.html'


class CustomerSignUpView(FormView):
    form_class = CustomerCreationForm
    template_name = 'registration/customer-signup.html'
    success_url = '/'

    def form_valid(self, form):
        form.save()
        return super().form_valid(form)


