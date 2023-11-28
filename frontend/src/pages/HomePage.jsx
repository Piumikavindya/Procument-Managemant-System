import React, { useState } from "react";
import "../styles/hometest.css";

function HomePg() {
  const [isActive, setActive] = useState(false);
  const toggleClass = () => {
    setActive(!isActive);
  };
  return (
    <div className="App">
      <section id="sidebar" className={isActive ? "hide" : null}>
        <a href="#" class="brand">
          <i className="bx bxs-smile"></i>
          <span className="text">AdminHub</span>
        </a>
        <ul className="side-menu top">
          <li className="active">
            <a href="#">
              <i className="bx bxs-dashboard"></i>
              <span className="text">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa fa-user-circle" aria-hidden="true"></i>
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
              <i className="bx bxs-message-dots"></i>
              <span className="text">View Request</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa fa-file-text" aria-hidden="true"></i>
              <span className="text">View Documents</span>
            </a>
          </li>
        </ul>
        <ul className="side-menu">
          <li>
            <a href="#">
              <i className="bx bxs-cog"></i>
              <span className="text">Settings</span>
            </a>
          </li>
          <li>
            <a href="#" class="logout">
              <i className="bx bxs-log-out-circle"></i>
              <span className="text">Logout</span>
            </a>
          </li>
        </ul>
      </section>

      <section id="content">
        <nav>
          <i className="bx bx-menu" onClick={toggleClass}></i>
          <a href="#" className="logo">
            <img
              src="http://www.eng.ruh.ac.lk/img/unilogo.png"
              alt="FoE,UoR-"
            />
          </a>
          <a href="#" className="nav-link">
            Faculty of Engineering <br />
            University of Ruhuna
          </a>

          <a href="#" className="notification">
            <i className="bx bxs-bell"></i>
            <span className="num">8</span>
          </a>
          <a href="#" className="profile">
            <img src="https://secure.gravatar.com/avatar/d09eaad01aea86c51b4f892b4f8abf6f?s=100&d=wavatar&r=g" />
          </a>
        </nav>

        <main>
          <div className="head-title">
            <div className="left">
              <h1>Home</h1>
              <ul className="breadcrumb">
                
                
              </ul>
            </div>
            
          </div>

          <ul className="box-info">
            <li>
              <i className="bx bxs-dollar-circle"></i>
              <span className="text"></span>
              <a href="?p=front_cont&amp;a=registered_vendors">View more</a>
            </li>
            <li>
              <i className="bx bxs-dollar-circle"></i>
              <span className="text"></span>
            </li>
            <li>
              <i className="bx bxs-dollar-circle"></i>
              <span className="text"></span>
            </li>

            <li>
              <i className="bx bxs-dollar-circle"></i>
              <span className="text"></span>
            </li>
            <li>
              <i className="bx bxs-dollar-circle"></i>
              <span className="text"></span>
            </li>
            <li>
              <i className="bx bxs-dollar-circle"></i>
              <span className="text"></span>
            </li>
            <li>
              <i className="bx bxs-dollar-circle"></i>
              <span className="text"></span>
            </li>
            <li>
              <i className="bx bxs-dollar-circle"></i>
              <span className="text"></span>
            </li>
            <li>
              <i className="bx bxs-dollar-circle"></i>
              <span className="text"></span>
            </li>
          </ul>
          
        </main>
      </section>
    </div>
  );
}

export default HomePg;
