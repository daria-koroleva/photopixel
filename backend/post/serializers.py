from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Post
        fields = ('id', 'title', 'content', 'author', 'date_posted', 'photoFileName')
        
    #def create(self, validated_data):
     #   return Post.objects.create(**validated_data)

    #def update(self, instance, validated_data):
    #    instance.title = validated_data.get('title', instance.title)
    #    instance.content = validated_data.get('content', instance.content)
     #   instance.author = validated_data.get('author', instance.author)
    #    instance.date_posted = validated_data.get('date_posted', instance.date_posted)
     #   instance.save()
    #    return instance