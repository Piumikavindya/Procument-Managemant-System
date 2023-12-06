
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import '../styles/PreviewUser.css';

export default function PreviewVendor() {
    // ... (existing code)
    const [supplyer, setSupplyer] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    useEffect(() => {
        const getSupplyer = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/supplyer/preview-supplyer/${id}`);
                console.log("Supllyer Data:", response.data);
                setSupplyer(response.data);
            } catch (error) {
                console.log("Error fetching supplyer:", error);
            }
        };
    
        getSupplyer();
    }, [id]);
  
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
                View Data
              </h1>
              {loading ? (
                <Spinner />
              ) : (
                <div className='card'>
                  <form onSubmit={PreviewVendor}>
                    <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
                      <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Supplier ID :</span>
                        <span style={{ textAlign: 'left'}}>{supplyer.username}</span>
                      </div>
                      <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Supplier Name:</span>
                        <span style={{ textAlign: 'left' }}>{supplyer.supplierName}</span>
                      </div>
                      <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Address: </span>
                        <span style={{ textAlign: 'left' }}>{supplyer.address}</span>
                      </div>
                      <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Contact Officer: </span>
                        <span style={{ textAlign: 'left' }}>{supplyer.contactOfficer}</span>
                      </div>
                      <div className='my-4'>
                        <span className='text-xl mr-4 text-black'>Contact Number: </span>
                        <span style={{ textAlign: 'left' }}>{supplyer.contactNumber}</span>
                      </div>
                      <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Contact Email: </span>
                        <span style={{ textAlign: 'left' }}>{supplyer.email}</span>
                      </div>
                      <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Fax Number: </span>
                        <span style={{ textAlign: 'left' }}>{supplyer.faxNumber}</span>
                      </div>
                      <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500 tex'>Types Of Business: </span>
                        <span style={{ textAlign: 'left' }}>{supplyer.typeOfBusiness}</span>
                      </div>
                      <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Class of Assets Supplies: </span>
                        <span style={{ textAlign: 'left' }}>{supplyer.classOfAssets}</span>
                      </div>
                      <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Create Time:</span>
                        <span style={{ textAlign: 'left' }}>{new Date(supplyer.createdAt).toString()}</span>
                      </div>
                      
                      
                      <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Last Update Time:</span>
                        <span style={{ textAlign: 'left' }}>{new Date(supplyer.updatedAt).toString()}</span>
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
  