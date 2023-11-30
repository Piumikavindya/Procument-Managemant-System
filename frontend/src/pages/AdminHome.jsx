import React, { useState } from "react";
import "../styles/AdminHome.css";
import Footer from '../components/footer';

function HomePg() {
  const [isActive, setActive] = useState(false);
  const toggleClass = () => {
    setActive(!isActive);
  };
  return (
    <div className="App">
      <section id="sidebar" className={isActive ? "hide" : null}>
        <a href="#" className="brand">
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
            <a href="/adminhome">
              <i className="fa fa-user-circle" aria-hidden="true"></i>
              <span className="text">My account</span>
            </a>
          </li>
          <li>
            <a href="/adminhome">
              <i className="fa fa-users" aria-hidden="true"></i>
              <span className="text">Manage Users</span>
            </a>
          </li>
          <li>
            <a href="/adminhome">
              <i className="bx bxs-message-dots"></i>
              <span className="text">View Request</span>
            </a>
          </li>
          <li>
            <a href="/adminhome">
              <i class="fa fa-file-text" aria-hidden="true"></i>
              <span className="text">View Documents</span>
            </a>
          </li>
        </ul>
        <ul className="side-menu">
          <li>
            <a href="adminhome">
              <i className="bx bxs-cog"></i>
              <span className="text">Settings</span>
            </a>
          </li>
          <li>
            <a href="adminhome" className="logout">
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
          <a href="/adminhome" className="nav-link">
            Faculty of Engineering <br />
            University of Ruhuna
          </a>

          <a href="/adminhome" className="notification">
            <i className="bx bxs-bell"></i>
            <span className="num">8</span>
          </a>
          <a href="/adminhome" className="profile">
            <img src="https://secure.gravatar.com/avatar/d09eaad01aea86c51b4f892b4f8abf6f?s=100&d=wavatar&r=g" />
          </a>
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
            <li className="commonOpt" id="vendors">
              <h4>Registered Vendors</h4>
              <h5 className="explanation">
                Here more than 1000 vendors are registered up to now.
              </h5>
            </li>
            <li className="commonOpt" id="notice">
              <h4>Procurement Notices</h4>
              <h5 className="explanation">
                This  section contains all procurement notices  up to date.
              </h5>
            </li>
            <li className="commonOpt" id="yrPlanner">
              <h4>Year Planner</h4>
              <h5 className="explanation">
                 All the events which are planned to conduct this year are scheduled here.
              </h5>
            </li>
          </ul>
          <Footer/>
        </main>
      </section>
    </div>
  );
}

export default HomePg;