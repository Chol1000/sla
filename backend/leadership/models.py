from django.db import models

class StudentLeader(models.Model):
    year = models.CharField(max_length=4)
    position = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to='leadership/')
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['year', 'order', 'position']

    def __str__(self):
        return f"{self.year} - {self.position}: {self.name}"
