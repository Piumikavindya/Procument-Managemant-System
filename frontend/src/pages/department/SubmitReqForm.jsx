import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "flowbite-react";
import { IconButton } from "@material-tailwind/react";
import UserTypeNavbar from "../../components/UserTypeNavbar";
import Breadcrumb from "../../components/Breadcrumb";
import { CheckCircleIcon, FolderOpenIcon } from "@heroicons/react/24/solid";
import { MdCancel } from "react-icons/md";

function SubmitReqForm() {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOption, setSearchOption] = useState("requestId");
  const [requests, setRequests] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [allImage, setAllImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    getPdf();
  }, []);
  const getPdf = async () => {
    const result = await axios.get("http://localhost:8000/get-files");
    console.log(result.data.data);
  
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchOptionChange = (e) => {
    setSearchOption(e.target.value);
  };

  const filteredRequests = requests.filter((request) =>
    request[searchOption].toLowerCase().includes(searchQuery.toLowerCase())
  );
  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    console.log(title, file);

    const result = await axios.post(
      "http://localhost:5000/upload-files",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(result);
    if (result.data.status == "ok") {
      alert("Uploaded Successfully!!!");
      getPdf();
    }
  };
  const showPdf = (pdf) => {
    // window.open(`http://localhost:5000/files/${pdf}`, "_blank", "noreferrer");
    setPdfFile(`http://localhost:5000/files/${pdf}`)
  };
  return (
    <div className="p-4">
      <UserTypeNavbar userType="approver" />
      <Breadcrumb
        crumbs={[
          { label: "Home", link: "/ApproverHome/:id" },
          { label: "Pending Approval list", link: "/ViewForApproval" },
        ]}
        selected={(crumb) => console.log(`Selected: ${crumb.label}`)}
      />

      <div className="reservation-list-container">
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold  text-blueGray-700">
                  PURCHASE REQUEST APPROVAL MANAGEMENT
                </h3>
              </div>

              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <div className="flex justify-end gap-4">
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
                      <option value="department">Department</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="border-t border-black-500 my-3  " />

          <div className="align-middle inline-block min-w-full  overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
            <table className="min-w-full">
              <thead className="text-xs text-white uppercase bg-NeutralBlack  dark:bg-gray-200 dark:text-gray-400">
                {" "}
                <tr>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-white tracking-wider">
                    Title
                  </th>
                
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-white tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {filteredRequests.map((request) => (
                  <tr key={request.requestId} className="reservation-row">
                    <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-500">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm leading-5 text-gray-900">
                            {request.title}
                          </div>
                        </div>
                      </div>
                    </td>

                 
                    <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-500">
                      <div className="icon-link flex justify-center gap-x-4">
                        <Link to={`/ApprovalForm/${request.title}`}>
                          <Tooltip content="Approve">
                            <IconButton variant="text">
                              <CheckCircleIcon className="h-6 w-6 text-green-500" />
                            </IconButton>
                          </Tooltip>
                        </Link>

                
                        <Link to={`/DenyApproval/${request.requestId}`}>
                          <Tooltip content="View">
                            <IconButton variant="text">
                              <FolderOpenIcon className="h-6 w-6 text-blue-500" />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans">
              <div>
                <nav className="relative z-0 inline-flex shadow-sm">
                  <div>
                    <a
                      href="#"
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                      aria-label="Previous"
                      onClick={(e) => e.preventDefault()}
                    >
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                  <div>
                    <a
                      href="/allusers"
                      className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-700 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary"
                    >
                      1
                    </a>
                  </div>
                  <div>
                    <a
                      href="#"
                      className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                      aria-label="Next"
                      onClick={(e) => e.preventDefault()}
                    >
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmitReqForm;
