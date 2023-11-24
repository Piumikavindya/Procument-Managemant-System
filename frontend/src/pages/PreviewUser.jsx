import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton'
import { BsCardChecklist } from 'react-icons/bs';

export default function PreviewUser() {

    const [user, setUser] = useState({});
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
    <div>
    <BackButton destination={'/AllUsers'} />

    <div>
        <div>
            <h2>User Details</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <p>Username: {user.username}</p>
            <p>Password: {user.password}</p>
        </div>
    </div>
</div>
  )
}
