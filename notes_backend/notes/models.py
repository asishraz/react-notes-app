from django.db import models

# Create your models here.
class Note(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(title):
        return self.title