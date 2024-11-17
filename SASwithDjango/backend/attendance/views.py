from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.files.storage import default_storage
from pymongo import MongoClient
import subprocess
import os
import uuid

client = MongoClient('mongodb://localhost:27017/')
db = client['attendance']
collection =db['recognized_faces']

class UploadVideoView(APIView):
    parser_classes= (MultiPartParser, FormParser)

    def post(self,request,*args,**kwargs):
        video_file = request.FILES['video']
        file_path = default_storage.save(f'media/videos/{video_file.name}', video_file)

        script_path = os.path.abspath("faceRecognitionScript.py")
        video_path = os.path.abspath(file_path)
        session_id = str(uuid.uuid4())  

        try:
            subprocess.run(['C:/Python312/python.exe', script_path, video_path, session_id], check=True)
            return Response({"message": "Video processed successfully.", "session_id": session_id}, status=200)
        except subprocess.CalledProcessError as e:
            return Response({"error": str(e)}, status=500)

class RecognizedFacesView(APIView):
    def get(self,request,*args, **kwargs):
        session_id = request.query_params.get('session_id')
        if not session_id:
            return Response({"error": "Session ID is required."},status=400)

        try:
            faces = list(collection.find({"session_id":session_id}, {"_id": 0, "name": 1}))
            names = [face["name"] for face in faces]
            return Response({"recognized_faces": names}, status=200)
        except Exception as e:
            return Response({"error": str(e)},status=500)
