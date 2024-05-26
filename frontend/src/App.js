import React, { useState, useContext } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import reportWebVitals from "./reportWebVitals";
import AdminHome from "./pages/admin/AdminHome.jsx";
import CommonFooter from "./components/CommonFooter.jsx";
import Navbar from "./components/Navbar.jsx";
import YearPlanner from "./pages/admin/yearPlanner/YearPlanner.jsx";
import ReqForm from "./pages/department/ReqForm.jsx";
import UploadGuidance from "./pages/admin/guidance/UploadGuidance.jsx";
import DeleteGuidance from "./pages/admin/guidance/DeleteGuidance.jsx";
import { useNavigate } from "react-router-dom";
import ViewGuidances from "./pages/admin/guidance/ViewGuidances.jsx";
import DepartmentHome from "./pages/department/DepartmentHome.jsx";
import PreviewItem from "./pages/admin/items/PreviewItem.jsx";
import DeleteItem from "./pages/admin/items/DeleteItem.jsx";
import AddItem from "./pages/admin/items/AddItem.jsx";
import FormView from "./pages/department/FormView.jsx";
import { AddItemCard } from "./pages/department/AddItemCard .jsx";
import UploadNotice from "./pages/admin/notices/UploadNotice.jsx";
import ViewNotice from "./pages/admin/notices/ViewNotice.jsx";
import ManageNotices from "./pages/admin/notices/ManageNotices.jsx";
import AddSupplier from "./pages/admin/vendors/AddSupplier.jsx";
import AddItems from "./pages/admin/items/Additems.jsx";
import AddUsers from "./pages/admin/users/AddUsers.jsx";
import UserList from "./pages/admin/users/UserList.jsx";
import VendorDetails from "./pages/admin/vendors/VendorDetails.jsx";
import ItemDetails from "./pages/admin/items/ItemDetails.jsx";
import EditUserDetails from "./pages/admin/users/EditUserDetails.jsx";
import DeleteUserDetails from "./pages/admin/users/DeleteUserDetails.jsx";
import UpdateSupplier from "./pages/admin/vendors/UpdateSupplier.jsx";
import DeleteSupplier from "./pages/admin/vendors/DeleteSupplier.jsx";
import UpdateItems from "./pages/admin/items/updateItems.jsx";
import ManageGuidance from "./pages/admin/guidance/ManageGuidance .jsx";
import DeleteNotice from "./pages/admin/notices/DeleteNotice.jsx";
import PreviewUserDetails from "./pages/admin/users/PreviewUserDetails.jsx";
import PreviewVendorDetails from "./pages/admin/vendors/PreviewVendorDetails.jsx";
import PreviewItemDetails from "./pages/admin/items/PreviewItemDetails.jsx";
import ProgressTracker from "./pages/department/ProgressTracker.jsx";
import ApprovalList from "./pages/approver/ApprovalList.jsx";
import DenyRequest from "./pages/approver/DenyRequest.jsx";
import EditApproval from "./pages/approver/UpdateApproval.jsx";
import ApproverHome from "./pages/approver/ApproverHome.jsx";
import DeleteProcItem from "./pages/department/DeleteProcItem.jsx";
import SubmitReqForm from "./pages/department/SubmitReqForm.jsx";
import SendApproval from "./pages/approver/SendApproval.jsx";
import RequestList from "./pages/department/RequestList.jsx";
import DownloadRequest from "./pages/department/DownloadRequest.jsx";
import SendRequest from "./pages/department/SendRequest.jsx";
import ProjectCreationForm from "./pages/PO_BU/ProjectCreationForm.jsx";
import PO_BuHome from "./pages/PO_BU/PO_BuHome.jsx";
import { AddReqCard } from './pages/PO_BU/AddItemCard.jsx';
import ApprovedRequestList from "./pages/PO_BU/ApprovedRequestList.jsx";
import {ViewApprovedForm}  from "./pages/PO_BU/ViewApprovedForm.jsx";
import ViewFormRequest from "./pages/department/ViewFormRequest.jsx";
import {ViewFormApproval} from "./pages/approver/ViewFormApproval.jsx";
// import ViewFormApproval from "./pages/approver/ViewFormApproval.jsx";
import EventPlanner from "./pages/admin/eventPlanner/EventPlanner.jsx";
import ContextWrapper from "./context/ContextWrapper.js";
import ViewVendorDetails from "./pages/generalUsers/ViewVenderDetails.jsx";
import ProjectList from "./pages/PO_BU/ProjectList.jsx";
import {ViewShippingPdf} from "./pages/PO_BU/ViewBidDocumnet.jsx"


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
    if (location.pathname === "/loginpage" ) {
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
        <Route path="/viewVendors" element={<ViewVendorDetails/>}/>
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

        <Route
          path="/adminhome/:id"
          element={
            <AdminHome
              isAuthenticated={isAuthenticated}
              loggedInUser={loggedInUser}
              handleSignOut={handleSignOut}
              handleSignIn={handleSignIn}
            />
          }
        />

  
        <Route path="/addUsers" element={<AddUsers />} />
        <Route path="/editUsers/:id" element={<EditUserDetails />} />
        <Route path="/userList" element={<UserList />} />
        <Route path="/deleteUserDetails/:id" element={<DeleteUserDetails />} />
       
        <Route
          path="/previewUserDetails/:id"
          element={<PreviewUserDetails />}
        />

        <Route path="/allvendors" element={<VendorDetails />} />
        <Route
          path="/previewVendorDetails/:id"
          element={<PreviewVendorDetails />}
        />
        <Route path="/addSupplier" element={<AddSupplier />} />
        <Route path="/updateSupplier/:id" element={<UpdateSupplier />} />
        <Route path="/deleteSupplier/:id" element={<DeleteSupplier />} />

        

        <Route path="/reqform" element={<ReqForm />} />
        <Route
          path="/department/:departmentId/:userId"
          element={
            <DepartmentHome
              isAuthenticated={isAuthenticated}
              loggedInUser={loggedInUser}
              handleSignOut={handleSignOut}
            />
          }
        />
        <Route path="/ProgressTrack" element={<ProgressTracker />} />
        <Route
          path="/DeleteItem/:requestId/:itemId"
          element={<DeleteProcItem />}
        />

        <Route path="/ManageGuidance" element={<ManageGuidance />} />
        <Route path="/UploadGuidance" element={<UploadGuidance />} />
        <Route path="/DeleteGuidance/:id" element={<DeleteGuidance />} />
        <Route path="/ViewGuidances" element={<ViewGuidances />} />

        <Route path="/ManageNotice" element={<ManageNotices />} />
        <Route path="/UploadNotice" element={<UploadNotice />} />
        <Route path="/DeleteNotice/:id" element={<DeleteNotice />} />
        <Route path="/ViewNotices" element={<ViewNotice />} />

        <Route path="/AllItem" element={<ItemDetails />} />
        <Route path="/PreviewItem/:id" element={<PreviewItem />} />
        <Route path="/DeleteItem/:id" element={<DeleteItem />} />
        <Route path="/AddItem" element={<AddItem />} />


        <Route path="/reqform" element={<ReqForm />} />
        <Route path="/additem/:requestId" element={<AddItemCard />} />

        <Route path="/AddItems" element={<AddItems />} />
        <Route path="/updateItems/:id" element={<UpdateItems />} />
        <Route path="/formview/:requestId" element={<FormView />} />
        <Route path="/additem/:requestId" element={<AddItemCard />} />

        <Route path="/AddItems" element={<AddItems />} />
        <Route path="/updateItems/:id" element={<UpdateItems />} />
        {/* <Route path="/DeleteItems/:id" element={<DeleteItems />} /> */}
        <Route
          path="/previewItemDetails/:id"
          element={<PreviewItemDetails />}
        />

        <Route path="/approver/:id" element={<ApproverHome />} />
        <Route path="/ViewForApproval" element={<ApprovalList />} />
        <Route path="/DenyApproval/:id" element={<DenyRequest />} />
        <Route path="/ApprovalForm/:id" element={<EditApproval />} />
        <Route
          path="/SubmitApprovalForm/:requestId"
          element={<SubmitReqForm />}
        />
        <Route path="/SendApproval/:requestId" element={<SendApproval />} />
        <Route path="/ViewForRequest" element={<RequestList />} />
        <Route
          path="/DownloadRequest/:requestId"
          element={<DownloadRequest />}
        />
        <Route
          path="/SendRequest/:requestId/:sendTo"
          element={<SendRequest />}
        />
        <Route path="/ProjectCreationForm/" element={<ProjectCreationForm />} />
        <Route path="/ReqSelection/:projectId" element={<AddReqCard/>} />
        <Route path="/ViewPdf/:projectId" element={<ViewShippingPdf />} />

        <Route
          path="/PO_BuHome/:id"
          element={
            <PO_BuHome
              isAuthenticated={isAuthenticated}
              loggedInUser={loggedInUser}
              handleSignOut={handleSignOut}
              handleSignIn={handleSignIn}
            />
          }
        />
        <Route path="/ApprovedRequestList" element={<ApprovedRequestList />} />
        <Route path="/ViewApprovedForm/:requestId" element={<ViewApprovedForm />} />
        <Route path="/ViewFormRequest/:requestId" element={<ViewFormRequest />} />
        <Route path="/ViewForApproval/:requestId" element={<ViewFormApproval />} />
        <Route path="/projectList" element={<ProjectList/>}/>
          
          <Route path="/EventPlanner" element={<ContextWrapper><EventPlanner />  </ContextWrapper>} />
        
         
      </Routes>

      {renderCommonFooter()}
    </div>
  );
};
reportWebVitals();
export default App;