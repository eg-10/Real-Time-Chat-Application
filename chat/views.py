from django.shortcuts import render
from django.urls import reverse, reverse_lazy
from django.views.generic import TemplateView, DetailView
from django.views.generic.edit import FormView, UpdateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.mixins import UserPassesTestMixin

from chat.forms import CustomerCreationForm, UserCreationForm
from chat.models import Chat, Message, Customer


class IndexView(LoginRequiredMixin, TemplateView):
    template_name = 'chat/index.html'


class CustomerSignUpView(FormView):
    form_class = CustomerCreationForm
    template_name = 'registration/customer-signup.html'
    success_url = '/'

    def form_valid(self, form):
        form.save()
        return super().form_valid(form)


class ChatView(LoginRequiredMixin, UserPassesTestMixin, DetailView):
    model = Chat
    template_name = 'chat/chat.html'

    def test_func(self):
        pk = self.kwargs['pk']
        participants = Chat.objects.get(pk=pk).participants.all()
        return self.request.user.customer_profile in participants


class AddContactsView(UpdateView):
    model = Customer
    fields = ["contacts"]
    success_url = reverse_lazy('home')
    template_name = 'chat/add-contacts.html'
