from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set.")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    firstName = models.CharField(max_length=256, blank=True, null=True, default="React")
    lastName = models.CharField(max_length=256, blank=True, null=True, default="Native")
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    
    # Add related_name arguments to avoid conflicts
    groups = models.ManyToManyField(
     'auth.Group',
     related_name='custom_user_set',  # Add a unique related_name for groups
     blank=True,
     help_text='The groups this user belongs to. A user will get all permissions '
               'granted to each of their groups.',
     verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
     'auth.Permission',
     related_name='custom_user_set',  # Add a unique related_name for user_permissions
     blank=True,
     help_text='Specific permissions for this user.',
     verbose_name='user permissions',
    )

    def __str__(self):
        return self.email


