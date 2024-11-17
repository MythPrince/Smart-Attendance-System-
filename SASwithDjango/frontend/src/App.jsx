import { useState } from 'react'

import './App.css'

import RecognizedFaces from './components/recognizedFaces'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <h1>Smart Attendance System</h1>
      <RecognizedFaces/>
    </div>
      
    </>
  )
}

export default App
