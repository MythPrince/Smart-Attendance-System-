from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.files.storage import default_storage
import subprocess
import os

class UploadVideoView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        video_file = request.FILES['video']
        file_path = default_storage.save(f'media/videos/{video_file.name}', video_file)

        # Call the face recognition script with the uploaded video file path
        script_path = os.path.abspath("faceRecognitionScript.py")
        video_path = os.path.abspath(file_path)
        print("ile path" ,file_path)
        print("Script path:", script_path)
        print("Video path:", video_path)
        print("File exists:", os.path.exists(video_path))
        try:
            subprocess.run(['C:/Python312/python.exe', script_path, video_path], check=True)
            return Response({"message": "Video processed successfully."}, status=200)
        except subprocess.CalledProcessError as e:
            return Response({"error": str(e)}, status=500)

