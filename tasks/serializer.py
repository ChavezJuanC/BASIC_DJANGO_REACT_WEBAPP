from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        # fields = ('id', 'title', 'description', 'done')
        # serialize all fields
        model = Task
        fields = "__all__"
