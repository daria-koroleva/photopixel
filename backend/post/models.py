from django.db import models
from backend.account.models import Account


class Post(models.Model):
    poster = models.ForeignKey(Account, on_delete=models.CASCADE)
    title = models.CharField(max_length=30)
    content = models.CharField(max_length=256)
    date_posted = models.DateTimeField(
        verbose_name='date posted', auto_now_add=True)
    photoFileName = models.CharField(max_length=100, default='fileName')

    def __str__(self):
        return str(self.title)

    class Meta:
        ordering = ['-date_posted']


class Like(models.Model):
    liker = models.ForeignKey(Account, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)


class Comment(models.Model):
    content = models.CharField(max_length=256)
    date_posted = models.DateTimeField(
        verbose_name='date posted', auto_now_add=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    commenter = models.ForeignKey(Account, on_delete=models.CASCADE)
