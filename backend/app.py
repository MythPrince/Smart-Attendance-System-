from flask import Flask, request, jsonify
from flask_cors import CORS
from face_recognition_script import func1
import os
import threading


app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024  # Set to 100 MB

CORS(app)

UPLOAD_FOLDER = 'videos'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/upload', methods=['POST'])
def upload_video():
    try:
        if 'video' not in request.files:
            return jsonify({'message': 'No video file part in the request'}), 400

        video = request.files['video']
        if video.filename == '':
            return jsonify({'message': 'No selected file'}), 400

        os.makedirs('videos', exist_ok=True)
        video_path = os.path.join('videos', 'uploaded_video.mp4')
        video.save(video_path)
        print(f"File uploaded successfully to {video_path}")

        # Run face recognition in a separate thread
        processing_thread = threading.Thread(target=func1, args=(video_path,))
        processing_thread.start()

        return jsonify({'message': 'Video uploaded successfully!'})
    except Exception as e:
        print("Upload Error:", str(e))
        return jsonify({'message': 'Failed to upload video', 'error': str(e)}), 500
