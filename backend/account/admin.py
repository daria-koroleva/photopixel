from django.contrib import admin
from backend.account.models import Account
from rest_framework.authtoken.admin import TokenAdmin

TokenAdmin.raw_id_fields = ['user']
admin.site.register(Account)