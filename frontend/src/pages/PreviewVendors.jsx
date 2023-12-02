// ... (other imports)

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import '../styles/PreviewUser.css';

export default function PreviewVendor() {
    // ... (existing code)
    const [vendor, setVendor] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    useEffect(() => {
        const getVendor = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/user/preview-user/${id}`);
                console.log("User Data:", response.data);
                setVendor(response.data);
            } catch (error) {
                console.log("Error fetching user:", error);
            }
        };
    
        getVendor();
    }, [id]);
  
    return (
      <div className="App">
        <section id="content">
          <main>
            <div className='p-4'>
              <BackButton destination='/AllVendor' />
              <h1
                className='text-3xl my-4'
                style={{
                  color: 'blue',
                  fontWeight: 'bold',
                  fontSize: '20px',
                  textAlign: 'center',
                }}
              >
                View Data
              </h1>
              {loading ? (
                <Spinner />
              ) : (
                <div className='card'>
                  <form onSubmit={PreviewVendor}>
                    <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
                      <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Supplier ID:</span>
                        <span style={{ textAlign: 'left' }}>{vendor.supplierId}</span>
                      </div>
                      <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Supplier Name:</span>
                        <span style={{ textAlign: 'left' }}>{vendor.supplierName}</span>
                      </div>
                      <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Address</span>
                        <span style={{ textAlign: 'left' }}>{vendor.address}</span>
                      </div>
                      <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Contact Officer</span>
                        <span style={{ textAlign: 'left' }}>{vendor.contactOfficer}</span>
                      </div>
                      <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Contact Number</span>
                        <span style={{ textAlign: 'left' }}>{vendor.contactNumber}</span>
                      </div>
                      <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Contact Email</span>
                        <span style={{ textAlign: 'left' }}>{vendor.contactEmail}</span>
                      </div>
                      <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Fax Number</span>
                        <span style={{ textAlign: 'left' }}>{vendor.faxNumber}</span>
                      </div>
                      <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Types Of Business</span>
                        <span style={{ textAlign: 'left' }}>{vendor.typesOfBusiness}</span>
                      </div>
                      <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Class of Assets Supplies</span>
                        <span style={{ textAlign: 'left' }}>{vendor.classOfAssets}</span>
                      </div>
                      <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Create Time:</span>
                        <span style={{ textAlign: 'left' }}>{new Date(vendor.createdAt).toString()}</span>
                      </div>
                      
                      
                      <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Last Update Time:</span>
                        <span style={{ textAlign: 'left' }}>{new Date(vendor.updatedAt).toString()}</span>
                      </div>
                    </div>
  
                    <div className='my-4 flex items-center justify-center'>
                      <button type="submit">Save</button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </main>
        </section>
      </div>
    );
  }
  