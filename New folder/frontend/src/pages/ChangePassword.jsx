import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import '../styles/ChangePassword.css';

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      // Add validation logic as needed
      if (newPassword !== confirmPassword) {
        console.error('New password and confirm password do not match');
        return;
      }

      // Make a request to your backend to change the password
      const response = await axios.post('http://localhost:8000/reset-password', {
        newPassword,
        userId: 'userId', 
      });

      console.log(response.data.message); // Log the response from the server

      // Add logic to handle success or show a message to the user
    } catch (error) {
      console.error('Error changing password:', error.message);
      // Add logic to handle errors or show an error message to the user
    }
  };

  const handleCancel = () => {
    // Add your logic to cancel the changes
    console.log('Changes cancelled.');
  };

  return (
    <div className="App">
      <section id="content">
        <main>
          <div className='p-4'>
            <BackButton destination='/adminaccountsetting' />
            <h1
              className='text-3xl my-4'
              style={{
                color: 'blue',
                fontWeight: 'bold',
                fontSize: '20px',
                textAlign: 'center',
              }}
            >
              Create User
            </h1>
            {loading ? <Spinner /> : ''}
            <div className='card'>
              <form onSubmit={handleSave}>
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                  <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Old Password:</label>
                    <input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className='border-2 border-gray-500 px-4 py-2  w-full '
                    />
                  </div>

                  <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>New Password :</label>
                    <input
                      type='password'
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className='border-2 border-gray-500 px-4 py-2  w-full '
                    />
                  </div>

                  <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Confirm Password:</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className='border-2 border-gray-500 px-4 py-2  w-full '
                    />
                  </div>

                  <div className='my-4 flex items-center justify-center'>
                    <button type="submit" onClick={handleSave} className="login-btn">
                      Save
                    </button>
                    <button type="submit" onClick={handleCancel} className="login-btn">
                      Cancel
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
}
