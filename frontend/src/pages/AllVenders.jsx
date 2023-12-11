import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import VendorTable from '../components/home/VendorTable.jsx';
import '../styles/Allusers.css';
import BackButton from '../components/BackButton.jsx';

const AllVenders = () => {
  const [supplyers, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch users data from your API endpoint
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:8000/supplyer/view-supplyers')  // Update the API endpoint
      .then(response => {
        setVendors(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching supplyer:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
      <BackButton destination='/admin' />
        <h1 className='title'>Venodrs Data List</h1>
      
        {/* These two buttons should be removed later */}
        <div className="button-container">
          <Link to={'/addvendeors'} className="button">
            Add Vendor
          </Link>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="reservation-list-container">
          <VendorTable supplyers={supplyers} />
        </div>
      )}
    </div>
  );
};

export default AllVenders;
