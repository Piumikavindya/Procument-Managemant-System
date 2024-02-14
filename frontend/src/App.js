import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import reportWebVitals from './reportWebVitals';
import CreateUsers from './pages/admin/users/CreateUsers.jsx';
import UpdateUsers from './pages/admin/users/UpdateUsers.jsx';
import AllUsers from './pages/admin/users/AllUsers.jsx';
import AdminHome  from './pages/admin/AdminHome.jsx';
import DeleteUsers from './pages/admin/users/Delete.jsx';
import PreviewUser from './pages/admin/users/PreviewUser.jsx';
import AllVendors from  './pages/admin/vendors/AllVendors.jsx';
import AddVendors from './pages/admin/vendors/AddVendors.jsx';
import DeleteVendor from './pages/admin/vendors/DeleteVendors.jsx';
import PreviewVendor from './pages/admin/vendors/PreviewVendors.jsx';
import UpdateVendor from './pages/admin/vendors/UpdateVendors.jsx';
import CommonFooter from './components/CommonFooter.jsx';
import Navbar from './components/Navbar.jsx';
import UserTypeNavbar from './components/UserTypeNavbar.jsx';
import YearPlanner from './pages/admin/yearPlanner/YearPlanner.jsx';

import ReqForm from './pages/department/ReqForm.jsx';
import ManageGiidance from './pages/admin/guidance/ManageGiidance .jsx';
import UploadGuidance from './pages/admin/guidance/UploadGuidance.jsx';
import DeleteGuidance from './pages/admin/guidance/DeleteGuidance.jsx';
import { useNavigate } from "react-router-dom";
import ViewGuidances from './pages/admin/guidance/ViewGuidances.jsx';
import DepartmentHome from './pages/department/DepartmentHome.jsx';
import AllItem from './pages/admin/items/AllItem.jsx';
import PreviewItem from './pages/admin/items/PreviewItem.jsx';
import DeleteItem from './pages/admin/items/DeleteItem.jsx';
import AddItem from './pages/admin/items/AddItem.jsx';
import FormView from './pages/department/FormView.jsx';
import { AddItemCard } from './pages/department/AddItemCard .jsx';

import UploadNotice from './pages/admin/notices/UploadNotice.jsx';
import DeleterNotice from './pages/admin/notices/DeleteNotice.jsx';
import ViewNotice from './pages/admin/notices/ViewNotice.jsx';
import ManageNotices from './pages/admin/notices/ManageNotices.jsx';



const App = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);


  const renderNavbar = () => {
    if (location.pathname === '/loginpage') {
      return null;
    }
  
    return isAuthenticated ? (
      <Navbar  isAuthenticated={isAuthenticated}  handleSignOut={handleSignOut} />
    ) : (
      <Navbar isAuthenticated={isAuthenticated}  handleSignIn={handleSignIn}  />
    );
  };

  

  const renderCommonFooter = () => {
    if (location.pathname === '/loginpage')
    {
        return null;
    
    }
  
    return <CommonFooter />;
  }
  

  const handleSignIn = (user) => {
    console.log('User details:', user);
    setIsAuthenticated(true);
    console.log("User authenticated state:", isAuthenticated);
    setLoggedInUser(user);
    navigate('/loginpage');
  };

  const handleSignOut = () => {
    console.log("Signing out...");
  setIsAuthenticated(false);
  setLoggedInUser(null);
  console.log("User authenticated state:", isAuthenticated);
  console.log("Logged-in user:", loggedInUser);
  navigate('/');
  };
  return (
    <div>
  {renderNavbar()}
 
      <Routes>
      <Route path="/" element={<Home />} />
        <Route
          path="/loginpage"
          element={
            isAuthenticated ? (
              <Navigate to="/" />
            ) : (
              <LoginPage setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route path="/adminhome/:id" element={<AdminHome isAuthenticated={isAuthenticated} loggedInUser={loggedInUser} handleSignOut={handleSignOut} handleSignIn={handleSignIn} />} />      
        <Route path="/createusers" element={<CreateUsers />} />
        <Route path="/updateusers/:id" element={<UpdateUsers />} />
        <Route path="/deleteusers/:id" element={<DeleteUsers />} />
        <Route path="/allusers" element={<AllUsers />} />
        <Route path="/previewuser/:id" element={<PreviewUser />} />

        <Route path="/allvendors" element={<AllVendors />} />
        <Route path='/addvendors' element={<AddVendors/>} />
        <Route path="/deletevendor/:id" element={<DeleteVendor/>} />
        <Route path="/previewvendor/:id" element={<PreviewVendor />} />
        <Route path="/updatevendor/:id" element={<UpdateVendor/>} />

        <Route path="/yearplanner" element={<YearPlanner />} />

        <Route path="/reqform" element={<ReqForm />} />
        <Route path="/department/:id" element={<DepartmentHome isAuthenticated={isAuthenticated} loggedInUser={loggedInUser} handleSignOut={handleSignOut} handleSignIn={handleSignIn} />} />

        <Route path="/ManageGuidance" element={<ManageGiidance />} />
        <Route path="/UploadGuidance" element={<UploadGuidance />} />
        <Route path="/DeleteGuidance/:id" element={<DeleteGuidance/>} />
        <Route path="/ViewGuidances" element={<ViewGuidances/>} />

        <Route path="/ManageNotice" element={<ManageNotices />} />
        <Route path="/UploadNotice" element={<UploadNotice />} />
        <Route path="/DeleteGuidance/:id" element={<DeleterNotice/>} />
        <Route path="/ViewGuidances" element={<ViewNotice/>} />
        
        <Route path="/AllItem" element={<AllItem/>} />
        <Route path="/PreviewItem/:id" element={<PreviewItem />} />
        <Route path="/DeleteItem/:id" element={<DeleteItem/>} />
        <Route path="/AddItem" element={<AddItem/>} />
          <Route path="/formview/:requestId" element={<FormView />} />
          <Route path="/additem/:requestId" element={<AddItemCard/>}/>
        
      </Routes>
  
  {renderCommonFooter ()}
    </div>
  );
};
reportWebVitals();
export default App;

