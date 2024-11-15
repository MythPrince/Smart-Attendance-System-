import { useState } from 'react'

import './App.css'

import VideoUpload from './components/VideoUpload'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <h1>Smart Attendance System</h1>
      <VideoUpload />
    </div>
      
    </>
  )
}

export default App
