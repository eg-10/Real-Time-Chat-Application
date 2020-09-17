import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from chat.models import Chat, Message, Customer, User


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

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        sender = text_data_json['sender']
        sender_user = User.objects.get(username=sender)
        sender_customer = Customer.objects.get(user=sender_user)
        Message.objects.create(
            text_content=message, 
            sender=sender_customer, 
            chat=self.chat)
        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.chat_name,
            {
                'type': 'chat_message',
                'message': message,
                'sender':sender
            })

    # Receive message from room group
    def chat_message(self, event):
        message = event['message']
        sender = event['sender']
        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': message,
            'sender': sender
        }))