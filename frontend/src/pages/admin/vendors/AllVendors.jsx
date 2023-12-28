import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import VendorTable from "../../../components/VendorsTable.jsx";
import Breadcrumb from "../../../components/Breadcrumb.jsx";
import "../../../styles/button.css";
import UserTypeNavbar from "../../../components/UserTypeNavbar.jsx";

const AllVenders = () => {
  const [supplyers, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch users data from your API endpoint
  useEffect(() => {
    console.log('Supplyers:', supplyers);
    setLoading(true);
    axios
      .get("http://localhost:8000/supplyer/view-supplyers") // Update the API endpoint
      .then((response) => {
        setVendors(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching supplyer:", error);
        setLoading(false);
      });
  }, []);

  const selected = (crumb) => {
    console.log(crumb);
  };

  return (
    <div className="p-4">
        <UserTypeNavbar userType="admin" />
      <Breadcrumb
        crumbs={[
          { label: "Home", link: "/adminhome/:id" },
          { label: "Suppliers Data List", link: "/allvendors" },
        ]}
        selected={(crumb) => console.log(`Selected: ${crumb.label}`)}
      />

      <div className="container mx-auto py-6 px-4 flex items-center justify-between">
        <h1 class="text-3xl py-4 border-b mb-10">Suppliers Data List</h1>

        <div class="flex items-center">
          <button onclick="popuphandler(true)" class="button">
            <Link to={"/addvendors"} class="text-white">
              Add Vendor
            </Link>
          </button>
        </div>
      </div>

      <div className="reservation-list-container">
        <VendorTable supplyers={supplyers} />
      </div>
    </div>
  );
};

export default AllVenders;