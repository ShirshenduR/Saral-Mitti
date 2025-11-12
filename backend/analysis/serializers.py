from rest_framework import serializers
from .models import CropAnalysis


class CropAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = CropAnalysis
        fields = ('id', 'user', 'image', 'result', 'timestamp')
        read_only_fields = ('user', 'result', 'timestamp')


class CropAnalysisListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CropAnalysis
        fields = ('id', 'image', 'result', 'timestamp')
        read_only_fields = ('result', 'timestamp')
