// 'TopBar.jsx'
import '../styles/TopBar.css';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function TopBar({ isAuthenticated, handleSignOut, loggedInUser }) {
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
    <div className="topBarStyle">
      <img src="/Image/Picture1.png" alt="Logo" className="imageStyle" />
      <div>
        <h1 className="facultyTextStyle">FACULTY OF ENGINEERING UNIVERSITY OF RUHUNA</h1>
        <h2 className="systemTextStyle">PROCUREMENT MANAGEMENT SYSTEM</h2>
      </div>

      <ul className="flex items-center space-x-6">
        <li>
          <Link className="text-red-400 Navtext font-semibold text-lg logoutButton" to='/'>
            Home
          </Link>
        </li>
        <li>
          <span className="text-black Navtext font-semibold text-lg">
            Welcome, {user?.name}
          </span>
        </li>
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
              className="text-red-400 Navtext font-semibold text-lg"
              to="/loginpage"
            >
              Sign In
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
}
