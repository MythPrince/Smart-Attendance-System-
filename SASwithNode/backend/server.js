const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const { spawn } = require('child_process');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;


mongoose.connect('mongodb://localhost:27017/attendanceNode', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});


const recognizedFaceSchema = new mongoose.Schema({
    name: String,
    timestamp: String,
});
// const RecognizedFace = mongoose.model('RecognizedFace', recognizedFaceSchema);


app.use(cors());
app.use(express.json());


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, 'uploaded_video.mp4');
    },
});
const upload = multer({ storage: storage });


app.post('/upload', upload.single('video'), (req, res) => {
    const videoPath = path.join(__dirname, 'uploads', 'uploaded_video.mp4');

 
    if(!fs.existsSync(videoPath)) {
        return res.status(400).json({ message: 'Video file not found' });
    }

    console.log('File uploaded successfully:', videoPath);

   
    const pythonProcess = spawn('C:/Python312/python.exe', ['face_recognition_script.py', videoPath]);

    pythonProcess.stdout.on('data', (data) => {
        console.log(`Python script output: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python script error: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        if(code ===0) {
            console.log('Python script executed successfully');
            res.json({ message: 'Video processed successfully'});
        }else{
            console.error('Python script exited with code:', code);
            res.status(500).json({ message: 'Failed to process video'});
        }
    });
});

// Get recognized faces endpoint
// app.get('/recognized-faces', async (req, res) => {
//     try {
//         const faces = await RecognizedFace.find();
//         res.json(faces);
//     } catch (err) {
//         console.error('Error fetching recognized faces:', err);
//         res.status(500).json({ message: 'Failed to fetch recognized faces' });
//     }
// });


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
