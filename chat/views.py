from django.shortcuts import render
from django.views.generic import TemplateView, DetailView
from django.views.generic.edit import FormView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.mixins import UserPassesTestMixin

from chat.forms import CustomerCreationForm, UserCreationForm
from chat.models import Chat, Message


class IndexView(LoginRequiredMixin, TemplateView):
    template_name = 'chat/index.html'

    def get_context_data(self, **kwargs):
        print(self.request.user.customer_profile.chats.all())
        return super().get_context_data(**kwargs)


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
