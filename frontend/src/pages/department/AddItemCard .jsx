import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const AddItemCard = ({ handleAddItemsClick }) => {
  const navigate = useNavigate();
  const { requestId } = useParams();
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [qtyRequired, setQtyRequired] = useState("");
  const [qtyAvailable, setQtyAvailable] = useState("");

  const handleCancelClick = () => {
    // Implement the logic for cancel action here
    navigate("/reqform");
  };

  const handleAddItemClick = async () => {
    try {
      // Perform the logic to add an item, for example:
      const response = await axios.post(
        `http://localhost:8000/procReqest/addProcItem/${requestId}`,
        {description,
            cost,
            qtyRequired,
            qtyAvailable,}
      );
  
      // Assuming the response contains the updated request
      const updatedRequest = response.data.updatedRequest;
  
      // Update the state or perform any other actions based on the response
      console.log("Item added successfully", updatedRequest);
  // Call the callback function to update the items state in the ReqForm component
  handleAddItemsClick({
    description,
    cost,
    qtyRequired,
    qtyAvailable,
  });

  
    } catch (error) {
      console.error("Error adding item", error);
    }
  };
  
  return (
    <div class="mt-24 py-6 flex flex-col justify-center sm:py-12">
      <div class="relative py-3 sm:max-w-xl sm:mx-auto">
        <div class="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div class="max-w-md mx-auto">
            <div class="flex items-center space-x-5">
              <div class="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                i
              </div>
              <div class="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 class="leading-relaxed">Add Items</h2>
              </div>
            </div>
            <div class="divide-y divide-gray-200">
              <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div class="flex flex-col">
                  <label class="leading-loose">
                    Description of the item/items indented to be purchased
                  </label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Add a discription"
                  />
                </div>
                <div class="flex flex-col">
                  <label class="leading-loose"> Cost (Approximately)</label>
                  <input
                    type="text"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Add cost"
                  />
                </div>
                <div class="flex flex-col">
                  <label class="leading-loose"> Qty Required</label>
                  <input
                    type="text"
                    value={qtyRequired}
                    onChange={(e) => setQtyRequired(e.target.value)}
                    class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Add quntity required"
                  />
                </div>

                <div class="flex flex-col">
                  <label class="leading-loose">Qty Available</label>
                  <input
                    type="text"
                    value={qtyAvailable}
                    onChange={(e) => setQtyAvailable(e.target.value)}
                    class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Add qumtity available"
                  />
                </div>
              </div>
              <div class="pt-4 flex items-center space-x-4">
                <button
                  onClick={handleCancelClick}
                  class="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none"
                >
                  <svg
                    class="w-6 h-6 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>{" "}
                  Cancel
                </button>
                <button
                  onClick={handleAddItemClick}
                  class="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
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