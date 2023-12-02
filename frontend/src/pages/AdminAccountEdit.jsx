import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminAccountEdit = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdateUsers = () => {
    const newUser = {
      email,
      name,
      password,
      username,
    };

    // Uncomment and modify the code below when needed
    // setLoading(true);
    // axios
    //   .put(`http://localhost:8000/user/update/${id}`, newUser)
    //   .then(() => {
    //     alert('User Updated');
    //     // Clear the form
    //     setEmail('');
    //     setName('');
    //     setPassword('');
    //     setUsername('');
    //     setLoading(false);
    //     enqueueSnackbar('User account is updated successfully', { variant: 'success' });
    //     navigate('/AllUsers');
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     enqueueSnackbar('Error updating user account', { variant: 'error' });
    //     console.error(error);
    //   });
  };

  return (
    <div className="App">
      <section id="content">
        <main>
          <div className='p-4'>
            <BackButton destination='/adminhome' />
            <h1
              className='text-3xl my-4'
              style={{
                color: 'blue',
                fontWeight: 'bold',
                fontSize: '20px',
                textAlign: 'center',
              }}
            >
              Update Admin Account
            </h1>
            {loading ? <Spinner /> : ''}
            <div className='card'>
              <form onSubmit={handleUpdateUsers}>
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
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
                    <label className='text-xl mr-4 text-gray-500'>Username :</label>
                    <input
                      type='username'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className='border-2 border-gray-500 px-4 py-2  w-full '
                    />
                  </div>
                  <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Username :</label>
                    <input
                      type='username'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className='border-2 border-gray-500 px-4 py-2  w-full '
                    />
                  </div>

                  <div className='my-4'>
                    <Link to="/changePassword" className="text-blue-500 hover:underline">
                      Click here to change password
                    </Link>
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

export default AdminAccountEdit;
