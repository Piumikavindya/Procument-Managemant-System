// ReservationTable.js

import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import './UserTable.css';

const UserTable = ({ users }) => {
  
  return (
    <div className="table-container">
    <table className='reservation-table w-full border-separate border-spacing-2 p-3'>
      <thead>
        <tr>
          <th className='reservation-header border border-slate-600 rounded-md text-center'>No</th>
          <th className='reservation-header border border-slate-600 rounded-md text-center'>Role</th>
          <th className='reservation-header border border-slate-600 rounded-md text-center'>Email</th>
          <th className='reservation-header border border-slate-600 rounded-md text-center'>Name</th>
          <th className='reservation-header border border-slate-600 rounded-md text-center'>Username</th>
          <th className='reservation-header border border-slate-600 rounded-md text-center'>Password</th>
          <th className='reservation-header border border-slate-600 rounded-md text-center'>Operations</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user._id} className='reservation-row'>
            <td className='reservation-data border border-slate-600 rounded-md text-center'>{index + 1}</td>
            <td className='reservation-data border border-slate-600 rounded-md text-center'>{user.role}</td>
            <td className='reservation-data border border-slate-600 rounded-md text-center'>{user.email}</td>
            <td className='reservation-data border border-slate-600 rounded-md text-center'>{user.name}</td>
            <td className='reservation-data border border-slate-600 rounded-md text-center'>{user.username}</td>
            <td className='reservation-data border border-slate-600 rounded-md text-center'>{user.password}</td>
            <td className='reservation-data border border-slate-600 rounded-md text-center'>
              <div className='icon-link'>
                <Link to={`/user/details/${user._id}`}>
                  <BsInfoCircle className='reservation-icon' />
                </Link>
                <Link to={`/deleteusers/${user._id}`}>
                  <MdOutlineDelete className='reservation-icon' />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  );
};

export default UserTable;
