// 'SideBar.jsx'
import React from 'react';
import '../styles/SideBar.css';

export default function SideBar() {
    const handleCheckboxChange = () => {
        const checkbox = document.getElementById('check');
        const sidebar = document.querySelector('.sidebar');
        const topBar = document.querySelector('.topBarStyle');

        if (checkbox.checked) {
            sidebar.style.left = '0';
            topBar.style.transform = 'translateX(250px)';
        } else {
            sidebar.style.left = '-250px';
            topBar.style.transform = 'translateX(0)';
        }
    };

    return (
        <div className="sidebar">
            {/* ... (previous JSX) */}
            <header>Admin</header>
            <input type="checkbox" id="check" onChange={handleCheckboxChange} />
            <label htmlFor="check">
                <i className="fas fa-bars" id="btn"></i>
                <i className="fas fa-times" id="cancel"></i>
            </label>
            <ul>
            <li><a href='/adminhome'><i className="fas fa-home" style={{ color: '#FFFFFF', marginRight: '10px' }}></i> Home</a></li>
                <li><a href='/adminaccount'><i className="fas fa-user-tag" style={{ color: '#FFFFFF', marginRight: '10px' }}></i> Admin Account</a></li>
                <li><a href='#'><i className="fas fa-file" style={{ color: '#FFFFFF', marginRight: '10px' }}></i> Generate Document</a></li>
                <li><a href='#'><i className="fas fa-qrcode" style={{ color: '#FFFFFF', marginRight: '10px' }}></i> View Document</a></li>
                <li><a href='/AllUsers'><i className="fas fa-building-columns" style={{ color: '#FFFFFF', marginRight: '10px' }}></i> Manage Departments</a></li>
                <li><a href='#'><i className="fas fa-shopping-cart" style={{ color: '#FFFFFF', marginRight: '10px' }}></i> Manage Suppliers</a></li>
                <li><a href='#'><i className="fas fa-tasks" style={{ color: '#FFFFFF', marginRight: '10px' }}></i> Procurement Progress</a></li>
            
            </ul>
        </div>
    );
        
    
}
