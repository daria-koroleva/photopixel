from rest_framework import serializers
from .models import Account, Follow


class AccountSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Account
        fields = ('username', 'email', 'password', 'profilePhotoFileName')

    def create(self, validated_data):
        account = super(AccountSerializer, self).create(validated_data)
        account.set_password(validated_data['password'])
        account.save()
        return account


class UserListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        fields = ('id', 'username', 'email')


class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = ('following', 'follower')
