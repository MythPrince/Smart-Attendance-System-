



// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import "./login.css";

// const Login = ({ setIsAuthenticated }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);

//   const handleClickShowPassword = () => setShowPassword((show) => !show);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://127.0.0.1:8000/api/login/', { username, password });
//       localStorage.setItem('accessToken', response.data.access);
//       localStorage.setItem('refreshToken', response.data.refresh);
//       setIsAuthenticated(true);
//       navigate('/upload-video'); // Redirect to Upload Video page
//     } catch (error) {
//       setMessage(error.response.data.error || 'Invalid credentials.');
//     }
//   };

//   const handleSignup = (e) => {
//     e.preventDefault();
//     navigate('/signup');
//   };

//   return (
//     // <div className="background">
//     <div className="login">
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <TextField
//           id="username"
//           label="Username"
//           variant="outlined"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           fullWidth
//           margin="normal"
//           required
//         />
//         <TextField
//           id="password"
//           label="Password"
//           type="password"
//           variant="outlined"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           fullWidth
//           margin="normal"
//           required
//         />
//         <div style={{ marginTop: "20px" }}>
//           <Button
//             variant="contained"
//             color="primary"
//             type="submit"
//             style={{ marginRight: "10px" }}
//           >
//             Login
//           </Button>
//           <Button variant="outlined" color="secondary" onClick={handleSignup}>
//             Signup
//           </Button>
//         </div>
//       </form>
//       {message && <p style={{ color: "red", marginTop: "15px" }}>{message}</p>}
//     </div>
//     // </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './login.css';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
      setMessage(error.response?.data?.error || 'Invalid credentials.');
    }
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          style={{ marginTop: '10px' }}
          onClick={handleSignup}
        >
          Signup
        </Button>
      </form>
      {message && <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>}
    </div>
  );
};

export default Login;

