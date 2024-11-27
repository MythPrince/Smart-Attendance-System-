import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', { username, password });
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      setIsAuthenticated(true);
      navigate('/upload-video'); // Redirect to Upload Video page
    } catch (error) {
      setMessage(error.response.data.error || 'Invalid credentials.');
    }
  };

  const handleSignup = async(e) => {
    e.preventDefault();
    navigate('/signup');
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br></br>
        <br></br>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br></br>
        <br></br>
        
        <button type="submit">Login</button>
        &nbsp;
        &nbsp;
        <button onClick={handleSignup}>Signup</button>

      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
