from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from knox.models import AuthToken

from chat.api.serializers import (
    CustomerBasicSerializer, 
    ChatSerializer,
    MessageSerializer,
    UserDetailSerializer,
    LoginSerializer,
    RegisterSerializer)
from chat.models import Customer, Chat, Message


class RegisterAPIView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserDetailSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserDetailSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class ContactsListView(generics.ListAPIView):
    serializer_class = CustomerBasicSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.request.user.customer_profile.contacts.all()


class ChatsListView(generics.ListAPIView):
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.request.user.customer_profile.chats.all().order_by(
            '-last_active')


class ChatDetailView(generics.RetrieveAPIView):
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.request.user.customer_profile.chats.all()

