import React, { useState, useEffect  } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import '../styles/CreateUsers.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';


const UpdateVendors = () => {
    const [username, setUsername] = useState('');
    const [supplierName, setSupplierName] = useState('');
    const [address, setAddress] = useState('');
    const [contactOfficer, setContactOfficer] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [faxNumber, setFaxNumber] = useState('');
    const [typeofBusiness,  setTypesOFBusiness] = useState('');
    const [classOfAssets, setClassOfAssets] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const types= ['SoleImporter','SoleDistributor','LocalAgent','contractors'];
 
  // React Router Hook to get the parameter from the URL
  const { id } = useParams();

  // Snackbar Hook for displaying notifications
  const { enqueueSnackbar } = useSnackbar();

  // Fetch user data from the API based on the ID
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8000/supplyer/${id}`)
      .then((response) => {
        setUsername(response.data.username);
        setSupplierName(response.data.supplierName);
        setAddress(response.data.address);
        setContactOfficer(response.data.contactOfficer);
        setContactNumber(response.data.contactNumber);
        setEmail(response.data.email);
        setFaxNumber(response.data.faxNumber);
        setTypesOFBusiness(response.data.typeofBusiness);
        setClassOfAssets(response.data.classOfAssets);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred. Please check the console.', { variant: 'error' });
        console.error(error);
      });
  }, [id]);

  const handleUpdateVendors = () => {
 
    const UpdateSupplyer = {
    username,
    supplierName,
    address,
    contactOfficer,
    contactNumber,
    email,
    faxNumber,
    typeofBusiness,
    classOfAssets,
    };

    setLoading(true);

    axios
      .put(`http://localhost:8000/supplyer/update/${id}`, UpdateSupplyer)
      .then(() => {
        alert('User Updated');
        // Reset form fields
        setUsername('');
        setSupplierName('');
        setAddress('');
        setContactOfficer('');
        setContactNumber('');
        setEmail('');
        setFaxNumber('');
        setTypesOFBusiness('');
        setClassOfAssets('');
        setLoading(false);
        enqueueSnackbar('Vendor is updated successfully', { variant: 'success' });
        navigate('/AllVendors');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error updating user account', { variant: 'error' });
        console.error(error);
      });


  };
   // React Router Hook for navigation
   const navigate = useNavigate();

  return (
    <div className="App">
      <section id="content">
        <main>
          <div className='p-4'>
            <BackButton destination='/AllVenders' />
            <h1
              className='text-3xl my-4'
              style={{
                color: 'blue',
                fontWeight: 'bold',
                fontSize: '20px',
                textAlign: 'center',
              }}
            >
            Update Vendor
            </h1>
            {loading ? <Spinner /> : ''}
            <div className='card'>
            <form onSubmit={handleUpdateVendors}>
              <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
            
         <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Supplier ID :</label>
          <input
            type='supplierId'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            value={email}
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
            value={typeofBusiness}
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
            onChange={(e) => setClassOfAssets(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
                <div className='my-4 flex items-center justify-center'>
                  <button
                    type="submit"
                  >
                    Save
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

export default UpdateVendors;