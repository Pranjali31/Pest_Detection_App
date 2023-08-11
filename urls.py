from django.urls import path
from .views import home, user_registration, get_csrf_token, user_login, predict_image

urlpatterns = [
    path('',home, name = 'home'),
    path('user/registration/', user_registration, name='user-registration'),
    path('csrf/', get_csrf_token, name='get_csrf_token'),
    path('user/login/', user_login.as_view(), name='user_login'),
    path('predict/', predict_image, name='predict_image'),
]