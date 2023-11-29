import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import SideBar from './components/SideBar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import AllUsers from './pages/AllUsers';
import CreateUsers from './pages/CreateUsers';
import DeleteUsers from './pages/DeleteUsers';
import UpdateUsers from './pages/UpdateUsers';
import ChangePassword from './pages/ChangePassword';
import PreviewUser from './pages/PreviewUser';
import AdminHomePage from './pages/AdminHomePage';
import reportWebVitals from './reportWebVitals';
import Navbar from './components/Navbar';
import NavbarMain from './components/NavbarMain';
import Footer from './components/footer';

const App = () => {
  const location = useLocation();
  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };

  const renderSidebar = () => {
    if (
      location.pathname.startsWith('/hometest') ||
      location.pathname.startsWith('/adminaccount') ||
      location.pathname.startsWith('/createusershome') 
     
    ) {
      
      return <SideBar isActive={isActive} />;
    }
    return null;
  };

  const renderNavbar = () => {
    if (location.pathname === '/'  ) {
      return <NavbarMain />;
    }
    if(location.pathname === '/loginpage') {
      return null;
    }
    return <Navbar toggleClass={toggleClass} />;

    
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
      {renderSidebar()}
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
        <Route path="/previewuser/:id" element={<PreviewUser />} />
        <Route path="/deleteusers/:id" element={<DeleteUsers />} />
        <Route path="/updateusers/:id" element={<UpdateUsers />} />
        <Route path="/changePassword/:id" element={<ChangePassword />} />
        <Route path="/hometest" element={<AdminHomePage />} />
      </Routes>
     
     
    </div>
    
  );
};

reportWebVitals();
export default App;
