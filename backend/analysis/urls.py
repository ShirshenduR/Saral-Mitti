from django.urls import path
from .views import AnalyzeCropView, AnalysisHistoryView

urlpatterns = [
    path('upload/', AnalyzeCropView.as_view(), name='analyze-crop'),
    path('history/', AnalysisHistoryView.as_view(), name='analysis-history'),
]
