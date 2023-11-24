import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import BackButton from '../components/BackButton';

const DeleteUsers = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteUser = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:8000/user/delete/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('User deleted', { variant: 'success' });
        navigate('/AllUsers');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error deleting user', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
        <BackButton destination={'/AllUsers'}/>
      <h1
        className='text-3xl my-4'
        style={{
          color: 'red',
          fontWeight: 'bold',
          fontStyle: 'italic',
          fontSize: '32px',
          textAlign: 'center',
        }}
      >
        Delete Your Reservation
      </h1>

      <div className='flex flex-col items-left border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this account?</h3>
        <div className='flex items-center my-4'>
          <input
            type='checkbox'
            onChange={() => handleDeleteUser()}
            className='mr-2'
          />
          <label>Confirm deletion</label>
        </div>
        <div className='flex items-center justify-center my-4'>
          <button
            className='p-2 bg-red-600 text-white w-40 rounded-full'
            onClick={handleDeleteUser}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUsers;
