import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import AdminHome from './pages/AdminHome';
import AllUsers from './pages/AllUsers';
import CreateUsers from './pages/CreateUsers';
import DeleteUsers from './pages/DeleteUsers';
import UpdateUsers from './pages/UpdateUsers';
import ChangePassword from './pages/ChangePassword';
import PreviewUser from './pages/PreviewUser';
import  Hm from './pages/Hm';
import reportWebVitals from './reportWebVitals';


const App = () => {
  // const location = useLocation();

  // // const renderSidebar = () => {
  // //   // Add conditions to determine which page should have which sidebar
  // //   if (
  // //     location.pathname.startsWith('/adminhome') ||
  // //     location.pathname.startsWith('/adminaccount') ||
  // //     location.pathname.startsWith('/createusershome')
  // //     // Add more admin page paths as needed
  // //   ) {
  // //     // Render admin sidebar for admin pages
  // //     return <SideBar type="admin" />;
  // //   }
  // //   // You can add more conditions for other types of sidebars if needed
  // };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleSignIn = (user) => {
    // Logic to handle user authentication and set isAuthenticated to true.
    setIsAuthenticated(true);
    setLoggedInUser(user);
  };

  const handleSignOut = () => {
    // Logic to sign the user out and set isAuthenticated to false.
    setIsAuthenticated(false);
    setLoggedInUser(null);
  };

  return (
    <div>
      {/* <TopBar isAuthenticated={isAuthenticated} loggedInUser={loggedInUser} handleSignOut={handleSignOut} handleSignIn={handleSignIn} /> */}
   
      <Routes>
        <Route path="/" element={<Home/>} />
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
        <Route path="/adminhome/:id" element={<AdminHome />} />
        <Route path="/AllUsers" element={<AllUsers />} />
        <Route path="/createusers" element={<CreateUsers />} />
        <Route path="/previewuser/:id" element={<PreviewUser />} />
        <Route path="/deleteusers/:id" element={<DeleteUsers />} />
        <Route path="/updateusers/:id" element={<UpdateUsers />} />
        <Route path="/changePassword/:id" element={<ChangePassword />} />
        <Route path="/hometest" element={<Hm/>} />
        
      </Routes>
    </div>
  );
};
reportWebVitals();
export default App;
