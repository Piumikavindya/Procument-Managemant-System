import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdSend } from "react-icons/md";
import { FaDownload, FaCircleCheck } from "react-icons/fa";
import { IconButton } from "@material-tailwind/react";
import { CheckIcon, EyeIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../../context/AuthContext";
import { Toast, Tooltip } from "flowbite-react";
import UserTypeNavbar from "../../components/UserTypeNavbar";
import Breadcrumb from "../../components/Breadcrumb";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { ToastContainer } from "react-toastify";

const RequestList = ({
  isAuthenticated,
  handleSignOut,
  username,
  userId,
  department,
}) => {
  const { loggedInUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOption, setSearchOption] = useState("requestId");
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (loggedInUser) {
      setLoading(true);
      axios
        .get(
          `http://localhost:8000/procReqest/viewRequestsByDepartment/${loggedInUser.id}`
        )
        .then((response) => {
          setRequests(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching requests:", error);
          setLoading(false);
        });
    }
  }, [loggedInUser]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchOptionChange = (e) => {
    setSearchOption(e.target.value);
  };

  const generateFileName = (requestId) => {
    return `Purchase_Requisition_${requestId}.pdf`;
  };

  const filteredRequests = requests.filter((request) => {
    const searchValue = request[searchOption];
    return (
      searchValue &&
      searchValue.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleSendRequest = (requestId) => {
    // Placeholder function to handle sending the request
    // After sending successfully, update the request status
    // For demonstration purposes, assume the request is successfully sent
    // and update the state accordingly
    const updatedRequests = requests.map((req) =>
      req.requestId === requestId ? { ...req, sent: true } : req
    );
    setRequests(updatedRequests);
  };

  return (
    <div className="p-4">
      <UserTypeNavbar userType="department" />

      <Breadcrumb
        crumbs={[
          { label: "Home", link: "/Home/:id" },
          { label: "Purchase Requisition", link: "/reqForm" },
          { label: "Purchase Requisition List", link: "/ViewForRequest" },
        ]}
        selected={(crumb) => console.log(`Selected: ${crumb.label}`)}
      />

      <div className="reservation-list-container">
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
          <div className="align-middle inline-block min-w-full  overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
            <table className="min-w-full">
              <thead className="text-xs text-white uppercase bg-NeutralBlack   dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-white tracking-wider">
                    Request ID
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-white tracking-wider">
                    Request Form Name
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-white tracking-wider">
                    Sender
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-white tracking-wider">
                    Department
                  </th>

                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-white tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {filteredRequests.map((request) => (
                  <tr key={request._id} className="reservation-row">
                    <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-500">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm leading-5 text-gray-900">
                            {request.requestId}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-500">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm leading-5 text-gray-900">
                            {generateFileName(request.requestId)}{" "}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-500">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm leading-5 text-gray-900">
                            {request.sendTo}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-500">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm leading-5 text-gray-900">
                            {request.department}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-500">
                      <div className="icon-link flex justify-center gap-x-4">
                        {request.sent ? (
                          <Tooltip content="Sent">
                            <IconButton variant="text">
                              <CheckCircleIcon className="h-7 w-7  text-green-500" />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <>
                            <Link
                              onClick={() =>
                                handleSendRequest(request.requestId)
                              }
                              to={`/SendRequest/${request.requestId}/${request.sendTo}`}
                            >
                              <Tooltip content="Send Request">
                                <IconButton variant="text">
                                  <MdSend className="h-6 w-6  text-purple-500" />
                                </IconButton>
                              </Tooltip>
                            </Link>
                          </>
                        )}

                        <Link to={`/DownloadRequest/${request.requestId}`}>
                          <Tooltip content="Download Request">
                            <IconButton variant="text">
                              <FaDownload className="h-6 w-6  text-red-500" />
                            </IconButton>
                          </Tooltip>
                        </Link>

                        <Link to={`/ViewFormRequest/${request.requestId}`}>
                          <Tooltip content="View Request">
                            <IconButton variant="text">
                              <EyeIcon className="h-6 w-6  text-blue-500" />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <ToastContainer className="mt-20" autoClose={3000} />
      </div>
    </div>
  );
};

export default RequestList;
