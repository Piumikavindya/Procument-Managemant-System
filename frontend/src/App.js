import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import reportWebVitals from './reportWebVitals';
import AdminHome  from './pages/admin/AdminHome.jsx';
import DeleteUsers from './pages/admin/users/Delete.jsx';
import PreviewUser from './pages/admin/users/PreviewUser.jsx';
import DeleteVendor from './pages/admin/vendors/DeleteVendors.jsx';
import PreviewVendor from './pages/admin/vendors/PreviewVendors.jsx';
import UpdateVendor from './pages/admin/vendors/UpdateVendors.jsx';
import CommonFooter from './components/CommonFooter.jsx';
import Navbar from './components/Navbar.jsx';
import YearPlanner from './pages/admin/yearPlanner/YearPlanner.jsx';
import ReqForm from './pages/department/ReqForm.jsx';
import UploadGuidance from './pages/admin/guidance/UploadGuidance.jsx';
import DeleteGuidance from './pages/admin/guidance/DeleteGuidance.jsx';
import { useNavigate } from "react-router-dom";
import ViewGuidances from './pages/admin/guidance/ViewGuidances.jsx';
import DepartmentHome from './pages/department/DepartmentHome.jsx';
import PreviewItem from './pages/admin/items/PreviewItem.jsx';
import DeleteItem from './pages/admin/items/DeleteItem.jsx';
import AddItem from './pages/admin/items/AddItem.jsx';
import FormView from './pages/department/FormView.jsx';
import { AddItemCard } from './pages/department/AddItemCard .jsx';
import UploadNotice from './pages/admin/notices/UploadNotice.jsx';
import ViewNotice from './pages/admin/notices/ViewNotice.jsx';
import ManageNotices from './pages/admin/notices/ManageNotices.jsx';
import AddSupplier from './pages/admin/vendors/AddSupplier.jsx';
import AddItems from './pages/admin/items/Additems.jsx';
import AddUsers from './pages/admin/users/AddUsers.jsx';
import UserList from './pages/admin/users/UserList.jsx';
import VendorDetails from './pages/admin/vendors/VendorDetails.jsx';
import ItemDetails from './pages/admin/items/ItemDetails.jsx';
import EditUserDetails from './pages/admin/users/EditUserDetails.jsx';
import DeleteUserDetails from './pages/admin/users/DeleteUserDetails.jsx';
import ViewUserDetails from './pages/admin/users/ViewUserDetails.jsx';
import UpdateSupplier from './pages/admin/vendors/UpdateSupplier.jsx';
import DeleteSupplier from './pages/admin/vendors/DeleteSupplier.jsx';
import UpdateItems from './pages/admin/items/updateItems.jsx';
import ManageGuidance from './pages/admin/guidance/ManageGuidance .jsx';
import DeleteNotice from './pages/admin/notices/DeleteNotice.jsx';
import PreviewUserDetails from './pages/admin/users/PreviewUserDetails.jsx';
import PreviewVendorDetails from './pages/admin/vendors/PreviewVendorDetails.jsx';
import PreviewItemDetails from './pages/admin/items/PreviewItemDetails.jsx';
import ProgressTracker from './pages/department/ProgressTracker.jsx';
import ApprovalList from './pages/approver/ApprovalList.jsx';
import DenyRequest from './pages/approver/DenyRequest.jsx';
import ApprovalForm from './pages/approver/ApprovalForm.jsx';
import ApproverHome from './pages/approver/ApproverHome.jsx';
import DeleteProcItem from './pages/department/DeleteProcItem.jsx';

const App = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const renderNavbar = () => {
    if (location.pathname === "/loginpage") {
      return null;
    }

    return isAuthenticated ? (
      <Navbar isAuthenticated={isAuthenticated} handleSignOut={handleSignOut} />
    ) : (
      <Navbar isAuthenticated={isAuthenticated} handleSignIn={handleSignIn} />
    );
  };

  const renderCommonFooter = () => {
    if (location.pathname === "/loginpage") {
      return null;
    }

    return <CommonFooter />;
  };

  const handleSignIn = (user) => {
    console.log("User details:", user);
    setIsAuthenticated(true);
    console.log("User authenticated state:", isAuthenticated);
    setLoggedInUser(user);
    navigate("/loginpage");
  };

  const handleSignOut = () => {
    console.log("Signing out...");
    setIsAuthenticated(false);
    setLoggedInUser(null);
    console.log("User authenticated state:", isAuthenticated);
    console.log("Logged-in user:", loggedInUser);
    navigate("/");
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
       
       
        <Route path="/deleteusers/:id" element={<DeleteUsers />} />
        <Route path="/previewuser/:id" element={<PreviewUser />} />

        <Route path="/addUsers" element={<AddUsers/>} />
        <Route path="/editUsers/:id" element={<EditUserDetails />} />
        <Route path="/userList" element={<UserList />} />
        <Route path="/deleteUserDetails/:id" element={<DeleteUserDetails />} />
        <Route path="/viewUserDetails/:id" element={<ViewUserDetails />} />

        <Route path="/previewUserDetails/:id" element={<PreviewUserDetails />} />

        <Route path="/allvendors" element={<VendorDetails />} />
        <Route path='/addvendors' element={<AddSupplier/>} />
        <Route path="/deletevendor/:id" element={<DeleteVendor/>} />
        <Route path="/previewvendor/:id" element={<PreviewVendor />} />
        <Route path="/updatevendor/:id" element={<UpdateVendor/>} />

        <Route path="/previewVendorDetails/:id" element={<PreviewVendorDetails />} />

        <Route path="/addSupplier" element={<AddSupplier />} />
        <Route path="/vendorsDetails" element={<VendorDetails />} />
        <Route path="/updateSupplier/:id" element={<UpdateSupplier/>} />
        <Route path="/deleteSupplier/:id" element={<DeleteSupplier/>} />

        <Route path="/yearplanner" element={<YearPlanner />} />

        <Route path="/reqform/:department" element={<ReqForm />} />
        <Route path="/department/:departmentId/:userId" 
  element={<DepartmentHome isAuthenticated={isAuthenticated} loggedInUser={loggedInUser} handleSignOut={handleSignOut} />} />
        <Route path="/ProgressTrack/" element={<ProgressTracker />} />
        <Route path="/DeleteItem/:requestId/:itemId" element={<DeleteProcItem />} />

        <Route path="/ManageGuidance" element={<ManageGuidance />} />
        <Route path="/UploadGuidance" element={<UploadGuidance />} />
        <Route path="/DeleteGuidance/:id" element={<DeleteGuidance />} />
        <Route path="/ViewGuidances" element={<ViewGuidances />} />

        <Route path="/ManageNotice" element={<ManageNotices />} />
        <Route path="/UploadNotice" element={<UploadNotice />} />
        <Route path="/DeleteNotice/:id" element={<DeleteNotice/>} />
        <Route path="/ViewNotices" element={<ViewNotice/>} />
        
        <Route path="/AllItem" element={<ItemDetails/>} />
        <Route path="/PreviewItem/:id" element={<PreviewItem />} />
        <Route path="/DeleteItem/:id" element={<DeleteItem />} />
        <Route path="/AddItem" element={<AddItem />} />
        <Route path="/reqform" element={<ReqForm />} />
        <Route path="/additem/:requestId" element={<AddItemCard/>}/>
       
        <Route path="/itemDetails" element={<ItemDetails/>} />
          <Route path="/AddItems" element={<AddItems/>} />
          <Route path="/updateItems" element={<UpdateItems/>} />
          <Route path="/formview/:requestId" element={<FormView />} />
          <Route path="/additem/:requestId" element={<AddItemCard/>}/>

          <Route path="/itemDetails" element={<ItemDetails/>} />
          <Route path="/AddItems" element={<AddItems/>} />
          <Route path="/updateItems" element={<UpdateItems/>} />
          <Route path="/previewItemDetails/:id" element={<PreviewItemDetails />} />

          <Route path="/approver/:id" element={<ApproverHome/>}/>
          <Route path="/ViewForApproval" element={<ApprovalList/>} />
          <Route path="/DenyApproval/:requestId" element={<DenyRequest/>} />
          <Route path="/ApprovalForm" element={<ApprovalForm/>} />
        
      </Routes>

      {renderCommonFooter()}
    </div>
  );
};
reportWebVitals();
export default App;
