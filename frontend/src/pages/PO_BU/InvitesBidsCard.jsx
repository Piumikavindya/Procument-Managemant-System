// InviteBidsModal.jsx
import React, { useState } from "react";
import axios from "axios";

const InvitesBidsCard = ({ project, vendors, onClose }) => {
  const [selectedVendors, setSelectedVendors] = useState([]);

  const handleVendorChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedVendors(selectedOptions);
  };

  const handleInviteClick = () => {
    axios
      .post(`http://localhost:8000/bids/invite/${project.projectId}`, {
        supplierIds: selectedVendors,
      })
      .then((response) => {
        console.log("Invitations sent successfully:", response.data);
        onClose();  // Close the modal on success
      })
      .catch((error) => {
        console.error("Error sending invitations:", error);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="bg-white rounded-lg p-4 w-1/3">
        <h2 className="text-lg font-bold mb-4">Invite Bids</h2>
        <p className="mb-4">
          Invite bids for project: <strong>{project.projectId}</strong>
        </p>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Select Vendors</label>
          <select
            multiple
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={selectedVendors}
            onChange={handleVendorChange}
          >
            {vendors.map((supplyer) => (
              <option key={supplyer._id} value={supplyer._id}>
                {supplyer.supplierName} - {supplyer.supplierId}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleInviteClick}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Invite
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvitesBidsCard;
