from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from .models import CropAnalysis
from .serializers import CropAnalysisSerializer, CropAnalysisListSerializer
from .ml_model import predict_disease


class AnalyzeCropView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        """
        Handle crop image upload and analysis
        """
        if 'image' not in request.data:
            return Response(
                {"error": "No image provided"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create a new CropAnalysis instance
        analysis = CropAnalysis.objects.create(
            user=request.user,
            image=request.data['image']
        )

        try:
            # Get the path to the saved image
            image_path = analysis.image.path

            # Perform disease prediction
            result = predict_disease(image_path)

            # Check if result contains an error
            if "error" in result:
                # Delete the analysis entry if prediction failed
                analysis.delete()
                return Response(
                    {"error": "Image analysis failed. Please try with a different image."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Save the result
            analysis.result = result
            analysis.save()

            # Return the result
            return Response(result, status=status.HTTP_200_OK)

        except Exception as e:
            # If there's an error, delete the analysis entry
            analysis.delete()
            # Log the actual error for debugging
            import logging
            logger = logging.getLogger(__name__)
            logger.error(f"Analysis failed: {str(e)}")
            # Return a generic error message to avoid exposing internal details
            return Response(
                {"error": "Analysis failed. Please try again or contact support."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class AnalysisHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Get the user's analysis history
        """
        analyses = CropAnalysis.objects.filter(user=request.user)
        serializer = CropAnalysisListSerializer(analyses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
