import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <p>Welcome to the Home page!</p>
      <Link to="/loginpage">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default Home;
