import React, { useState, useEffect } from "react";
import axios from "axios";
import UserTypeNavbar from "../../components/UserTypeNavbar";
import { Breadcrumb } from "flowbite-react";

function ProgressTracker() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOption, setSearchOption] = useState("requestId");

  // Fetch requests data from your API endpoint
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

  // Filter the requests based on searchQuery and searchOption
  const filteredRequests = requests.filter((request) =>
    request[searchOption].toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div>
        <UserTypeNavbar userType="department" />

        <div className="flex flex-wrap -mx-3 mt-55">
        <Breadcrumb
          crumbs={[
            { label: "Home", link: "/adminhome/:id" },
            { label: "User Details", link: "/userList" },

            { label: "Add User Details", link: "/addUsers" },
          ]}
          selected={(crumb) => console.log(`Selected: ${crumb.label}`)}
        />
          <div className="w-full max-w-full px-3  mb-6 mx-auto">
            <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
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
                      <option value="shortDescription">
                        Short Description
                      </option>
                    </select>
                  </div>
                </div>
                <div className="flex-auto block py-8 pt-6 px-9">
                  <div className="overflow-x-auto">
                    <table className="w-full my-0 align-middle text-dark border-neutral-200">
                      <thead className="align-bottom bg-NeutralBlack ">
                        <tr className="font-semibold text-[0.95rem] text-white">
                          <th className="p-4 text-start min-w-[100px]">
                            Request ID
                          </th>
                          <th className="p-4 text-start min-w-[175px]">
                            Department
                          </th>
                          <th className="p-4 text-start">Date</th>
                          <th className="p-4 text-start">Purpose</th>
                          <th className="p-4 text-start">Last Action</th>
                          <th className="p-4 text-start">
                            Next Pending Action
                          </th>
                          <th className="p-4 text-start">Approver</th>
                          <th className="p-4 text-start"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRequests.map((request, index) => (
                          <tr
                            key={index}
                            className="border-b border-dashed last:border-b-0"
                          >
                            <td className="pr-0 text-start">
                              <span className="font-semibold text-light-inverse text-md/normal">
                                {request.requestId}
                              </span>
                            </td>
                            <td className="p-3 pr-0 text-start">
                              <span className="font-semibold text-light-inverse text-md/normal">
                                {request.department}
                              </span>
                            </td>
                            <td className="p-3 pr-0 text-start">
                              <span className="font-semibold text-light-inverse text-md/normal">
                                {request.date}
                              </span>
                            </td>
                            <td className="p-3 pr-0 text-start">
                              <span className="font-semibold text-light-inverse text-md/normal">
                                {request.purpose}
                              </span>
                            </td>
                            <td className="pt-3 pb-3 pr-12 text-start">
                              <span
                                className={`text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none rounded-lg ${
                                  request.lastAction === "Bid opening closing"
                                    ? "text-blue-500 bg-blue-200"
                                    : request.lastAction === "Tender request"
                                    ? "text-green-500 bg-green-200"
                                    : request.lastAction ===
                                      "Approve and Forward"
                                    ? "text-yellow-500 bg-yellow-100"
                                    : request.lastAction ===
                                      "Send purchase request"
                                    ? "text-purple-500 bg-purple-200"
                                    : request.lastAction === "Rejected"
                                    ? "text-red-500 bg-red-300"
                                    : "text-primary bg-primary-light" // default style if action doesn't match
                                }`}
                              >
                                {request.lastAction}
                              </span>
                            </td>
                            <td className="pr-0 text-start">
                              <span
                                className={`text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none rounded-lg ${
                                  request.nextPendingAction ===
                                  "Bid opening closing"
                                    ? "text-blue-500 bg-blue-200"
                                    : request.nextPendingAction ===
                                      "Tender request"
                                    ? "text-green-500 bg-green-200"
                                    : request.nextPendingAction ===
                                      "Approve and Forward"
                                    ? "text-yellow-500 bg-yellow-100"
                                    : request.nextPendingAction ===
                                      "Send purchase request"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressTracker;
