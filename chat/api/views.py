from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from chat.api.serializers import (
    CustomerSerializer, 
    ChatSerializer,
    ChatListSerializer,
    MessageSerializer)
from chat.models import Customer, Chat, Message


class ContactsListView(generics.ListAPIView):
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.request.user.customer_profile.contacts.all()


class ChatsListView(generics.ListAPIView):
    serializer_class = ChatListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return (
            self.request.user.customer_profile.
            chats.all().
            order_by('-last_active'))


class ChatDetailView(generics.RetrieveAPIView):
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.request.user.customer_profile.chats.all()


# class ChatSendMessageAPIView(APIView):
#     serializer_class = ChatSerializer
#     permission_classes = [IsAuthenticated,]

#     def post(self, request, pk):
#         chat = Chat.objects.get(pk=pk)
#         message = request.kwargs.get("content", None)
#         sender = request.user.customer_profile
#         if message:
#             message = Message.objects.create(
#                 text_content=message, 
#                 chat=chat, 
#                 sender=sender)
        

#         answer.voters.add(user)
#         answer.save()

#         serializer_context = {"request":request}
#         serializer = self.serializer_class(answer, context=serializer_context)

#         return Response(serializer.data, status=status.HTTP_200_OK)
