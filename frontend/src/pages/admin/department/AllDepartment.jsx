import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DepartmentTable from "../../../components/DepartmentTable.jsx";
import Breadcrumb from "../../../components/Breadcrumb.jsx";
import "../../../styles/button.css";

const AllDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch users data from your API endpoint
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/user/view-users") // Update the API endpoint
      .then((response) => {
        setDepartments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
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
          { label: "All departments", link: "/alldepartments" },
        ]}
        selected={(crumb) => console.log(`Selected: ${crumb.label}`)}
      />

      <div className="container mx-auto py-6 px-4 flex items-center justify-between">
        <h1 class="text-3xl py-4 border-b mb-10">Department Details List</h1>

        <div class="flex items-center">
          <button onclick="popuphandler(true)" class="button">
            <Link to={"/adddepartment"} class="text-white">
              Add Department
            </Link>
          </button>
        </div>
      </div>

      <div className="reservation-list-container">
        <DepartmentTable departments={departments} />
      </div>
    </div>
  );
};

export default AllDepartment;
