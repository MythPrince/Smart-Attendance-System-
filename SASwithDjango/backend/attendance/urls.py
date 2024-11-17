from django.urls import path
from .views import *

urlpatterns = [
    path('upload/',UploadVideoView.as_view(), name='upload_video'),
    path('recognized-faces/', RecognizedFacesView.as_view(),name='recognized_faces'),

]
