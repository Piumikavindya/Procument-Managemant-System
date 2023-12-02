import React, { useState } from "react";
import "../styles/AdminHome.css";
// import Footer from '../components/footer';
// import Profile from '../components/Profile';
import NavbarMain from "../components/NavbarMain";

import HomeContent from "../components/HomeContent";
import Sidebar from "../components/SideBar";

function AdminHome() {
  const [isActive, setActive] = useState(false);

  // const toggleClass = () => {
  //   setActive(!isActive);
  // };
  return (
    <div className="App">
    <Sidebar isActive={isActive} />
    {/* <NavbarMain toggleClass={toggleClass} /> */}
    <HomeContent></HomeContent>
  </div>
  );
}

export default AdminHome;