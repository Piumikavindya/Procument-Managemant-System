import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
          { label: "Home", link: "/adminhome/:id" },
          { label: "User Registered List", link: "/allusers" },
        ]}
        selected={(crumb) => console.log(`Selected: ${crumb.label}`)}
      />

      <div className="container mx-auto py-6 px-4 flex items-center justify-between">
        <h1 class="text-3xl py-4 border-b mb-10">Registered User List</h1>

        <div class="flex items-center">
          <button onclick="popuphandler(true)" class="button">
            <Link to={"/createusers"} class="text-white">
              Add User
            </Link>
          </button>
        </div>
      </div>

      <div className="reservation-list-container">
        <UserTable users={users} />
      </div>
    </div>
  );
};

export default AllUsers;