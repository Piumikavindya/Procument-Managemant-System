import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import Breadcrumb from "../../../components/Breadcrumb.jsx";
import "../../../styles/button.css";
import { MdDelete, MdDownload } from "react-icons/md";
import { useParams } from "react-router-dom";
import UserTypeNavbar from "../../../components/UserTypeNavbar.jsx";
import { Tooltip } from "flowbite-react";
import { IconButton } from "@material-tailwind/react";
import { EyeIcon } from "@heroicons/react/24/outline";

const ManageGuidance = () => {
  const [guidances, setGuidance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUploadForm, setShowUploadForm] = useState(false);
  const navigate = useNavigate();

  const filteredGuidances = guidances.filter((guidance) =>
    guidance.guidanceId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/guidance/view-guidance")
      .then((response) => {
        setGuidance(response.data.guidance);
        setLoading(false);
        console.error("veiw guidance is success");
      })
      .catch((error) => {
        console.error("Error fetching guidance:", error);
        setLoading(false);
      });
  }, []);

  const { id } = useParams();
  const handleDownloadClick = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/guidance/download/${id}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "downloaded-guidance.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading guidance:", error);
    }
  };

  const selected = (crumb) => {
    console.log(crumb);
  };
  const handleUploadClick = () => {
    navigate("/UploadGuidance");
  };

  return (
    <div className="p-4">
      <UserTypeNavbar userType="admin" />
      <Breadcrumb
        crumbs={[
          { label: "Home", link: "/adminhome/:id" },
          { label: "Manage Guidance", link: "/ManageGiidance" },
        ]}
        selected={(crumb) => console.log(`Selected: ${crumb.label}`)}
      />

      <div className="reservation-list-container">
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold  text-blueGray-700">
                  <i className="fa-solid fa-file-lines"></i> Guidance
                </h3>
              </div>

              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <div className="flex justify-end gap-4">
                  <button
                    className="select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-brandPrimary from-gray-900 to-gray-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] flex items-center gap-3"
                    type="button"
                    onClick={handleUploadClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                      ></path>
                    </svg>
                    Upload Files
                  </button>

                  <button
                    className="select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-NeutralBlack  text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] flex items-center gap-3"
                    type="button"
                    onClick={handleUploadClick}
                  >
                    Upload History
                  </button>
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
                    No
                  </th>
                  <th
                    className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-white tracking-wider"
                    style={{ width: "500px" }}
                  >
                    File Name
                  </th>

                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-white-900 tracking-wider">
                    Operations
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {loading ? (
                  <tr>
                    <td colSpan="3" className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  guidances.map((guidance, index) => (
                    <tr key={guidance._id} className="reservation-row">
                      <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-500">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm leading-5 text-gray-900">
                              {index + 1}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-500">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm leading-5 text-gray-900">
                              {guidance.name}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-500">
                        <div className="icon-link flex justify-center gap-x-4">
                          <Link to={`/ViewGuidances/${guidance._id}`}>
                            <Tooltip content="Preview Guidelines">
                              <IconButton variant="text">
                                <EyeIcon className="h-6 w-6 text-green-500" />
                              </IconButton>
                            </Tooltip>
                          </Link>

                          <Link to={`/DeleteGuidance/${guidance._id}`}>
                            <Tooltip content="Delete Guidelines">
                              <IconButton variant="text">
                                <MdDelete className="h-6 w-6 text-red-500" />
                              </IconButton>
                            </Tooltip>
                          </Link>

                          <button
                            onClick={() => handleDownloadClick(guidance._id)}
                          >
                            <Tooltip content="Download Guidelines">
                              <IconButton variant="text">
                                <MdDownload className="h-6 w-6 text-blue-500" />
                              </IconButton>
                            </Tooltip>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
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
};

export default ManageGuidance;
