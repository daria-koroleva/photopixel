from django.db import models

# Create your models here.


class Post(models.Model):

    title                 = models.CharField(max_length=30)
    content               = models.CharField(max_length=256)
    date_posted           = models.DateTimeField(verbose_name='date posted', auto_now_add=True)
    author                = models.CharField(max_length=30)
    photoFileName         = models.CharField(max_length=100, default='fileName')

    def __str__(self):
        return self.title