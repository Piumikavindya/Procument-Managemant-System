import React from 'react';
import { Link } from 'react-router-dom';

const AdminHome = () => {
  return (
    <div>
      <p>Welcome to the Home page!</p>
      <Link to="/adminaccount">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default AdminHome;
