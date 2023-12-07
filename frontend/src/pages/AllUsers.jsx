import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import UserTable from '../components/home/UserTable';
import '../styles/Allusers.css';
import NavbarMain from '../components/NavbarMain';
import BackButton from '../components/BackButton';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch users data from your API endpoint
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:8000/user/view-users')  // Update the API endpoint
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

  return (

    <div className='p-4'>
      <div className="button-container p-8">
          <Link to={'/admin/:id'} className="button">
           Go Back
          </Link>
        </div>
      <div className='flex justify-between items-center'>
  
        <h1 className='title'>User Login Data List</h1>
       
       
        <div className="button-container p-8">
          <Link to={'/createusers'} className="button">
            Add User
          </Link>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="reservation-list-container">
          <UserTable users={users} />
        </div>
      )}
    </div>
  );
};

export default AllUsers;
