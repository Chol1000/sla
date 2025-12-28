from rest_framework import serializers
from .models import StudentLeader

class StudentLeaderSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentLeader
        fields = '__all__'
