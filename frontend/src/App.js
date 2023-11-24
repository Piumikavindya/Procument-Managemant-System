import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import AdminHome from './pages/AdminHome';
import AdminAccount from './pages/AdminAccount';
import AllUsers from './pages/AllUsers';
import CreateUsers from './pages/CreateUsers';
import DeleteUsers from './pages/DeleteUsers';
import UpdateUsers from './pages/UpdateUsers';
import ChangePassword from './pages/ChangePassword';

const App = () => {
  const location = useLocation();

  const renderSidebar = () => {
    // Add conditions to determine which page should have which sidebar
    if (
      location.pathname.startsWith('/adminhome') ||
      location.pathname.startsWith('/adminaccount')||
      location.pathname.startsWith('/createusershome')
      // Add more admin page paths as needed
    ) {
      // Render admin sidebar for admin pages
      return <SideBar type="admin" />;
    } 
    // You can add more conditions for other types of sidebars if needed
  };

  return (
    <div>
      <TopBar />
      {renderSidebar()}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/adminaccount" element={<AdminAccount />} />
        <Route path="/AllUsers" element={<AllUsers />} />
        <Route path="/createusers" element={<CreateUsers />} />
        { /*<Route path="/user/create" element={<CreateUsers/>} /> 
       <Route path="/users/delete/:id" element={<DeleteUsers/>} />     */}

       <Route path="/deleteusers" element={<DeleteUsers />} />
       <Route path="/updateusers" element={<UpdateUsers />} />
       <Route path="/changePassword" element={<ChangePassword />} />
      </Routes>
    </div>
  );
};

export default App;
