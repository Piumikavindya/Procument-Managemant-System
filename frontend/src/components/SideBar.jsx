import React from 'react'
 import "../styles/Sidebar.css";
// import "../styles/AdminHome.css";
export default function Sidebar({ isActive }) {
  return (
    <div className="App">
   <section id="sidebar" className={isActive ? 'hide' :null}>
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
            <a href="/adminhome">
              <i className="fa fa-file-text" aria-hidden="true"></i>
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
        <ul className="side-menu">
          <li>
            <a href="adminhome" className="logout">
              <i className="bx bxs-log-out-circle"></i>
              <span className="text">Logout</span>
            </a>
          </li>
        </ul>
      </section>
      </div>
  
  )
}
