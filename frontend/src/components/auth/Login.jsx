// src/components/auth/Login.jsx
// src/components/auth/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Heading, Box, Button } from '@primer/react';
import './auth.css';
import logo from '../../assets/github-mark-white.svg';
import { useAuth } from '../../authContext.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // Use the login function from context

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post('http://localhost:3000/login', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.userId);
      login({ userId: res.data.userId }, res.data.token); // Updated to use login
      window.location.href = '/';
    } catch (err) {
      console.error('Login error:', err);
      setError('Login Failed! Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-logo-container">
        <img className="logo-login" src={logo} alt="GitHub Logo" />
      </div>
      <div className="login-box-wrapper">
        <Box sx={{ padding: 1 }}>
          <Heading as="h1">Sign In</Heading>
        </Box>
        <div className="login-box">
          <div>
            <label className="label" htmlFor="Email">
              Email address
            </label>
            <input
              autoComplete="off"
              name="email"
              id="Email"
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="label" htmlFor="Password">
              Password
            </label>
            <input
              autoComplete="off"
              name="password"
              id="Password"
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <Button
            variant="primary"
            className="login-btn"
            disabled={loading}
            onClick={handleLogin}
          >
            {loading ? 'Loading...' : 'Login'}
          </Button>
        </div>
        <div className="pass-box">
          <p>
            New to GitHub? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;