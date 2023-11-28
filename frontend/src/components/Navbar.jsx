import React from "react";
import '../styles/hometest.css';

const Navbar = ({ toggleClass }) => {
  return (
    <nav>
      <i className='bx bx-menu' onClick={() => toggleClass()}></i>
     
      <a href="#" className="logo">
    <img   src="http://www.eng.ruh.ac.lk/img/unilogo.png" alt="FoE,UoR-"/>
    </a>
    <a href="#" className="nav-link">Faculty of Engineering <br/>University of Ruhuna</a>
   
    <a href="#" className="notification">
      <i className='bx bxs-bell' ></i>
      <span className="num">8</span>
    </a>
    <a href="#" className="profile">
      <img src="https://secure.gravatar.com/avatar/d09eaad01aea86c51b4f892b4f8abf6f?s=100&d=wavatar&r=g" />
    </a>
    </nav>
  );
};

export default Navbar;

