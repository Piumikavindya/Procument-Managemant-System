import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEdit, AiOutlineSend, AiOutlineDelete } from "react-icons/ai";
import UserTypeNavbar from "../../components/UserTypeNavbar";
import Breadcrumb from "../../components/Breadcrumb";
import { useParams } from "react-router-dom";

const RequestList = () => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOption, setSearchOption] = useState("requestId");
  const [requests, setRequests] = useState([]);
  const { filename } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/procRequest/viewRequests")
      .then((response) => {
        setRequests(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
        setLoading(false);
      });
  }, []);

  // Function to extract the request ID from the file name
  const extractRequestIdFromFile = (fileName) => {
    // Assuming the format is "Purchase_Requisition_REQXXX.pdf"
    const parts = fileName.split("_");
    if (parts.length === 3 && parts[2].endsWith(".pdf")) {
      return parts[2].replace(".pdf", "");
    }
    return "";
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchOptionChange = (e) => {
    setSearchOption(e.target.value);
  };

  const PDF_BASE_URL = 'http://localhost:8000/pdf/';

  const filteredRequests = requests.filter((request) =>
    request[searchOption].toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      <UserTypeNavbar userType="department" />
      <Breadcrumb
        crumbs={[
          { label: "Home", link: "/DepartmentHome" },
          { label: "Pending Approval list", link: "/ViewForApproval" },
        ]}
        selected={(crumb) => console.log(`Selected: ${crumb.label}`)}
      />

      <div className="reservation-list-container">
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
          <div className="align-middle inline-block min-w-full  overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
            <table className="min-w-full">
              <thead className="text-xs text-white uppercase bg-NeutralBlack  dark:bg-gray-200 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-white tracking-wider">
                    Request ID
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-white tracking-wider">
                    File
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
                            <a href={PDF_BASE_URL + request.file} target="_blank" rel="noopener noreferrer">
                              {request.file}
                            </a>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-500">
                      <Link to={`/ApprovalForm/${request._id}`}>
                        <AiOutlineEdit className="text-2xl text-blue-800" />
                      </Link>
                      <Link to={`/SendApproval/${request._id}`}>
                        <AiOutlineSend className="text-2xl text-green-600" />
                      </Link>
                      <Link to={`/DenyApproval/${request._id}`}>
                        <AiOutlineDelete className="text-2xl text-red-600 " />
                      </Link>
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
