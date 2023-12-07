import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';

import '../styles/Allusers.css';
import { MdOutlineDelete, MdPreview } from 'react-icons/md';
import BackButton from '../components/BackButton';

const HomeVenders = () => {
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
   
        <h1 className='title'>Venodrs Data List</h1>
        
        <BackButton destination='/admin' />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="reservation-list-container">
         <div className="table-container">
    <table className='reservation-table w-full border-separate border-spacing-2 p-3'>
      <thead>
        <tr className='p-3'>
          <th className='reservation-header border border-slate-600 rounded-md text-center'>No</th>
          <th className='reservation-header border border-slate-600 rounded-md text-center'>Supplier ID</th>
          <th className='reservation-header border border-slate-600 rounded-md text-center'>Supplier Name</th>
          <th className='reservation-header border border-slate-600 rounded-md text-center'>Address</th>
          <th className='reservation-header border border-slate-600 rounded-md text-center'>Contact Number</th>
          <th className='reservation-header border border-slate-600 rounded-md text-center'>Contact Email</th>
          <th className='reservation-header border border-slate-600 rounded-md text-center'>Type of Business</th>
          <th className='reservation-header border border-slate-600 rounded-md text-center'>Operations</th>

        </tr>
      </thead>
      <tbody className='p-5'>
        {supplyers.map((supplyer, index) => (
          <tr key={supplyer._id} className='reservation-row'>
            <td className=' border border-slate-700 rounded-md text-center'>{index + 1}</td>
            <td className='reservation-data border border-slate-400 rounded-md text-center'>{supplyer.username}</td>
            <td className='reservation-data border border-slate-600 rounded-md text-center'>{supplyer.supplierName}</td>
            <td className='reservation-data border border-slate-600 rounded-md text-center'>{supplyer.address}</td>
            <td className='reservation-data border border-slate-600 rounded-md text-center'>{supplyer.contactNumber}</td>
            <td className='reservation-data border border-slate-600 rounded-md text-center'>{supplyer.email}</td>
            <td className='reservation-data border border-slate-600 rounded-md text-center'>{supplyer.typeofBusiness}</td>
            <td className='reservation-data border border-slate-600 rounded-md text-center'>
              <div className='icon-link flex justify-center gap-x-4'>
                <Link to={`/previewvendor/${supplyer._id}`}>
                  <MdPreview className="text-2xl text-green-600" />
                </Link>
               
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

        </div>
      )}
    </div>
  );
};

export default HomeVenders;
