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
   
      <section id="content1">
      <nav>
        <a href="#" className="logo">
          <img src="http://www.eng.ruh.ac.lk/img/unilogo.png" alt="FoE,UoR-" />
        </a>
        <a href="#" className="nav-link"><div className="foe" >Faculty of Engineering </div>University of Ruhuna</a>
       
        <ul className="flex items-center space-x-6">
         
       
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
              style={{ marginLeft: '178px', textDecoration: 'none' }}
            >
              Sign In
            </Link>
            )}
          </li>
        </ul>
      </nav>
      </section>
    
  );
}
