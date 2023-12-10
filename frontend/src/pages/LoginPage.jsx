import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/LoginPage.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsAuthenticated }) => {
    const [loggedInUser, setLoggedInUser] = useState(null);

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
      console.log('User details:', response.data.user);
      if (response.data.user) {
        // Authentication successful
        console.log('User signed in successfully:', response.data.user);
 // Update your state or localStorage with user details
 setLoggedInUser(response.data.user);

 // Update authentication state
 setIsAuthenticated(true);
       

        // Redirect based on user role
        switch (response.data.user.role) {
          case 'admin':
            navigate('/admin/' + response.data.user.id);
            break;
          case 'department':
            navigate('/department/' + response.data.user.id);
            break;
          case 'procurement Officer':
            navigate('/procurementOfficer/' + response.data.user.id);
            break;
            case 'TECofficer':
            navigate('/TECofficer/' + response.data.user.id);
            break;
            case 'Finance officers':
            navigate('/Finance officers/' + response.data.user.id);
            break;
            case 'approver':
            navigate('/approver/' + response.data.user.id);
            break;
          // Add more roles as needed
          default:
            console.log('Invalid role');


           
        }
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
      <div >
          <img   src="http://www.eng.ruh.ac.lk/img/unilogo.png" alt="FoE,UoR-"/>
          <h1>Procurement Management System</h1>
          <h1>Faculty of Engineering</h1>
          <h1>University of Ruhuna</h1>
        </div>

        <h3>LOGIN</h3>
        

        <div className="input-div">
         
          <div className="input-box">
            {/* Label for accessibility */}
            <select
              id="role"
              name="role"
              value={credentials.role}
              onChange={handleChange}
              className="role-select"
            >
              <option value="role" >
                Select your role
              </option>
              <option value="admin">Admin</option>
              <option value="procurmentofficer">Procurement Officer</option>
              <option value="financeofficers">Finance Officers</option>
              <option value="department">User Department</option>
              <option value="approver">Approver</option>
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
              requir 
            />
            <i className="fa-solid fa-envelope"></i>
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
           
           
          </div>
        </div>

        <div className="remember-forgot">
          <label style={{ color: '#00072D' }}>
            <input type="checkbox" />
           
          </label>
          <p style={{margin:"0px 200px 0px 0px",color:"#00072D", fontSize:"13.5px"}}>Remember me</p>
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
