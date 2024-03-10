import React, { useState, useEffect } from 'react';
import Spinner from '../../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Breadcrumb from "../../../components/Breadcrumb.jsx";
import UserTypeNavbar from '../../../components/UserTypeNavbar.jsx';
import "../../../styles/button2.css";
  
const UpdateUsers = () => {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
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
      .get(`http://localhost:8000/user/preview-user/${id}`)
      .then((response) => {
        const userData = response.data;
  
        console.log('Fetched user data:', userData);
        setRole(userData.role);
        setEmail(userData.email);
        setFirstName(userData.firstname);
        setLastName(userData.lastname);
        setPassword(userData.password);
        setUsername(userData.username);
        setDepartment(userData.department);
        setEmpNo(userData.employeeNumber);
  
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred. Please check the console.', { variant: 'error' });
        console.error(error);
      });
  }, [id]);

  // Handle updating user data
  function handleUpdateUsers (e) {
    e.preventDefault();
    const newUser = {
      role,
      email,
      firstname,
      lastname,
      password,
      username,
      department,
      employeeNumber,
    };

    setLoading(true);
    axios
      .put(`http://localhost:8000/user/update/${id}`, newUser)
      .then(() => {
        alert('User Updated');
        // Clear the form
        setRole('');
        setEmail('');
        setLastName('');
        setFirstName('');
        setPassword('');
        setUsername('');
        setDepartment('');
        setEmpNo('');
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
  const selected = (crumb) => {
    console.log(crumb);
  };

  return (
    <div class="app-container p-8 rounded border border-gray-200">
       <UserTypeNavbar userType="admin" />
      <Breadcrumb
        crumbs={[
          { label: "Home", link: "/adminhome" },
          { label: "User Registered List", link: "/allusers" },
          { label: "Update User Details", link: "/updateusers" },
        ]}
        selected={(crumb) => console.log(`Selected: ${crumb.label}`)}
      />
      <h1 class="font-medium text-3xl">Update User Registration Details</h1>
      {loading ? <Spinner /> : ''}
               
      <form onSubmit={handleUpdateUsers}>
    
        <div class="mt-8 grid lg:grid-cols-2 gap-4">
        <div>
            <label for="role" class="text-sm text-gray-700 block mb-1 font-medium">Role</label>
            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" 
         
       
              >
                <option value=''>Update your role</option>
                {roles.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
          </div>
          <div>
            <label for="department" class="text-sm text-gray-700 block mb-1 font-medium">Department</label>
            <select
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                          class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                        >
                          <option value=''>Select your department</option>
                          {departments.map((type, index) => (
                            <option key={index} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                        </div>
          <div>
            <label for="firstname" class="text-sm text-gray-700 block mb-1 font-medium">First Name</label>
            <input
                type='text'
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="Upadate your first name" 
                />
          </div>
          <div>
            <label for="Lastname" class="text-sm text-gray-700 block mb-1 font-medium">Last Name</label>
            <input
                type='text'
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="Update your last name" 
                />
          </div>
          
          
          
    
          <div>
            <label for="email" class="text-sm text-gray-700 block mb-1 font-medium">Email Adress</label>
            <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="Update your email" 
                />     
                 </div>
    
       
    
          <div>
            <label for="employeenumber" class="text-sm text-gray-700 block mb-1 font-medium">Employee Number</label>
            <input
                type='text'
                value={employeeNumber}
                onChange={(e) => setEmpNo(e.target.value)}
                class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="Update your employee number"  />    
            </div>
            <div>
            <label for="username" class="text-sm text-gray-700 block mb-1 font-medium">Username</label>
            <input
                type='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="Upadate your username"  />    
            </div>
    
            <div>
            <label for="password" class="text-sm text-gray-700 block mb-1 font-medium">Password</label>
            <input
             
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="Update your password"  />    
            </div>
        </div>
        <div class="space-x-4 mt-8 text-center">         
       
       <button className="button-71 " role="button">Save</button>
     </div>
      </form>
    </div>  );
};

export default UpdateUsers;