from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['email', 'firstName', 'lastName', 'password']
        
    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            firstName=validated_data['firstName'],
            lastName=validated_data['lastName'],
            password=validated_data['password'],
        )
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    
    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        
        if email and password:
            # Authenticate the user using Django's built-in authentication
            user = authenticate(email=email, password=password)
            
            if not user or not user.is_active:
                raise AuthenticationFailed("No active account found with the given credentials")
            
        else:
            raise AuthenticationFailed("Email and password are required.")
        
        data['user'] = user
        return data
