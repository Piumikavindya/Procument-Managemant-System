import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ItemTable from "../../../components/ItemTable .jsx";
import Breadcrumb from "../../../components/Breadcrumb.jsx";
import "../../../styles/button.css";
import UserTypeNavbar from "../../../components/UserTypeNavbar.jsx";

const AllItem = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch users data from your API endpoint
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/item/view-item") // Update the API endpoint
      .then((response) => {
        setItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
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
          { label: "All Items", link: "/AllItem" },
        ]}
        selected={(crumb) => console.log(`Selected: ${crumb.label}`)}
      />

      <div className="container mx-auto py-6 px-4 flex items-center justify-between">
        <h1 class="text-3xl py-4 border-b mb-10">Items Details List</h1>

        <div class="flex items-center">
          <button onclick="popuphandler(true)" class="button">
            <Link to={"/AddItem"} class="text-white">
              Add Item
            </Link>
          </button>
        </div>
      </div>

      <div className="reservation-list-container">
        <ItemTable items={items} />
      </div>
    </div>
  );
};

export default AllItem;
