import React from 'react';
import '../styles/CreateUsers.css';
import { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';



  const CreateUsers = () => {
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const roles = ['admin', 'User', 'Department', 'Lorry', 'Jeep'];
  
    function handleSaveCreateUsers(e){ e.preventDefault(); 
      
      const newUser = {
        role,
        email,
        name,
        username,
        password,
      };
      setLoading(true);
      axios.post('http://localhost:8000/user/create', newUser)
      
        .then(() => {
          alert("user added");
          setLoading(false);
          setRole('');
          setEmail('');
          setName('');
          setUsername('');
          setPassword('');
     
        })
        .catch((error) => {
          console.error('Error:', error);
        });
        console.log(newUser);

        
    };
  return (
    <div>
      
       <BackButton destination='/AllUsers'/>

    <div className="admin-account-container">
    
    <div className='header' >
      Create Your New User
    </div>
    {loading ? <Spinner /> : ''}
    <form onSubmit={handleSaveCreateUsers}>
    <div className="input-container">
    <label className='text-xl mr-4 text-gray-500'>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option value=''>Select Role Type</option>
            {roles.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
      </div>
      <div className="input-container">
      <label className='text-xl mr-4 text-gray-500'>Email</label>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
      </div>
      <div className="input-container">
      <label className='text-xl mr-4 text-gray-500'>Name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
      </div>
      <div className="input-container">
      <label className='text-xl mr-4 text-gray-500'> Username</label>
      <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
      </div>
      <div className="input-container">
      <label className='text-xl mr-4 text-gray-500'>Password</label>
      <input
            type='text'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
   
      </div>
      <div className='my-4 flex items-center justify-center'>
          <button type='submit'
            className='p-3 bg-pink-500 text-white rounded-lg hover:bg-pink-700'
            style={{ width: '100px' }}
          
          >
            Save
          </button>
        </div>
        </form>
        </div> 
    </div>
  );
}
export default CreateUsers;
