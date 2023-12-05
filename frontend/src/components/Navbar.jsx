import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
//  import "../styles/Navbar.css";
//  import "../styles/Sidebar.css";
//  import "../styles/MainContent.css";
import "../styles/AdminHome.css";
import Profile from '../components/Profile';
import Sidebar from "./SideBar";


export default function Navbar({ isAuthenticated, handleSignOut, loggedInUser}) {
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

    const [isActive, setActive] = useState(false);


    const [showDropdown, setShowDropdown] = useState(false);
    const toggleClass = () => {
      setActive(!isActive);
      
  
    };
    const toggleDropdown = () => {
      setShowDropdown(!showDropdown);
    };


  return (
    <div className={`App ${isActive ? 'hide' : ''}`}>
       <section id="content">
    <nav>
    <i className="bx bx-menu" onClick={toggleClass}></i>
    <a href="#" className="logo">
      <img
        src="http://www.eng.ruh.ac.lk/img/unilogo.png"
        alt="FoE,UoR-"
      />
    </a>
    <a href="/adminhome" className="nav-link">
      Faculty of Engineering <br />
      University of Ruhuna
    </a>

  
    <div className="profile" onClick={toggleDropdown}>
    <img src="https://secure.gravatar.com/avatar/d09eaad01aea86c51b4f892b4f8abf6f?s=100&d=wavatar&r=g" />
    {/* Render the dropdown only if showDropdown is true */}
    {showDropdown && <Profile />}
   
  </div>
  <ul className="flex items-left space-x-6">
          {/* <li>
            <Link className="text-red-400 Navtext font-semibold text-lg logoutButton" to='/'>
          
            </Link>
          </li> */}
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
              style={{ marginLeft: '680px', textDecoration: 'underline' }}
            >
              Sign In
            </Link>
            )}
          </li>
        </ul>
  </nav>
  <Sidebar isActive={isActive} />
  </section>  
  </div>)
}
