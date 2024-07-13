import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "flowbite-react";
import { IconButton } from "@material-tailwind/react";

const InvitesBidsCard = ({ project, vendors, onClose, onSuccess }) => {
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const handleVendorChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedVendors([...selectedVendors, value]);
    } else {
      setSelectedVendors(
        selectedVendors.filter((vendorId) => vendorId !== value)
      );
    }
  };

  const handleInviteClick = () => {
    console.log("Project ID:", project.projectId);
    console.log("Bidding Type:", project.biddingType);

    axios
      .post(
        `http://localhost:8000/bids/invite/${project.projectId}/${project.biddingType}`,
        {
          supplierIds: selectedVendors,
        }
      )

      .then((response) => {
        console.log("Invitations sent successfully:", response.data);

        onSuccess(project.projectId);
        navigate("/InvitesBids");
        onClose();
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
          Invite bids for project: <strong>{project?.projectId}</strong>
        </p>
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">Select</th>
              <th className="border border-gray-400 px-4 py-2">Supplier ID</th>
              <th className="border border-gray-400 px-4 py-2">
                Supplier Name
              </th>
              <th className="border border-gray-400 px-4 py-2">Operations</th>
            </tr>
          </thead>
          <tbody>
            {vendors &&
              vendors.length > 0 &&
              vendors.map((supplier) => (
                <tr key={supplier._id}>
                  <td className="border border-gray-400 px-4 py-2">
                    <input
                      type="checkbox"
                      value={supplier._id}
                      onChange={handleVendorChange}
                    />
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {supplier.supplierId}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {supplier.supplierName}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    <Link to={`/PreviewSupplyerDetails/${supplier._id}`}>
                      <Tooltip content="Preview the Project">
                        <IconButton variant="text">
                          <EyeIcon className="h-6 w-6 text-green-500" />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
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
