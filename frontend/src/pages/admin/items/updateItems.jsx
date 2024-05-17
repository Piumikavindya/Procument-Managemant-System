import React, { useState, useEffect } from "react";
import Spinner from "../../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import Breadcrumb from "../../../components/Breadcrumb.jsx";
import UserTypeNavbar from "../../../components/UserTypeNavbar.jsx";
import "../../../styles/button2.css";

export default function UpdateItems() {
  const [AssetsClass, setAssetsClass] = useState("");
  const [AssetsSubClass, setAssetsSubClass] = useState("");
  const [itemName, setItemName] = useState("");
  const [loading, setLoading] = useState(false);
  const AssetsClasses = [
    "Current Assets",
    "Inventory ",
    "Supplier Assets",
    "Contractual Assets",
  ];

  // React Router Hook to get the parameter from the URL
  const { id } = useParams();

  // Snackbar Hook for displaying notifications
  const { enqueueSnackbar } = useSnackbar();

  // Fetch user data from the API based on the ID
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8000/item/preview-item/${id}`)
      .then((response) => {
        const itemData = response.data;
      
        console.log('Fetched user data:', itemData);
        setAssetsClass(itemData.AssetsClass);
        setAssetsSubClass(itemData.AssetsSubClass);
        setItemName(itemData.itemName);

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("An error occurred. Please check the console.", {
          variant: "error",
        });
        console.error(error);
      });
  }, [id]);

  // Handle updating user data
  function handleUpdateItems(e) {
    e.preventDefault();
    const newItem = {
      AssetsClass,
      AssetsSubClass,
      itemName,
    };

    setLoading(true);
    axios
      .put(`http://localhost:8000/item/update/${id}`, newItem)
      .then(() => {
        alert("Item Updated");
        // Clear the form
        setAssetsClass("");
        setAssetsSubClass("");
        setItemName("");

        setLoading(false);
        enqueueSnackbar("Item details are updated successfully", {
          variant: "success",
        });
        navigate("/AllItem");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error updating item details", { variant: "error" });
        console.error(error);
      });
  }

  // React Router Hook for navigation
  const navigate = useNavigate();
  const selected = (crumb) => {
    console.log(crumb);
  };

  return (
    <form onSubmit={handleUpdateItems}>
      <div className="space-y-12 ml-40 mr-40 mt-40">
        <Breadcrumb
          crumbs={[
            { label: "Home", link: "/adminhome/:id" },
            { label: "Items Details", link: "/AllItem" },

            { label: "Add Item Details", link: "/additem" },
          ]}
          selected={(crumb) => console.log(`Selected: ${crumb.label}`)}
        />

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className=" text-gray-900">ADD ITEM DETAILS.</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900 "
              >
                <h6>Assets Class</h6>
              </label>
              <div className="mt-2">
              <select
                value={AssetsClass}
                onChange={(e) => setAssetsClass(e.target.value)}
                class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" 
         
       
              >
               
                
              </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                <h6>Assets Sub Class</h6>
              </label>
              <div className="mt-2">
              <input
                type='text'
                value={AssetsClass}
                onChange={(e) => setAssetsSubClass(e.target.value)}
                class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="Update the AssetSubClass name" 
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900 "
              >
                <h6>Item Name</h6>
              </label>
              <div className="mt-2">
              <input
                type='text'
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="Update the Item name." 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6 mr-40 mb-10">
        <button
          type="button"
          className="rounded-md h-12 w-20 bg-pink-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-blue-600 h-12 w-20 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
