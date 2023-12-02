// ... (other imports)

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import '../styles/PreviewUser.css';

export default function PreviewUser() {
    // ... (existing code)
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/user/preview-user/${id}`);
                console.log("User Data:", response.data);
                setUser(response.data);
            } catch (error) {
                console.log("Error fetching user:", error);
            }
        };
    
        getUser();
    }, [id]);
  
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
                View Data
              </h1>
              {loading ? (
                <Spinner />
              ) : (
                <div className='card'>
                  <form onSubmit={PreviewUser}>
                    <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
                      <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Name:</span>
                        <span style={{ textAlign: 'left' }}>{user.name}</span>
                      </div>
                      <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Email:</span>
                        <span style={{ textAlign: 'left' }}>{user.email}</span>
                      </div>
                      <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Role:</span>
                        <span style={{ textAlign: 'left' }}>{user.role}</span>
                      </div>
                      <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Username:</span>
                        <span style={{ textAlign: 'left' }}>{user.username}</span>
                      </div>
                      <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Password:</span>
                        <span style={{ textAlign: 'left' }}>{user.password}</span>
                      </div>
                      <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Create Time:</span>
                        <span style={{ textAlign: 'left' }}>{new Date(user.createdAt).toString()}</span>
                      </div>
                      <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Last Update Time:</span>
                        <span style={{ textAlign: 'left' }}>{new Date(user.updatedAt).toString()}</span>
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
  