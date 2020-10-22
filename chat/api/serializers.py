from django.contrib.auth import authenticate
from django.db.models import fields

from rest_framework import serializers

from chat.models import Customer, User, Chat, Message


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "first_name", "last_name", "email"]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        Customer.objects.create(user=user)
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active and user.customer_profile:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


class UserBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "first_name", "last_name", "email"]


class CustomerBasicSerializer(serializers.ModelSerializer):
    user = UserBasicSerializer()

    class Meta:
        model = Customer
        fields = ['user']


class CustomerEditSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Customer
        fields = ['contacts']

class MessageSerializer(serializers.ModelSerializer):
    sender = CustomerBasicSerializer()

    class Meta:
        model = Message
        fields = '__all__'


class ChatSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True)
    participants = CustomerBasicSerializer(many=True)

    class Meta:
        model = Chat
        fields = '__all__'


class CustomerDetailSerializer(serializers.ModelSerializer):
    contacts = CustomerBasicSerializer(many=True, read_only=True)
    chats = ChatSerializer(many=True)

    class Meta:
        model = Customer
        fields=["contacts", "chats"]


class UserDetailSerializer(serializers.ModelSerializer):
    customer_profile = CustomerDetailSerializer()

    class Meta:
        model = User
        fields = ["username", "first_name", "last_name", "email", "customer_profile"]


# class ChatListSerializer(serializers.ModelSerializer):
   
#     class Meta:
#         model = Chat
#         fields = '__all__'

# class ContactListingField(serializers.RelatedField):
#     def to_representation(self, value):
#         duration = time.strftime('%M:%S', time.gmtime(value.duration))
#         return 'Track %d: %s (%s)' % (value.order, value.name, duration)
