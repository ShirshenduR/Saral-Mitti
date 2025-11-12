from django.db import models
from django.contrib.auth.models import User


class CropAnalysis(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='crop_analyses')
    image = models.ImageField(upload_to='uploads/')
    result = models.JSONField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']
        verbose_name_plural = 'Crop Analyses'

    def __str__(self):
        return f"Analysis by {self.user.username} at {self.timestamp}"
