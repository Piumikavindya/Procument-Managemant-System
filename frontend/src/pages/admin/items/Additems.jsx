// Additems

import React, { useState, useEffect } from "react";
import axios from "axios";
import Breadcrumb from "../../../components/Breadcrumb";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const assets = [
  "Current Assets",
  "Inventory",
  "Supplier Assets",
  "Contractual Assets",
 
];

export default function AddItems() {
  const [AssetsClass, setAssetsClass] = useState("");
  const [AssetsSubClass, setAssetsSubClass] = useState("");
  const [itemName, setItemName] = useState("");
  const [loading, setLoading] = useState(false);

   // State variables for tracking required fields
   const [AssetsClassError, setAssetsClassError] = useState(false);
   const [AssetsSubClassError, setAssetsSubClassError] = useState(false);
   const [itemNameError, setItemNameError] = useState(false);

   // State variables for notification
  const [notification, setNotification] = useState({ message: "", type: "" });

  function handleSaveItem(e) {
    e.preventDefault();

    // Validate required fields
    if (
      !AssetsClass ||
      !AssetsSubClass ||
      !itemName 
     
    ) {
      // Set error states for required fields
      setAssetsClassError(!AssetsClass);
      setAssetsSubClassError(!AssetsSubClass);
      setItemNameError(!itemName);
      return; // Exit function if any required field is empty
    }

    const newItem = {
      AssetsClass,
      AssetsSubClass,
      itemName,
    };
    setLoading(true);
    axios
      .post("http://localhost:8000/item/create", newItem)

      .then(() => {
         // Show success toast notification
        toast.success("Item successfully added!");
        setLoading(false);
        setAssetsClass("");
        setAssetsSubClass("");
        setItemName("");
      })
      .catch((error) => {
        console.error("Error:", error);
        setNotification({ message: "Failed to add item.", type: "error" });
        setLoading(false);
      });
    console.log(newItem);
  }
  const selected = (crumb) => {
    console.log(crumb);
  };

  return (
    <form onSubmit={handleSaveItem}>
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
                  id="assets"
                  name="assets"
                  value={assets}
              onChange={(e) => setAssetsClass(e.target.value)}
                  autoComplete="country-name"
                  className={`block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6 ${AssetsClassError ? 'border-red-500' : ''}`}
                >
                  <option value="">Select Assets Class</option>
                  {assets.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {AssetsClassError && (
                  <p className="text-red-500 text-xs mt-1">AssetsClass is required</p>
                )}
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
                  type="text"
                  name="last-name"
                  id="last-name"
                  value={AssetsSubClass}
                  onChange={(e) => setAssetsSubClass(e.target.value)}
                  autoComplete="family-name"
                  placeholder="Enter the  Assets Sub Class"
                  className={`block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  ${AssetsClassError ? 'border-red-500' : ''}`}
                />
                {AssetsSubClassError && (
                  <p className="text-red-500 text-xs mt-1">AssetsSubClass is required</p>
                )}
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
                  type="text"
                  name="first-name"
                  id="first-name"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  autoComplete="given-name"
                  placeholder="Enter the Item Name"
                  className={`block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${AssetsClassError ? 'border-red-500' : ''}`}
                />
                 {itemNameError && (
                  <p className="text-red-500 text-xs mt-1">ItemName is required</p>
                )} 
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
     {/* ToastContainer to display toast notifications */}
     <ToastContainer className="mt-14"/>
    </form>
  );
}
