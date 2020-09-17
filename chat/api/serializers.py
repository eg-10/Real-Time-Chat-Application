from rest_framework import serializers
from chat.models import Customer, User, Chat, Message


# class ContactListingField(serializers.RelatedField):
#     def to_representation(self, value):
#         duration = time.strftime('%M:%S', time.gmtime(value.duration))
#         return 'Track %d: %s (%s)' % (value.order, value.name, duration)

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ["username", "first_name", "last_name", "email"]


class CustomerSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Customer
        fields = ['user']


class ChatListSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Chat
        fields = '__all__'


class MessageSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Message
        fields = '__all__'


class ChatSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True)
    participants = CustomerSerializer(many=True)

    class Meta:
        model = Chat
        fields = '__all__'

