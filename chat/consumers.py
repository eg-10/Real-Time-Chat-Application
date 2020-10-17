import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

from chat.models import Chat, Message, Customer, User
from chat.api.serializers import MessageSerializer

class ChatConsumer(WebsocketConsumer):

    def connect(self):
        self.chat_id = self.scope['url_route']['kwargs']['chat_id']
        self.chat_name = 'chat_%s' % self.chat_id
        self.chat = Chat.objects.get(id=self.chat_id)
        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.chat_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.chat_name,
            self.channel_name
        )
    
    def onNewChatMessage(self, message, sender):
        sender_customer = Customer.objects.get(user__username=sender)
        new_message = Message.objects.create(text_content=message, 
                                             sender=sender_customer, 
                                             chat=self.chat) 
        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.chat_name,
            {
                'type': 'chat_message',
                'message': MessageSerializer(new_message).data,
            })
    
    def onNewChatCreated():
        pass

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        if text_data_json['type'] == "new_chat_message":
            self.onNewChatMessage(text_data_json['message'], 
                                  text_data_json['sender'])
        elif text_data_json['type'] == "new_chat_created":
            self.onNewChatCreated()
        # message = text_data_json['message']
        # sender = text_data_json['sender']
        # sender_user = User.objects.get(username=sender)
        # sender_customer = Customer.objects.get(user=sender_user)
        # Message.objects.create(
        #     text_content=message, 
        #     sender=sender_customer, 
        #     chat=self.chat)
        # # Send message to room group
        # async_to_sync(self.channel_layer.group_send)(
        #     self.chat_name,
        #     {
        #         'type': 'chat_message',
        #         'message': message,
        #         'sender':sender
        #     })

    # Receive message from room group
    def chat_message(self, event):
        message = event['message']
        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'type': "new_chat_message",
            'message': message
        }))