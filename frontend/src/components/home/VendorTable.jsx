import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit  } from 'react-icons/ai';
import { MdOutlineDelete, MdPreview } from 'react-icons/md';
import './UserTable.css';

const VendorTable = ({ vendors }) => {
  
  return (
    <div className="table-container">
    <table className='reservation-table w-full border-separate border-spacing-2 p-3'>
      <thead>
        <tr className='p-3'>
          <th className='reservation-header border border-slate-600 rounded-md text-center'>No</th>
          <th className='reservation-header border border-slate-600 rounded-md text-center'>Supplier ID</th>
          <th className='reservation-header border border-slate-600 rounded-md text-center'>Supplier Name</th>
          <th className='reservation-header border border-slate-600 rounded-md text-center'>Address</th>
          <th className='reservation-header border border-slate-600 rounded-md text-center'>Contact Officer</th>
          <th className='reservation-header border border-slate-600 rounded-md text-center'>Contact Number</th>
          <th className='reservation-header border border-slate-600 rounded-md text-center'>Contact Email</th>
          <th className='reservation-header border border-slate-600 rounded-md text-center'>Fax Number</th>
          <th className='reservation-header border border-slate-600 rounded-md text-center'>Type of Business</th>
          <th className='reservation-header border border-slate-600 rounded-md text-center'>Class of Assets Supplies</th>
          <th className='reservation-header border border-slate-600 rounded-md text-center'>Operations</th>

        </tr>
      </thead>
      <tbody className='p-5'>
        {vendors.map((vendor, index) => (
          <tr key={vendor._id} className='reservation-row'>
            <td className='reservation-data border border-slate-600 rounded-md text-center'>{index + 1}</td>
            <td className='reservation-data border border-slate-600 rounded-md text-center'>{vendor.supplierId}</td>
            <td className='reservation-data border border-slate-600 rounded-md text-center'>{vendor.supplierName}</td>
            <td className='reservation-data border border-slate-600 rounded-md text-center'>{vendor.address}</td>
            <td className='reservation-data border border-slate-600 rounded-md text-center'>{vendor.contactOfficer}</td>
            <td className='reservation-data border border-slate-600 rounded-md text-center'>{vendor.contactNumber}</td>
            <td className='reservation-data border border-slate-600 rounded-md text-center'>{vendor.contactEmaiil}</td>
            <td className='reservation-data border border-slate-600 rounded-md text-center'>{vendor.faxNumber}</td>
            <td className='reservation-data border border-slate-600 rounded-md text-center'>{vendor.typesOfBusiness}</td>
            <td className='reservation-data border border-slate-600 rounded-md text-center'>{vendor.classOfAssets}</td>
            <td className='reservation-data border border-slate-600 rounded-md text-center'>
              <div className='icon-link flex justify-center gap-x-4'>
                <Link to={`/previewvendor/${vendor._id}`}>
                  <MdPreview className="text-2xl text-green-600" />
                </Link>
                <Link to={`/updatevendor/${vendor._id}`}><AiOutlineEdit className="text-2xl text-blue-800 "/>

                        </Link>
                <Link to={`/deletevendor/${vendor._id}`}>
                  <MdOutlineDelete className='text-2xl text-red-500' />
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

export default VendorTable;
