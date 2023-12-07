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
import AdminAccSetting from './pages/AdminAccountEdit';
import NavbarMain from './components/NavbarMain';
import AddVendors from './pages/AddVenders';
import PreviewVendors from './pages/PreviewVendors';
import YearPlanner from './pages/YearPlanner';
import Admin from './pages/admin';
import AllVenders from './pages/AllVenders';
import UpdateVendors from './pages/UpdateVendors';
import DeleteVendor from './pages/DeleteVendor';
import HomeVenders from './pages/HomeVenders';
import DepartmentHome from './pages/DepartmentHome';


const App = () => {

 
  const location = useLocation();

  const renderNavbar = () => {
    if (location.pathname === '/admin/:id' || location.pathname === '/loginpage' ||location.pathname === '/department')
    {
        return null;
    
    }
  
    return <NavbarMain  sAuthenticated={isAuthenticated} loggedInUser={loggedInUser} handleSignOut={handleSignOut} handleSignIn={handleSignIn}/>;
  }
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
        <Route path="/previewuser/:id" element={<PreviewUser />} />
        <Route path="/deleteusers/:id" element={<DeleteUsers />} />
        <Route path="/updateusers/:id" element={<UpdateUsers />} />
        <Route path="/changePassword/:id" element={<ChangePassword />} />
        {/* <Route path="/adminhome/:id" element={<AdminHome />} /> */}
        <Route path="/adminaccountsetting" element={<AdminAccSetting />} />
        <Route path="/AllVenders" element={<AllVenders />} />
        <Route path="/addvendeors" element={<AddVendors/>} />
        <Route path="/updatevendor/:id" element={<UpdateVendors/>} />
        <Route path="/deletevendor/:id" element={<DeleteVendor/>} />
        <Route path="/previewvendor/:id" element={<PreviewVendors/>} />
        <Route path="/yearplanner" element={<YearPlanner />} />
        <Route path="/homevendors" element={<HomeVenders />} />
        <Route path="/admin/:id" element={<Admin isAuthenticated={isAuthenticated} loggedInUser={loggedInUser} handleSignOut={handleSignOut} handleSignIn={handleSignIn} />} />
        <Route path="/department/:id" element={<DepartmentHome isAuthenticated={isAuthenticated} loggedInUser={loggedInUser} handleSignOut={handleSignOut} handleSignIn={handleSignIn} />} />
      </Routes>
      
    </div>
  );
};
reportWebVitals();
export default App;



