import React, { useState } from 'react';
import axios from 'axios';

const VideoUpload = () =>{
  const [file, setFile] = useState(null);
  const [message, setMessage] =useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a video file first.');
      return;
    }

    const formData = new FormData();
    formData.append('video', file);

    try {
      const response = await axios.post('http://localhost:8000/api/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);

      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error uploading file.');
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Video</button>
      <p>{message}</p>
    </div>
  );
};

export default VideoUpload;
