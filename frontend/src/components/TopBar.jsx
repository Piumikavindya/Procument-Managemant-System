
// 'TopBar.jsx'
import React from "react";
import '../styles/TopBar.css';

export default function TopBar() {
  return (
    <div className="topBarStyle">
      {/* ... (previous JSX) */}
      <img src="/Image/Picture1.png" alt="Logo" className="imageStyle" />
      <div>
        <h1 className="facultyTextStyle">FACULTY OF ENGINEERING UNIVERSITY OF RUHUNA</h1>
        <h2 className="systemTextStyle">PROCUREMENT MANAGEMENT SYSTEM</h2>
      </div>
      <button className="logoutButton">Logout</button>
    </div>
  );
}
