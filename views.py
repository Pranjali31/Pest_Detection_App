from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import APIView, api_view
from .serializers import UserRegistrationSerializer, LoginSerializer
from django.middleware import csrf
from django.http import JsonResponse
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
import tensorflow as tf
import numpy as np
import pandas as pd
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed


def home(request):
   return HttpResponse('Hello! Welcome to Pest Detection App')

def get_csrf_token(request):
    csrf_token = csrf.get_token(request)
    return JsonResponse({'csrfToken': csrf_token})

@api_view(['POST'])
def user_registration(request):
    if request.method == 'POST':
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'User registered successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class user_login(APIView):
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Get the email and password from the validated data
        email = serializer.validated_data.get('email')
        password = serializer.validated_data.get('password')
        
         # Authenticate the user using Django's built-in authentication mechanism
        user = authenticate(email=email, password=password)
        
        # If user is not found or the password is incorrect, raise AuthenticationFailed
        if not user or not user.is_active:
            raise AuthenticationFailed("No active account found with the given credentials")
        
        refresh = RefreshToken.for_user(user)
        
        # Get the CSRF token
        csrf_token = csrf.get_token(request)
        
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'csrfToken': csrf_token,
        }, status=status.HTTP_200_OK)

# Load the model from the .h5 file
loaded_model = tf.keras.models.load_model('./pestDetectionApp/models/model_rec1.h5')

def process_image(image_data):
    
    # Perform image processing     
    image = tf.io.decode_image(image_data, channels=3)
    
    # Resize the image to the required input size of your model
    processed_image = tf.image.resize(image, (400, 506))
    return processed_image

@api_view(['POST'])
def predict_image(request):
    if request.method == 'POST':
        
        # Get the image file from the request
        image_file = request.FILES.get('image')
        image_data =image_file.read()
        processed_image = process_image(image_data)
        
         # Add a batch dimension to the processed image
        processed_image = tf.expand_dims(processed_image, axis=0)
        
        # Make predictions using the ML model
        predictions = loaded_model.predict(processed_image)
        
        pred = np.transpose(predictions)
        
        if np.max(pred) >= 0.04:
            p_name = np.where(pred == np.max(pred))
            df1 = pd.read_csv('./pestDetectionApp/models/pest_names.csv')
            detected_pest = df1.loc[p_name[0][0], 'pests']
            response_data = {'pest_detected': detected_pest}
        else:
            response_data = {'pest_detected':'The Plant is Healthy'}

        return Response(response_data)
