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
import Navbar from './components/NavBar';
import { useNavigate } from "react-router-dom";
import Form from './pages/Form';
import NavbarMain from './components/NavBarMain';
import { UserNavBar } from './components/UserNavBar.jsx';
import  DeleteManageNotices  from './pages/admin/notices/DeleteManageNotices.jsx';
import  ManageNotices  from './pages/admin/notices/ManageNotices.jsx';
import  UploadNotices from './pages/admin/notices/UploadNotices.jsx';
import  ManageGuidance  from './pages/admin/guidance/ManageGuidance.jsx';
import  DeleteGuidance  from './pages/admin/guidance/DeleteGuidance.jsx';

const App = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const renderNavbar = () => {
    if (location.pathname === '/admin/:id' || location.pathname === '/loginpage' ||location.pathname === '/form')
    {
        return null;
    
    }
  
    return isAuthenticated ? (
      <Navbar handleSignOut={handleSignOut} />
    ) : (
      <NavbarMain isAuthenticated={isAuthenticated} loggedInUser={loggedInUser} handleSignOut={handleSignOut} handleSignIn={handleSignIn} />
    );
  };
  

  const renderCommonFooter = () => {
    if (location.pathname === '/loginpage'  || location.pathname === '/form')
    {
        return null;
    
    }
  
    return <CommonFooter />;
  }
  

  const handleSignIn = (user) => {
    setIsAuthenticated(true);
    setLoggedInUser(user);
    navigate("/");
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setLoggedInUser(null);
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
        <Route path="/form" element={<Form/>} />

        <Route path="/allvendors" element={<AllVendors />} />
        <Route path='/addvendors' element={<AddVendors/>} />
        <Route path="/deletevendor/:id" element={<DeleteVendor/>} />
        <Route path="/previewvendor/:id" element={<PreviewVendor />} />
        <Route path="/updatevendor/:id" element={<UpdateVendor/>} />
        <Route path ="/managenotices" element={<ManageNotices/>}/>
        <Route path ="/deletenotices" element={<DeleteManageNotices/>}/>
        <Route path ="/uploadnotices" element={<UploadNotices/>}/>
        <Route path ="/manageguidance" element={<ManageGuidance/>}/>
        <Route path ="/deleteguidance" element={<DeleteGuidance/>}/>
      </Routes>
  
  {renderCommonFooter ()}
    </div>
  );
};
reportWebVitals();
export default App;

