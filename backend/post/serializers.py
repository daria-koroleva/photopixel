from rest_framework import serializers
from .models import Post, Like, Comment


class PostSerializer(serializers.ModelSerializer):
    poster = serializers.ReadOnlyField(source='poster.username')
    poster_id = serializers.ReadOnlyField(source='poster.id')
    likes = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'title', 'photoFileName', 'content',
                  'poster', 'poster_id', 'likes', 'date_posted']

    def get_likes(self, post):
        return Like.objects.filter(post=post).count()


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['liker']


class CommentSerializer(serializers.ModelSerializer):
    commenter = serializers.ReadOnlyField(source='commenter.username')
    commenter_id = serializers.ReadOnlyField(source='commenter.id')

    class Meta:
        model = Comment
        fields = ['id', 'commenter', 'content', 'date_posted', 'commenter_id']
