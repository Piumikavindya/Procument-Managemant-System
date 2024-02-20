import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../styles/Scroller.css";
import "../../../styles/button.css";
import "../../../styles/button2.css";
import Breadcrumb from "../../../components/Breadcrumb.jsx";

const AddItem = () => {
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
    <div class="app-container p-8 rounded border border-gray-200">
      <Breadcrumb
        crumbs={[
          { label: "Home", link: "/adminhome/:id" },
          { label: "All Items", link: "/AllItem" },

          { label: "Add Item", link: "/additem" },
        ]}
        selected={(crumb) => console.log(`Selected: ${crumb.label}`)}
      />

      <h3 className={`font-sm mt-0.5`}>Add Item</h3>

      <form onSubmit={handleSaveItem}>
        <div class="mt-4 grid  gap-4">
          <div>
            <label
              for=" Assets Class"
              class="text-sm text-gray-700 block mb-3 font-medium"
            >
              Assets Class
            </label>
            <input
              type="text"
              value={AssetsClass}
              onChange={(e) => setAssetsClass(e.target.value)}
              class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Assets class"
            />
          </div>

          <div>
            <label
              for="employeenumber"
              class="text-sm text-gray-700 block mb-3 font-medium"
            >
              Assets Sub Class
            </label>
            <input
              type="text"
              value={AssetsSubClass}
              onChange={(e) => setAssetsSubClass(e.target.value)}
              class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Assets Sub Class"
            />
          </div>
          
          <div>
            <label
              for="employeenumber"
              class="text-sm text-gray-700 block mb-3 font-medium"
            >
              Item Name
            </label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Item Name"
            />
          </div>
        </div>

        <div class="space-x-4 mt-8 text-center ">
          <button class="button-71" role="button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddItem;
