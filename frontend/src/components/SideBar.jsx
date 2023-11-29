import React, { useState } from "react";
import '../styles/SideBar.css';

const SideBar = ({ isActive }) => {
  return (
    <section id="sidebar" className={isActive ? 'hide' : null}>
    <a href="#" className="brand">
      <i className='bx bxs-smile'></i>
      <span className="text">AdminHub</span>
    </a>
    <ul className="side-menu top">
      <li className="active">
        <a href="#">
          <i className='bx bxs-dashboard' ></i>
          <span className="text">Dashboard</span>
        </a>
      </li>
      <li>
        <a href="#">
        <i className="fa fa-user-circle" aria-hidden="true"></i>
          <span className="text">My account</span>
        </a>
      </li>
      <li>
        <a href="#">
        <i className="fa fa-users" aria-hidden="true"></i>
          <span className="text">Manage Users</span>
        </a>
      </li>
      <li>
        <a href="#">
          <i className='bx bxs-message-dots' ></i>
          <span className="text">View Request</span>
        </a>
      </li>
      <li>
        <a href="#">
        <i className="fa fa-file-text" aria-hidden="true"></i>
          <span className="text">View Documents</span>
        </a>
      </li>
    </ul>
    <ul className="side-menu">
      <li>
        <a href="#">
          <i className='bx bxs-cog' ></i>
          <span className="text">Settings</span>
        </a>
      </li>
      <li>
        <a href="#" className="logout">
          <i className='bx bxs-log-out-circle' ></i>
          <span className="text">Logout</span>
        </a>
      </li>
    </ul>
  </section>
  );
};

export default SideBar;
