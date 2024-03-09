import React, { useState } from "react";
import UserTypeNavbar from "../../components/UserTypeNavbar";
const TABLE_HEAD = [
  "Request ID",
  "Request Category",
  "Short Description",
  "Last Action",
  "Last Action Date",
  "Next Pending Action",
  "Relevant Officer",
  "View Details",
];

const TABLE_ROWS = [
  {
    requestId: "12345",
    requestCategory: "Category 1",
    shortDescription: "Purchase request for office supplies",
    lastAction: "Rejected",
    lastActionDate: "23/04/2024",
    nextPendingAction: "Approve and Forward",
    relevantOfficer: "Supply Officer",
    action: "2023-01-01",
  },
  {
    requestId: "12345",
    requestCategory: "Category 1",
    shortDescription: "Acquisition of laboratory equipment",
    lastAction: "Bid opening closing",
    lastActionDate: "23/04/2024",
    nextPendingAction: "Approve and Forward",
    relevantOfficer: "Supply Officer",
    action: "2023-01-01",
  },
  {
    requestId: "12345",
    requestCategory: "Category 1",
    shortDescription: "test sd form 1",
    lastAction: "tender request",
    lastActionDate: "23/04/2024",
    nextPendingAction: "Approve and Forward",
    relevantOfficer: "Supply Officer",
    action: "2023-01-01",
  },
  {
    requestId: "12345",
    requestCategory: "Category 1",
    shortDescription: "test sd form 1 yggvvghygvkygvghjm",
    lastAction: "Bid opening closing",
    lastActionDate: "23/04/2024",
    nextPendingAction: "Approve and Forward",
    relevantOfficer: "Supply Officer",
    action: "2023-01-01",
  },
  {
    requestId: "10",
    requestCategory: "Category 1",
    shortDescription: "test sd form 1",
    lastAction: "Approve and forward",
    lastActionDate: "23/04/2024",
    nextPendingAction: "Tender request",
    relevantOfficer: "Supply Officer",
    action: "2023-01-01",
  },
];

function ProgressTracker() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOption, setSearchOption] = useState("requestId");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchOptionChange = (e) => {
    setSearchOption(e.target.value);
  };

  // Filter the rows based on searchQuery and searchOption
  const filteredRows = TABLE_ROWS.filter((row) =>
    row[searchOption].toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div>
        <UserTypeNavbar userType="department" />

        <div className="flex flex-wrap -mx-3 mt-28">
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
                      <option  value="requestId">Request ID</option>
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
                          {TABLE_HEAD.map((head) => (
                            <th
                              key={head}
                              className={`p-4 text-start min-w-[${
                                head === "Request ID" ? 100 : 175
                              }px]`}
                            >
                              {head}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRows.map((detail, index) => (
                          <tr
                            key={index}
                            className="border-b border-dashed last:border-b-0"
                          >
                            <td className="pr-0 text-start">
                              <span className="font-semibold text-light-inverse text-md/normal">
                                {detail.requestId}
                              </span>
                            </td>

                            <td className="p-3 pr-0 text-start">
                              <span className="font-semibold text-light-inverse text-md/normal">
                                {detail.requestCategory}
                              </span>
                            </td>
                            <td className="p-3 pr-0 text-start">
                              <span className="font-semibold text-light-inverse text-md/normal">
                                {detail.shortDescription}
                              </span>
                            </td>
                            <td className="pt-3 pb-3 pr-12 text-start">
                              <span
                                className={`text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none rounded-lg ${
                                  detail.lastAction === "Bid opening closing"
                                    ? "text-blue-500 bg-blue-200"
                                    : detail.lastAction === "Tender request"
                                    ? "text-green-500 bg-green-200"
                                    : detail.lastAction ===
                                      "Approve and Forward"
                                    ? "text-yellow-500 bg-yellow-100"
                                    : detail.lastAction ===
                                      "Send purchase request"
                                    ? "text-purple-500 bg-purple-200"
                                    : detail.lastAction === "Rejected"
                                    ? "text-red-500 bg-red-300"
                                    : "text-primary bg-primary-light" // default style if action doesn't match
                                }`}
                              >
                                {detail.lastAction}
                              </span>
                            </td>
                            <td className="p-3 pr-0 text-start">
                              <span className="font-semibold text-light-inverse text-md/normal">
                                {detail.lastActionDate}
                              </span>
                            </td>
                            <td className="pr-0 text-start">
                              <span
                                className={`text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none rounded-lg ${
                                  detail.nextPendingAction ===
                                  "Bid opening closing"
                                    ? "text-blue-500 bg-blue-200"
                                    : detail.nextPendingAction ===
                                      "Tender request"
                                    ? "text-green-500 bg-green-200"
                                    : detail.nextPendingAction ===
                                      "Approve and Forward"
                                    ? "text-yellow-500 bg-yellow-100"
                                    : detail.nextPendingAction ===
                                      "Send purchase request"
                                    ? "text-purple-500 bg-purple-200"
                                    : detail.nextPendingAction === "Rejected"
                                    ? "text-red-500 bg-red-300"
                                    : "text-primary bg-primary-light" // default style if action doesn't match
                                }`}
                              >
                                {detail.nextPendingAction}
                              </span>
                            </td>
                            <td className="p-3 pr-0 text-start">
                              <span className="font-semibold text-light-inverse text-md/normal">
                                {detail.relevantOfficer}
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
