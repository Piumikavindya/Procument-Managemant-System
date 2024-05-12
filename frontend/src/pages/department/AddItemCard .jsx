import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const AddItemCard = ({ handleAddItemsClick,handleViewProcItems }) => {
  const navigate = useNavigate();
  const { requestId } = useParams();
  const [itemName, setItemName] = useState("");
  const [cost, setCost] = useState("");
  const [qtyRequired, setQtyRequired] = useState("");
  const [qtyAvailable, setQtyAvailable] = useState("");
  

  const handleCancelClick = () => {
    // Implement the logic for cancel action here
    navigate("/reqform");
  };

  const handleAddItemClick = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/procReqest/addProcItem/${requestId}`,
        {
          itemName,
          cost,
          qtyRequired,
          qtyAvailable,
        }
      );

      const newItemData = response.data.newItem;
      // handleViewProcItems(); // Fetch updated items after adding

      setItemName("");
      setCost("");
      setQtyRequired("");
      setQtyAvailable("");

      console.log("Item added successfully", newItemData);
    } catch (error) {
      console.error("Error adding item", error);
    }
  };

  
  
  return (
    <div className="mt-24 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                i
              </div>
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed">Add Items</h2>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col">
                  <label className="leading-loose">
                    Description of the item/items indented to be purchased
                  </label>
                  <input
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Add a description"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose"> Cost (Approximately)</label>
                  <input
                    type="text"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Add cost"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose"> Qty Required</label>
                  <input
                    type="text"
                    value={qtyRequired}
                    onChange={(e) => setQtyRequired(e.target.value)}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Add quantity required"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="leading-loose">Qty Available</label>
                  <input
                    type="text"
                    value={qtyAvailable}
                    onChange={(e) => setQtyAvailable(e.target.value)}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Add quantity available"
                  />
                </div>
              </div>
              <div className="pt-4 flex items-center space-x-4">
                <button
                  onClick={handleCancelClick}
                  className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none"
                >
                  <svg
                    className="w-6 h-6 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                  Cancel
                </button>
                <button
                  onClick={handleAddItemClick}
                  className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};