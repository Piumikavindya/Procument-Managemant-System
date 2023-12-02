// Import the Navbar and Sidebar components
import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import AllUsers from './pages/AllUsers';
import CreateUsers from './pages/CreateUsers';
import DeleteUsers from './pages/DeleteUsers';
import UpdateUsers from './pages/UpdateUsers';
import ChangePassword from './pages/ChangePassword';
import PreviewUser from './pages/PreviewUser';
import AdminHome from './pages/AdminHome';
import reportWebVitals from './reportWebVitals';
import NavbarMain from './components/NavbarMain';
import AdminAccSetting from './pages/AdminAccountEdit'


const App = () => {
  const location = useLocation();
  const renderNavbar = () => {
    if (location.pathname === '/adminhome' || location.pathname === '/loginpage' )
    {
        return null;
    
    }
  
    return <NavbarMain />;
   
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleSignIn = (user) => {
    setIsAuthenticated(true);
    setLoggedInUser(user);
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
       
        <Route path="/AllUsers" element={<AllUsers />} />
        <Route path="/createusers" element={<CreateUsers />} />
        <Route path="/previewuser" element={<PreviewUser />} />
        <Route path="/deleteusers" element={<DeleteUsers />} />
        <Route path="/updateuser" element={<UpdateUsers />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/adminaccountsetting" element={<AdminAccSetting />} />
      </Routes>
    </div>
  );
};
reportWebVitals();
export default App;
