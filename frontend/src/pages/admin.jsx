import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
// import "../styles/AdminHome.css";
import Profile from '../components/Profile';

// import '../styles/NavbarMain.css';



function Admin({ isAuthenticated, handleSignOut, loggedInUser}) {
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
    <div className="App">
  
  <section id="sidebar" className={isActive ? 'hide' :'null'}>
        <a className="brand">
          <i className="bx bxs-smile"></i>
          <span className="text">AdminHub</span>
        </a>
        <ul className="side-menu top">
          <li className="active">
            <a href="/adminhome">
              <i className="bx bxs-dashboard"></i>
              <span className="text">Home</span>
            </a>
          </li>
          
          <li>

            <a href="/AllUsers">
              <i className="fa fa-users" aria-hidden="true"></i>
              <span className="text">User Regestration</span>
            </a>
          </li>
          <li>
            <a href="/adminhome">
              <i className="bx bxs-message-dots"></i>
              <span className="text">Add Department</span>
            </a>
          </li>
          <li>
            <a href="/AllVenders">
            <i class="fa-sharp fa-solid fa-person-circle-plus fa-2xl"></i>
              <span className="text">Add Vendor</span>
            </a>
          </li>
          <li>
            <a href="/adminhome">
              <i className="fa fa-file-text" aria-hidden="true"></i>
              <span className="text">Add Item</span>
            </a>
          </li>
          <li>
            <a href="/adminhome">
              <i className="fa fa-file-text" aria-hidden="true"></i>
              <span className="text">Add Budget</span>
            </a>
          </li>
        </ul>
       
      </section>
      <section id="content">
       
        <nav>
          <i  className='bx bx-menu'  onClick={toggleClass}  ></i>
          <div className="logo">
          <img   src="http://www.eng.ruh.ac.lk/img/unilogo.png" alt="FoE,UoR-"/>
          </div>
          <a href="#" className="nav-link">Faculty of Engineering <br/>University of Ruhuna</a>
         
          <a href="#" className="notification">
            <i className='bx bxs-bell' ></i>
            <span className="num">8</span>
          </a>
          
  <ul className="flex items-left space-x-1 p-5">
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
              
              <Link
                onClick={handleSignOut}
                className="text-red-400 Navtext font-semibold text-lg underline "
                to="/"
              >
                Sign Out
              </Link>
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
      
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Home</h1>
              <ul className="breadcrumb"></ul>
            </div>
          </div>

          <ul className="box-info">
            <li className="commonOpt" id="guideline">
              <h4>How To Use The System</h4>
              <h5 className="explanation">
                This is guidelines section for the Departments ,Suppliers,Procurement Officers
                 & other finance division staffs.
              </h5>
            </li>
            <Link to="/homevendors" className="custom-link">
            <li className="commonOpt" id="vendors">
              <h4>Registered Vendors</h4>
              <h5 className="explanation">
                Here more than 1000 vendors are registered up to now.
              </h5>
            </li>
            </Link>
            <li className="commonOpt" id="notice">
              <h4>Procurement Notices</h4>
              <h5 className="explanation">
                This  section contains all procurement notices  up to date.
              </h5>
            </li>
            <Link to="/yearplanner" className="custom-link">
        <li className="commonOpt" id="yrPlanner">
          <h4>Year Planner</h4>
          <h5 className="explanation">
            All the events which are planned to conduct this year are scheduled here.
          </h5>
        </li>
      </Link>
          </ul>
          
        </main>
        
       
      </section>
     
    </div>
  );
}

export default Admin;