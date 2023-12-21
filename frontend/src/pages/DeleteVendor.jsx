import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import BackButton from '../components/BackButton';
//import '../styles/DeleteUsers.css';

const DeleteVendor = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteVendor = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:8000/supplyer/delete/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Supplyer deleted', { variant: 'success' });
        navigate('/AllVenders');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error deleting suppler', { variant: 'error' });
        console.log(error);
      });
  };

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
              Delete Vendor
            </h1>
            <div className='card'>
              <div>
                <h3 className='text-2xl'>Are you sure you want to delete this vendor?</h3>
                <div className="remember-me">
                  <input type="checkbox" onChange={() => handleDeleteVendor()} />
                  <label className='label'>Confirm Deletion</label>
                </div>

                <div className='flex items-center justify-center my-4'>
                  <button
                    className='p-2 bg-red-600 text-white w-40 rounded-full'
                    onClick={handleDeleteVendor}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};

export default DeleteVendor;