import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Breadcrumb from "../../components/Breadcrumb";
import ChangePassword from "./ChangePassword";
import EditProfile from "./EditProfile";
import UserProfile from "./UserProfile";
import axios from "axios";
import { useAuth } from "../../context/AuthContext"; // Import your AuthContext

const ProfilePage = () => {
  const [view, setView] = useState("profileDetails"); // State to control which component to show
  const { userId } = useParams();
  const { loggedInUser } = useAuth();
  const bodyStyles = {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  };
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/user/preview-user/${userId}`
        ); // Use id from useParams
        console.log("User Data:", response.data);
        setUser(response.data);
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    getUser();
  }, [id]);

  const handleClose = () => {
    navigate("/allusers");
  };
  return (
    <div style={bodyStyles}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
        rel="stylesheet"
      />
      <div className="ml-12 mr-6">
        <Breadcrumb
          crumbs={[
            { label: "Home", link: `/adminhome/${userId}` },
            { label: "Profile", link: "/Profile" },
          ]}
          selected={(crumb) => console.log(`Selected: ${crumb.label}`)}
          className="margin-top: 40px "
        />
      </div>
      <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
        <aside className="hidden py-24 md:w-1/3 lg:w-1/4 md:block">
          <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
            <h2 className="pl-3 mb-4 text-2xl font-semibold">Settings</h2>
            <a
              href="#"
              className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full"
              onClick={() => setView("profileDetails")} // Set view to profileDetails
            >
              Profile Details
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full"
              onClick={() => setView("editProfile")} // Set view to editProfile
            >
              Edit Profile Details
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full"
              onClick={() => setView("changePassword")} // Set view to changePassword
            >
              Change Password
            </a>
          </div>
        </aside>
        <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
          {view === "profileDetails" && <UserProfile />}
          {view === "editProfile" && <EditProfile />}
          {view === "changePassword" && <ChangePassword />}
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
