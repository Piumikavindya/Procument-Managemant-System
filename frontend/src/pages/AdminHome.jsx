import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const AdminHome = () => {

  const { id } = useParams();
  return (
    <div>
      <p>Welcome to the Admin Home page!</p>
      <div className="button-container">
        <button> <Link to={`/AllUsers`} className="create-button">
            Manage Users
          </Link></button>
              
          <button> 
            <Link to={`/changePassword/${id}`} className="create-button p-3">
            Change Password
          </Link>
          </button>
                
            </div>
      
    </div>
  );
};

export default AdminHome;
