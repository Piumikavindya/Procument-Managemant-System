import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import UserTable from "../../../components/Datatable.jsx";
import Breadcrumb from "../../../components/Breadcrumb.jsx";
import "../../../styles/button.css";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch users data from your API endpoint
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/user/view-users") // Update the API endpoint
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  const selected = (crumb) => {
    console.log(crumb);
  };

  return (
    <div className="p-4">
      <Breadcrumb
        crumbs={[
          { label: "Home", link: "/adminhome" },
          { label: "User Registered List", link: "/allusers" },
        ]}
        selected={(crumb) => console.log(`Selected: ${crumb.label}`)}
      />

      <div className="container mx-auto py-6 px-4 flex items-center justify-between">
        <h1 class="text-3xl py-4 border-b mb-10">Registered User List</h1>

        <div class="flex items-center">
        
         <button 
          onclick="popuphandler(true)"
         class="button">
         <Link to={"/createusers"} class="text-white">
              Add User
            </Link>
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M12 2a1 1 0 011 1v8h8a1 1 0 110 2h-8v8a1 1 0 11-2 0v-8H3a1 1 0 110-2h8V3a1 1 0 011-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        
          
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="reservation-list-container">
          <UserTable users={users} />
        </div>
      )}
    </div>
  );
};

export default AllUsers;
