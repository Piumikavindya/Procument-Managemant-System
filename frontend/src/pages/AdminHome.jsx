import React from 'react';
import { Link } from 'react-router-dom';

const AdminHome = () => {
  return (
    <div>
      <p>Welcome to the Admin Home page!</p>
      <div className="button-container">
        <button><Link to={'/AllUsers'} className="create-button">
               Manage Users
              </Link></button>
              
             
            </div>
      
    </div>
  );
};

export default AdminHome;
