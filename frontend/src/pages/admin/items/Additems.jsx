import React, { useState, useEffect } from "react";
import axios from "axios";
import Breadcrumb from "../../../components/Breadcrumb";

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

  function handleSaveItem(e) {
    e.preventDefault();

    const newItem = {
      AssetsClass,
      AssetsSubClass,
      itemName,
    };
    setLoading(true);
    axios
      .post("http://localhost:8000/item/create", newItem)

      .then(() => {
        alert("item added");
        setLoading(false);
        setAssetsClass("");
        setAssetsSubClass("");
        setItemName("");
      })
      .catch((error) => {
        console.error("Error:", error);
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
                  className="block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
                >
                  <option value="">Select Assets Class</option>
                  {assets.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
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
                  type="text"
                  name="last-name"
                  id="last-name"
                  value={AssetsSubClass}
                  onChange={(e) => setAssetsSubClass(e.target.value)}
                  autoComplete="family-name"
                  placeholder="Enter the  Assets Sub Class"
                  className="block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  type="text"
                  name="first-name"
                  id="first-name"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  autoComplete="given-name"
                  placeholder="Enter the Item Name"
                  className="block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
