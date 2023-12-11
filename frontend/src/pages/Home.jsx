import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Footer from '../components/footer';
import NavbarMain from '../components/NavbarMain';

function Home() {
  
  const { id } = useParams();
  return (
 
    <div className="App">
      <NavbarMain></NavbarMain>
      <section id="content1">
       
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
          <Footer/>
        </main>
        
      </section>
    </div>
  );
}

export default Home;
