from django.db import models

# Create your models here.
class Event(models.Model):
    username = models.CharField(max_length=128)
    link = models.TextField()
    name = models.TextField()
    current_live = models.BooleanField(default=True)
