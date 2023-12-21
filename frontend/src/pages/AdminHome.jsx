import React, { useState } from "react";

// import Footer from '../components/footer';
// import Profile from '../components/Profile';
import HomeContent from "../components/HomeContent";
// import "../styles/AdminHome.css";
import Navbar from "../components/Navbar";


function AdminHome() {
  // const [isActive, setActive] = useState(false);

  // const toggleClass = () => {
  //   setActive(!isActive);
  // };
  return (
    <div className="App">
    
    {/* <Navbar toggleClass={toggleClass}></Navbar> */}
    <HomeContent></HomeContent>
  </div>
  );
}

export default AdminHome;