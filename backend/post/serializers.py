from rest_framework import serializers
from .models import Post,Like,Comment

class PostSerializer(serializers.ModelSerializer):
    poster = serializers.ReadOnlyField(source='poster.username')
    poster_id = serializers.ReadOnlyField(source='poster.id')
    likes = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id','title', 'photoFileName','content', 'poster','poster_id','likes','date_posted']

    def get_likes(self, post):
        return Like.objects.filter(post=post).count()


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['id']



class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id']
#class PostSerializer(serializers.ModelSerializer):

#    class Meta:
#        model = Post
#        fields = ('id', 'title', 'content', 'author', 'date_posted', 'photoFileName')

    #def create(self, validated_data):
     #   return Post.objects.create(**validated_data)

    #def update(self, instance, validated_data):
    #    instance.title = validated_data.get('title', instance.title)
    #    instance.content = validated_data.get('content', instance.content)
     #   instance.author = validated_data.get('author', instance.author)
    #    instance.date_posted = validated_data.get('date_posted', instance.date_posted)
     #   instance.save()
    #    return instance
