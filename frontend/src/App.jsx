import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import '../backend/upload.html'
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
