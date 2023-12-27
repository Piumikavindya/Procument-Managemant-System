/*
  This example requires some changes to your config:
  
  
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  
*/
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
//import '../styles/LoginPage.css';
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
              navigate('/adminhome/' + response.data.user.id);
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
    <>
      {/*
        This example requires updating your template:

        
        <html class="h-full bg-white">
        <body class="h-full">
        
      */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-15 w-20"
            src="http://www.eng.ruh.ac.lk/img/unilogo.png"
            alt="FoE,UoR-"

          />
            <h1 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Procurement Management System
          </h1>
          <h1 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Faculty of Engineering
          </h1>
          <h1 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            University of Ruhuna
          </h1>
          <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            LOGIN
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSignIn}>

          <div>
              <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                Role
              </label>
              <div className="mt-2">
              <select
              id="role"
              name="role"
              value={credentials.role}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

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
            </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                    type="email"  
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    placeholder="Email"  
                    requir 
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                   type="password"
                   name="password"
                   value={credentials.password}
                   onChange={handleChange}
                   placeholder="Password"
                   required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={handleSignIn}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default LoginPage;
