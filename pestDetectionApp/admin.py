from django.contrib import admin
from .models import CustomUser


class CustomUserAdmin(admin.ModelAdmin):
    # List of fields to display in the user list
    list_display = ('email', 'firstName', 'lastName', 'password')

    # Fields that can be searched in the admin search bar
    search_fields = ('email', 'firstName', 'lastName')

    # Override password display in list view to show hashed passwords
    def password(self, obj):
        return obj.password
    
admin.site.register(CustomUser,CustomUserAdmin)