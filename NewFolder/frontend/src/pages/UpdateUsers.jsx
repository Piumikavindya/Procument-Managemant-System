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
  const [department, setDepartment] = useState('');
  const [employeeNumber, setEmpNo] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const roles = ['Admin', 'Procurment Officer', 'Finance Officers', 'User Department', 'Approver'];
  const departments = ['DCEE', 'DEIE', 'MENA', 'MME', 'IS', 'NONE'];

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
        setRole('');
        setEmail('');
        setName('');
        setPassword('');
        setUsername('');
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
    <div className="App">
      <section id="content">
        <main>
          <div className='p-4'>
            <BackButton destination='/AllUsers' />
            <h1
              className='text-3xl my-4'
              style={{
                color: 'blue',
                fontWeight: 'bold',
                fontSize: '20px',
                textAlign: 'center',
              }}
            >
              Update User
            </h1>
            {loading ? <Spinner /> : ''}
            <div className='card'>
              <form onSubmit={handleUpdateUsers}>
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                  <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Role:</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className='border-2 border-gray-500 px-4 py-2 w-full'
                    >
                      <option value=''>Select Your Role</option>
                      {roles.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Email :</label>
                    <input
                      type='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='border-2 border-gray-500 px-4 py-2  w-full '
                    />
                  </div>

                  <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Name :</label>
                    <input
                      type='text'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className='border-2 border-gray-500 px-4 py-2  w-full '
                    />
                  </div>

                  <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Department :</label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className='border-2 border-gray-500 px-4 py-2 w-full'
                    >
                      <option value=''>Select Your Department</option>
                      {departments.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Employee Number :</label>
                    <input
                      type='text'
                      value={employeeNumber}
                      onChange={(e) => setEmpNo(e.target.value)}
                      className='border-2 border-gray-500 px-4 py-2  w-full '
                    />
                  </div>

                  <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Username :</label>
                    <input
                      type='username'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className='border-2 border-gray-500 px-4 py-2  w-full '
                    />
                  </div>

                  <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Password :</label>
                    <input
                      type='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className='border-2 border-gray-500 px-4 py-2  w-full '
                    />
                  </div>

                  <div className='my-4 flex items-center justify-center'>
                    <button type="submit">
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

export default UpdateUsers;
