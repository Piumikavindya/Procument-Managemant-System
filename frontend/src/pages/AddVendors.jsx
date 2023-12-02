import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import '../styles/CreateUsers.css';

const AddVendors = () => {
  const [supplierId, setSupplierID] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [address, setAddress] = useState('');
  const [contactOfficer, setContactOfficer] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [contactEmail, setEmail] = useState('');
  const [faxNumber, setFaxNumber] = useState('');
  const [typesOfBusiness, setTypesOFBusiness] = useState('');
  const [classOfAssets, setClassOfAssets] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const types= ['Sole Importer', 'Sole Distributor/Stockiest','Local Agent','Contractors'];
 

  function handleSaveAddVendors(e) {
    e.preventDefault();

    const newVendor = {
    supplierId,
    supplierName,
    address,
    contactOfficer,
    contactNumber,
    contactEmail,
    faxNumber,
    typesOfBusiness,
    classOfAssets,
    };

    setLoading(true);

    axios.post('http://localhost:8000/user/create', newVendor) // changed
      .then(() => {
        setMessage("Vendor added successfully");
        setLoading(false);
        // Reset form fields
        setSupplierID('');
        setSupplierName('');
        setAddress('');
        setContactOfficer('');
        setContactNumber('');
        setEmail('');
        setFaxNumber('');
        setTypesOFBusiness('');
        setClassOfAssets('');
      })
      .catch((error) => {
        console.error('Error:', error);
        setMessage("Error adding user");
        setLoading(false);
      });

    console.log(newVendor);
  };

  return (
    <div className="App">
      <section id="content">
        <main>
          <div className='p-4'>
            <BackButton destination='/AllVendors' />
            <h1
              className='text-3xl my-4'
              style={{
                color: 'blue',
                fontWeight: 'bold',
                fontSize: '20px',
                textAlign: 'center',
              }}
            >
             Add Vendor
            </h1>
            {loading ? <Spinner /> : ''}
            <div className='card'>
            <form onSubmit={handleSaveAddVendors}>
              <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
            
         <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Supplier ID :</label>
          <input
            type='supplierId'
            value={supplierId}
            onChange={(e) => setSupplierID(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Supplier Name :</label>
          <input
            type='text'
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Address :</label>
          <input
            type='text'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>


     <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Contact Office :</label>
          <input
            type='text'
            value={contactOfficer}
            onChange={(e) => setContactOfficer(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Contact Number:</label>
          <input
            type='text'
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Contact Email :</label>
          <input
            type='email'
            value={contactEmail}
            onChange={(e) => setEmail(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Fax Number:</label>
          <input
            type='text'
            value={faxNumber}
            onChange={(e) => setFaxNumber(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>

        <div className='my-4'>
         <label className='text-xl mr-4 text-gray-500'>Business Type</label>
          <select
            value={typesOfBusiness}
            onChange={(e) => setTypesOFBusiness(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option value=''>Select Type</option>
            {types.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
     </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Class of Assests supplies:</label>
          <input
            type='text'
            value={classOfAssets}
            onChange={(e) => setFaxNumber(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
                <div className='my-4 flex items-center justify-center'>
                  <button
                    type="submit"
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};

export default AddVendors;
