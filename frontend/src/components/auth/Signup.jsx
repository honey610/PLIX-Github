// src/components/auth/Signup.jsx
// src/components/auth/Signup.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Heading, Box, Button } from '@primer/react';
import './auth.css';
import logo from '../../assets/github-mark-white.svg';
import { useAuth } from '../../authContext.jsx';

const Signup = () => {
  const { login } = useAuth(); // Use the login function from context
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:3000/signup', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      login({ userId: response.data.userId }, response.data.token);
      console.log('Signup successful, redirecting to /login');
      window.location.href = '/'; // Ensure this matches the route
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.response?.data?.message || 'Signup failed');
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
          <Heading as="h1">Sign Up</Heading>
        </Box>
        <form onSubmit={handleSubmit} className="login-box">
          <div>
            <label className="label" htmlFor="Username">
              Username
            </label>
            <input
              autoComplete="off"
              name="username"
              id="Username"
              className="input"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
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
              value={formData.email}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <Button
            variant="primary"
            className="login-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </form>
        <div className="pass-box">
          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;