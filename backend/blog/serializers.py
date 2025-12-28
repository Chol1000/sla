from rest_framework import serializers
from .models import BlogPost

class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'slug', 'author', 'excerpt', 'content', 'image', 'video', 'video_url', 'category', 'read_time', 'created_at', 'updated_at', 'is_published']
        read_only_fields = ['slug', 'created_at', 'updated_at']
