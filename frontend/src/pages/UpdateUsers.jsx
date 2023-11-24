import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const UpdateUsers = () => {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  // React Router Hook to get the parameter from the URL
  const { id } = useParams();

  // Snackbar Hook for displaying notifications
  const { enqueueSnackbar } = useSnackbar();

  // Fetch user data from the API based on the ID
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8000/user/${id}`)
      .then((response) => {
        setRole(response.data.role);
        setEmail(response.data.email);
        setName(response.data.name);
        setPassword(response.data.password);
        setUsername(response.data.username);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred. Please check the console.', { variant: 'error' });
        console.error(error);
      });
  }, [id]);

  // Handle updating user data
  const handleUpdateUsers = () => {
    const newUser = {
      role,
      email,
      name,
      password,
      username,
    };

    setLoading(true);
    axios
      .put(`http://localhost:8000/user/update/${id}`, newUser)
      .then(() => {
        alert('User Updated');
        // Clear the form
        setRole();
        setEmail();
        setName();
        setPassword();
        setUsername();
        setLoading(false);
        enqueueSnackbar('User account is updated successfully', { variant: 'success' });
        navigate('/AllUsers');
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
    <div className='p-4'>
      <BackButton destination={'/AllUsers'}/>
      <h1 className='text-3xl my-4' style={{ color: 'red', fontWeight: 'bold', fontStyle: 'italic', fontSize: '32px', textAlign: 'center' }}>
        Update Your Account
      </h1>

      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Role</label>
          <input
            type='text'
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Email</label>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Username</label>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4 flex items-center justify-center'>
          <button
            className='p-2 bg-pink-500 text-white rounded-lg hover:bg-pink-700'
            style={{ width: '100px' }}
            onClick={handleUpdateUsers}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUsers;
