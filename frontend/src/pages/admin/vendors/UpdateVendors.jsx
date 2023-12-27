import React, { useState, useEffect } from 'react';
import Spinner from '../../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Breadcrumb from "../../../components/Breadcrumb.jsx";




const UpdateVendors = () => {
    const [username, setUsername] = useState('');
    const [supplierName, setSupplierName] = useState('');
    const [supplierId, setSupplierId] = useState('');

    const [address, setAddress] = useState('');
    const [contactOfficer, setContactOfficer] = useState('');
    const [contactNumbers, setContactNumbers] = useState(['']);
    const [emails, setEmails] = useState(['']);
    
    const [faxNumber, setFaxNumber] = useState('');
    const [typeofBusiness,  setTypesOFBusiness] = useState('');
    const [classOfAssets, setClassOfAssets] = useState('');
    const [loading, setLoading] = useState(false);
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
        setSupplierId(response.data.supplierId);
        setSupplierName(response.data.supplierName);
        setAddress(response.data.address);
        setContactOfficer(response.data.contactOfficer);
        setContactNumbers(response.data.contactNumbers);
        setEmails(response.data.emails);
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
    supplierId,
    supplierName,
    address,
    contactOfficer,
    contactNumbers,
    emails,
    faxNumber,
    typeofBusiness,
    classOfAssets,
    };

    setLoading(true);

    axios
      .put(`http://localhost:8000/supplyer/update/${id}`, UpdateSupplyer)
      .then(() => {
        alert('Supplyer Updated');
        // Reset form fields
        setUsername('');
        setSupplierName('');
        setAddress('');
        setContactOfficer('');
        setContactNumbers(['']);
        setEmails(['']);
        
        setFaxNumber('');
        setTypesOFBusiness('');
        setClassOfAssets('');
        setLoading(false);
        enqueueSnackbar('Vendor is updated successfully', { variant: 'success' });
        navigate('/allvendors');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar(`Error updating vendor account: ${error.message}`, { variant: 'error' });
        console.error(error);
      });
      
      


  };
   // React Router Hook for navigation

   const selected = (crumb) => {
    console.log(crumb);
  };



  const handleContactNumberChange = (index, value) => {
    const newContactNumbers = [...contactNumbers];
    newContactNumbers[index] = value;
    setContactNumbers(newContactNumbers);
  };
  
  const handleEmailChange = (index, value) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const navigate = useNavigate();
  

  return (
    <div class="app-container p-8 rounded border border-gray-200">
    <Breadcrumb
     crumbs={[
      { label: "Home", link: "/adminhome" },
      { label: "Suppliers Data List", link: "/allvendors" },
      { label: "Supplier Registatrion", link: "/addvendors" },
    ]}
      selected={(crumb) => console.log(`Selected: ${crumb.label}`)}
    />
    <h1 class="font-medium text-3xl">Update User Registration Details</h1>
    {loading ? <Spinner /> : ''}
             
    
    <form onSubmit={handleUpdateVendors}>
        <div className="mt-8 grid lg:grid-cols-2 gap-4">
        <div>
            <label
              htmlFor="supplierId"
              className="text-sm text-gray-700 block mb-1 font-medium"
            >
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Update your supplier ID"
            />
          </div>
          <div>
            <label
              htmlFor="supplierId"
              className="text-sm text-gray-700 block mb-1 font-medium"
            >
              Supplier ID
            </label>
            <input
              type="text"
              value={supplierId}
              onChange={(e) => setSupplierId(e.target.value)}
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Update your supplier ID"
            />
          </div>
          <div>
            <label
              htmlFor="supplierName"
              className="text-sm text-gray-700 block mb-1 font-medium"
            >
              Supplier Name
            </label>
            <input
              type="text"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Update supplier name"
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="text-sm text-gray-700 block mb-1 font-medium"
            >
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Update your address"
            />
          </div>
          <div>
            <label
              htmlFor="contactOfficer"
              className="text-sm text-gray-700 block mb-1 font-medium"
            >
              Contact Officer
            </label>
            <input
              type="text"
              value={contactOfficer}
              onChange={(e) => setContactOfficer(e.target.value)}
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Upadte your contact officer"
            />
          </div>
          <div>
            <label
              htmlFor="contactNumber"
              className="text-sm text-gray-700 block mb-1 font-medium"
            >
              Contact Numbers
            </label>
            {contactNumbers.map((number, index) => (
              <div key={index} className=" flex mb-2">
                <input
                  type="text"
                  value={number}
                  onChange={(e) =>
                    handleContactNumberChange(index, e.target.value)
                  }
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder={`Update contact number ${index + 1}`}
                />
            
              
              
              </div>
            ))}
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-sm text-gray-700 block mb-1 font-medium"
            >
              Contact Email
            </label>
            {emails.map((email, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(index, e.target.value)}
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder={`Update email address ${index + 1}`}
                />
    
             

              </div>
            ))}
          </div>
          <div>
            <label
              htmlFor="faxNumber"
              className="text-sm text-gray-700 block mb-1 font-medium"
            >
              Fax Number
            </label>
            <input
              type="text"
              value={faxNumber}
              onChange={(e) => setFaxNumber(e.target.value)}
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Update your fax number"
            />
          </div>
          <div>
            <label
              htmlFor="rtypeofBusiness"
              className="text-sm text-gray-700 block mb-1 font-medium"
            >
              Business Type
            </label>
            <select
              value={typeofBusiness}
              onChange={(e) => setTypesOFBusiness(e.target.value)}
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Update your type of business"
            >
              <option value="">Update Type</option>
              {types.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="rclassOfAssets"
              className="text-sm text-gray-700 block mb-1 font-medium"
            >
              Class of Assets Supplies
            </label>
            <select
              type="text"
              value={classOfAssets}
              onChange={(e) => setClassOfAssets(e.target.value)}
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter your class of assets"
            >
              <option value="">Update Type</option>
              {types.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-x-4 mt-8 text-center">
          <button className="button-56" role="button">
            Save
          </button>
        </div>
      </form>
            </div>
         
  );
};

export default UpdateVendors;