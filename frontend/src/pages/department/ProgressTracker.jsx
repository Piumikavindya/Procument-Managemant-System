import React, { useState, useEffect } from "react";
import axios from "axios";
import UserTypeNavbar from "../../components/UserTypeNavbar";
import DefaultPagination from "../../components/DefaultPagination";
import Breadcrumb from "../../components/Breadcrumb";

function ProgressTracker() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOption, setSearchOption] = useState("requestId");
  const [currentPage, setCurrentPage] = useState(1); // State to manage current page
  const itemsPerPage = 5; // Number of items per page

  // Fetch requests data from your API endpoint
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/procReqest/viewRequests")
      .then((response) => {
        const requestsWithNextPendingAction = response.data.map((request) => ({
          ...request,
          nextPendingAction: getNextPendingAction(request.status),
        }));
        setRequests(requestsWithNextPendingAction);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset current page when search query changes
  };

  const handleSearchOptionChange = (e) => {
    setSearchOption(e.target.value);
    setCurrentPage(1); // Reset current page when search option changes
  };

  // Filter the requests based on searchQuery and searchOption
  const filteredRequests = requests.filter((request) =>
    request[searchOption].toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate index of the last item to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calculate index of the first item to display on the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Slice the array of filtered requests to display only the items for the current page
  const currentItems = filteredRequests.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getNextPendingAction = (status) => {
    switch (status) {
      case "Pending":
        return "Approval";
      case "Pending":
        return "Rejected";
      case "Approved":
        return "Bid Opening Closing"; // Example next pending action
      case "Bid Opening Closing":
        return "Another Action"; // Example next pending action
      // Add cases for other statuses if needed
      case "Rejected":
        return "No Pending Action";
      default:
        return "No Pending Action";
    }
  };

  return (
    <div>
      <div>
        <UserTypeNavbar userType="department" />
        <div className="w-full max-w-full px-3  mb-6 mx-auto">
          <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
            <Breadcrumb
              crumbs={[
                { label: "Home", link: "/department/:departmentId/:userId" },
                { label: "Requisition Tracker", link: "/ProgressTrack" },
              ]}
              selected={(crumb) => console.log(`Selected: ${crumb.label}`)}
            />
            <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
              <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                  <span className="mr-3 font-semibold text-dark">
                    PURCHASE REQUEST SUMMARY
                  </span>
                </h3>
                <div className="relative flex flex-wrap items-center my-2">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="px-3 py-2 border border-gray-300 focus:outline-none focus:ring focus:ring-brandPrimary focus:ring-opacity-50 rounded-md"
                  />
                  <select
                    value={searchOption}
                    onChange={handleSearchOptionChange}
                    className="px-6 py-2 border border-gray-300 focus:outline-none focus:ring focus:ring-brandPrimary focus:ring-opacity-50 rounded-md ml-3"
                  >
                    <option value="requestId">Request ID</option>
                    <option value="purpose">Purpose</option>
                  </select>
                </div>
              </div>
              <div className="flex-auto block py-8 pt-6 px-9">
                <div className="overflow-x-auto">
                  <table className="w-full my-0 align-middle text-dark border-neutral-200">
                    <thead className="align-bottom bg-NeutralBlack ">
                      <tr className="font-semibold text-[0.95rem] text-white">
                        <th className="p-4 text-start ">Request ID</th>
                        <th className="p-4 text-start ">Purpose</th>
                        <th className="p-4 text-start">Department</th>
                        <th className="p-4 text-start">Last Action</th>
                        <th className="p-4 text-start">Last Action Date</th>
                        <th className="p-4 text-start">Next Pending Action</th>
                        <th className="p-4 text-start">Approver</th>
                        <th className="p-4 text-start"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((request, index) => (
                        <tr
                          key={index}
                          className="border-b border-dashed last:border-b-0"
                        >
                          <td className="pr-0 pl-4 text-start">
                            <span className="font-semibold text-light-inverse text-md/normal">
                              {request.requestId}
                            </span>
                          </td>
                          <td className="p-3 pr-0 text-start">
                            <span className="font-semibold text-light-inverse text-md/normal">
                              {request.purpose}
                            </span>
                          </td>
                          <td className="p-3 pr-0 text-start">
                            <span className="font-semibold text-light-inverse text-md/normal">
                              {request.department}
                            </span>
                          </td>

                          <td className="pt-3 pb-3 pr-12 text-start">
                            <span
                              className={`text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none rounded-lg ${
                                request.status === "Pending"
                                  ? "text-purple-500 bg-purple-200"
                                  : request.status === "Approved"
                                  ? "text-green-500 bg-green-200"
                                  : request.status === "Bid Opening Closing"
                                  ? "text-yellow-500 bg-yellow-100"
                                  : request.status === ""
                                  ? "text-blue-500 bg-blue-200"
                                  : request.status === "Rejected"
                                  ? "text-red-500 bg-red-300"
                                  : "text-primary bg-primary-light" // default style if action doesn't match
                              }`}
                            >
                              {request.status}
                            </span>
                          </td>
                          <td className="p-3 pr-0 text-start">
                            <span className="font-semibold text-light-inverse text-md/normal">
                              {new Date(request.date).toLocaleDateString()}{" "}
                            </span>
                          </td>
                          <td className="pr-0 text-start">
                            <span
                              className={`text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none rounded-lg ${
                                request.nextPendingAction === "Request Sent"
                                  ? "text-blue-500 bg-blue-200"
                                  : request.nextPendingAction === "Approval"
                                  ? "text-green-500 bg-green-200"
                                  : request.nextPendingAction ===
                                    "Bid Opening Closing"
                                  ? "text-yellow-500 bg-yellow-100"
                                  : request.nextPendingAction === "Approval"
                                  ? "text-purple-500 bg-purple-200"
                                  : request.nextPendingAction === "Rejected"
                                  ? "text-red-500 bg-red-300"
                                  : "text-primary bg-primary-light" // default style if action doesn't match
                              }`}
                            >
                              {request.nextPendingAction}
                            </span>
                          </td>
                          <td className="p-3 pr-0 text-start">
                            <span className="font-semibold text-light-inverse text-md/normal">
                              {request.sendTo}
                            </span>
                          </td>
                          <td className="pl-12  text-center">
                            <div className="flex  items-center">
                              <button className="relative text-black bg-gray-300 hover:text-primary flex items-center h-[25px] w-[25px] text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-full transition-colors duration-200 ease-in-out shadow-none border-0 justify-center">
                                <span className="flex items-center justify-center p-0 m-0 leading-none shrink-0">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                    />
                                  </svg>
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <DefaultPagination onPageChange={handlePageChange} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressTracker;
