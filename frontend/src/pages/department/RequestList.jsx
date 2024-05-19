// RequestList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdSimCardDownload,MdPreview } from "react-icons/md";
import { AiOutlineSend } from "react-icons/ai";
import UserTypeNavbar from "../../components/UserTypeNavbar";
import Breadcrumb from "../../components/Breadcrumb";

const RequestList = () => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOption, setSearchOption] = useState("requestId");
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/procReqest/viewRequests") 
      .then((response) => {
        setRequests(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
        setLoading(false);
      });
  }, []);

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
                  <th
                    className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-white tracking-wider"
                  
                  >
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
                        <Link
                          to={`/SendRequest/${request.requestId}/${request.sendTo}`}
                        >
                          <AiOutlineSend className="text-2xl text-green-600" />
                        </Link>
                        <Link to={`/DownloadRequest/${request.requestId}`}>
                          <MdSimCardDownload className="text-2xl text-green-600" />
                        </Link>
                        <Link to={`/ViewFormRequest/${request.requestId}`}>
                          <MdPreview className="text-2xl text-green-800" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestList;
