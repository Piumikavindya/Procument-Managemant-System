import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/LoginPage.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    role: '',
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://localhost:8000/user/signIn', {
        email: credentials.email,
        password: credentials.password,
        role: credentials.role,
      });

      if (response.data.user) {
        // Authentication successful
        console.log('User signed in successfully');
        navigate('/');
        // Add logic to handle authentication, e.g., store user data in state or localStorage
      } else {
        // Authentication failed
        console.log('Invalid email or password');
        // Set an error state or show an error message to the user
      }
    } catch (error) {
      // Handle errors, e.g., network issues or server errors
      console.error('Signin failed:', error);
    }
  };
  return (
    <div className="wrapper">
      <form action="" onSubmit={handleSignIn}>
        <div>
          <h1>Procurement Management System</h1>
          <h1>Faculty of Engineering</h1>
          <h1>University of Ruhuna</h1>
        </div>

        <h3>LOGIN</h3>

        <div className="input-div">
          {/* Role Dropdown */}
          <div className="input-box">
            {/* Label for accessibility */}
            <select
              id="role"
              name="role"
              value={credentials.role}
              onChange={handleChange}
              className="role-select"
            >
              <option value="role" disabled selected>
                Select your role
              </option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="guest">Guest</option>
              {/* Add more options as needed */}
            </select>
            <i className="bx bxs-user"></i>
          </div>

          {/* Email Input */}
          <div className="input-box">
            <input
              type="email"  
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Email"  
              required
            />
            <i className="bx bxs-user"></i>
          </div>

          {/* Password Input */}
          <div className="input-box">
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <i className="bx bxs-lock-alt"></i>
            <i className="bx bxs-show" style={{ marginLeft: '16px' }}></i>
            <i className="bx bxs-low-vision" style={{ marginLeft: '16px' }}></i>
          </div>
        </div>

        <div className="remember-forgot">
          <label style={{ color: '#800000' }}>
            <input type="checkbox" />Remember me
          </label>
          <Link to="/changePassword">Forgot password?</Link>
        </div>
        {/* Should be changed */}
        <button type="button" className="login-btn" onClick={handleSignIn}>
          Login
        </button>
      </form>
    </div>
  );
};
export default LoginPage;
