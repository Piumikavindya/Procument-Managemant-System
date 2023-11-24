
import React from 'react';
import '../styles/LoginPage.css';
import { Link } from "react-router-dom";

const LoginPage = () => {
    return (
        <div className="wrapper">
            <form action="">
                <div>
                    <h1>Procurement Management System</h1>
                    <h1>Faculty of Engineering</h1>
                    <h1>University of Ruhuna</h1>
                </div>

                <h3>LOGIN</h3>

                <div className="input-div">
                    {/* Role Dropdown */}
                    <div className="input-box">
                        {/* Label for accessibility */}
                       
                        <select id="role" name="role" className="role-select">
                            <option value="" disabled selected>
                                Select your role
                            </option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                            <option value="guest">Guest</option>
                            {/* Add more options as needed */}
                        </select>
                        <i className='bx bxs-user'></i>
                    </div>

                    {/* Username Input */}
                    <div className="input-box">
                        <input type="text" placeholder="Username" required />
                        <i className='bx bxs-user'></i>
                    </div>

                    {/* Password Input */}
                    <div className="input-box">
                        <input type="password" placeholder="Password" required />
                        <i className='bx bxs-lock-alt'></i>
                        <i className='bx bxs-show' style={{ marginLeft: '16px' }}></i>
                        <i className='bx bxs-low-vision' style={{ marginLeft: '16px' }}></i>
                    </div>
                </div>

                <div className="remember-forgot">
                    <label style={{ color: '#800000' }}><input type="checkbox" />Remember me</label>
                    <Link to="/changePassword">Forgot password?</Link>
                    
                </div>
                 {  /* Should be changed */ }
                <button type="submit" className="login-btn"><Link to="/adminhome">Login</Link></button>
               
            </form>
        </div>
    );
}

export default LoginPage;
