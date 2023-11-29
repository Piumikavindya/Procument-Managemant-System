// This is the main page navbar
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import '../styles/NavbarMain.css';

export default function NavbarMain({ isAuthenticated, handleSignOut, loggedInUser }) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        // Check if loggedInUser and loggedInUser.id are available, use them; otherwise, set userId to an empty string
        const userId = loggedInUser?.id || '';
        console.log('User ID:', userId); // Add this line
        const response = await axios.get(`http://localhost:8000/user/preview-user/${userId}`);
        
        console.log("User Data:", response.data);
        setUser(response.data);
      } catch (error) {
        console.log("Error fetching user:", error);
        console.log("Request config:", error.config);
        console.log("Response data:", error.response ? error.response.data : null);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, [loggedInUser]);

  useEffect(() => {
    console.log("loggedInUser changed:", loggedInUser);
  }, [loggedInUser]);

  return (
    <div className="App">
      <section id="content">
    
      <nav>
        <a href="#" className="logo">
          <img src="http://www.eng.ruh.ac.lk/img/unilogo.png" alt="FoE,UoR-" />
        </a>
        <a href="#" className="nav-link">Faculty of Engineering <br/>University of Ruhuna</a>
       
        <a href="#" className="notification">
          <i className='bx bxs-bell'></i>
          <span className="num">8</span>
        </a>
        <a href="#" className="profile" style={{ marginRight: '400px' }}>
          <img src="https://secure.gravatar.com/avatar/d09eaad01aea86c51b4f892b4f8abf6f?s=100&d=wavatar&r=g" alt="Profile" />
        </a>
        <ul className="flex items-center space-x-6">
          <li>
            <Link className="text-red-400 Navtext font-semibold text-lg logoutButton" to='/'>
              {/* Home */}
            </Link>
          </li>
          {/* <li>
            <span className="text-black Navtext font-semibold text-lg">
              Welcome, {user?.name}
            </span>
          </li> */}
          <li>
            {isAuthenticated ? (
              <button
                onClick={handleSignOut}
                className="text-red-400 Navtext font-semibold text-lg "
              >
                Sign Out
              </button>
            ) : (
              <Link
                className="text-red-400 Navtext font-semibold text-lg underline"
                to="/loginpage"
              >
                Sign In
              </Link>
            )}
          </li>
        </ul>
      </nav>
      </section>
    </div>
  );
}
