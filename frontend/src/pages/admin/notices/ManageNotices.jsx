import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import Breadcrumb from "../../../components/Breadcrumb.jsx";
import "../../../styles/button.css";
import {
  MdOutlineDelete,
  MdPreview,
  MdOutlineSimCardDownload,
  MdDownloading,
  MdDownload,
  MdDelete,
  MdOpenWith,
} from "react-icons/md";
import { useParams } from "react-router-dom";
import UserTypeNavbar from "../../../components/UserTypeNavbar.jsx";
import { Tooltip } from "flowbite-react";
import { IconButton } from "@material-tailwind/react";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { FolderIcon } from "@heroicons/react/24/solid";
import DefaultPagination from "../../../components/DefaultPagination.js";

const ManageNotices = () => {
  const [notice, setNotice] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUploadForm, setShowUploadForm] = useState(false);
  const navigate = useNavigate();

  const filteredNotices = notice.filter((notice) =>
    notice.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [searchOption, setSearchOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // State to manage current page
  const itemsPerPage = 5; // Number of items per page

  // Fetch users data from your API endpoint
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/notice/view-notice") // Update the API endpoint
      .then((response) => {
        setNotice(response.data.notice); // Assuming the guidance data is in response.data.guidance
        setLoading(false);
        console.error("veiw notice is success");
      })
      .catch((error) => {
        console.error("Error fetching guidance:", error);
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

   // Calculate index of the last item to display on the current page
   const indexOfLastItem = currentPage * itemsPerPage;
   // Calculate index of the first item to display on the current page
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
 
   // Slice the array of filtered requests to display only the items for the current page
   const currentItems = filteredNotices.slice(indexOfFirstItem, indexOfLastItem);
 
   const handlePageChange = (pageNumber) => {
     setCurrentPage(pageNumber);
   };


  const { id } = useParams();
  const handleDownloadClick = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/notice/download/${id}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "downloaded-notice.pdf";
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
    navigate("/UploadNotice"); // Update '/inputform' with the actual route
  };

  return (
    <div className="p-4">
      <UserTypeNavbar userType="admin" />
      <Breadcrumb
        crumbs={[
          { label: "Home", link: "/adminhome/:id" },
          { label: "Manage Notice", link: "/ManageNotice" },
        ]}
        selected={(crumb) => console.log(`Selected: ${crumb.label}`)}
      />

      <div className="reservation-list-container">
        <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
          <div class="rounded-t mb-0 px-4 py-3 border-0">
            <div class="flex flex-wrap items-center">
              <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 class="font-semibold  text-blueGray-700">
                  <i class="fa-solid fa-file-lines"></i> Notice
                </h3>
              </div>

              <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                <div class="flex justify-end gap-4">
                <div className="relative flex items-center">
                <div className="relative">
                  <button
                    type="submit"
                    className="absolute left-0 top-0 flex items-center justify-center h-full px-3"
                  >
                    <svg
                      className="text-gray-600 h-4 w-4 fill-current mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      version="1.1"
                      id="Capa_1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 56.966 56.966"
                      style={{ enableBackground: "new 0 0 56.966 56.966" }}
                      xmlSpace="preserve"
                      width="512px"
                      height="512px"
                    >
                      <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                    </svg>
                  </button>
                </div>
                <input
                  className="border-2 border-gray-300 bg-white h-10 px-10 pr-16 rounded-lg text-sm focus:outline-none flex-grow"
                  type="search"
                  name="search"
                  placeholder="Search by File Name"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
                  <button
                    class="select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-brandPrimary text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] flex items-center gap-3"
                    type="button"
                    onClick={handleUploadClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      class="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                      ></path>
                    </svg>
                    Upload Files
                  </button>

                 
                </div>
              </div>
            </div>
          </div>
          <hr class="border-t border-black-500 my-3  " />

          <div class="align-middle inline-block min-w-full  overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
            <table class="min-w-full">
              <thead class="text-xs text-white-700 uppercase bg-NeutralBlack  dark:text-gray-400">
                {" "}
                <tr>
                  <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-white tracking-wider">
                    No
                  </th>
                  <th
                    class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-white tracking-wider"
                    style={{ width: "500px" }} // Adjust the width as needed
                  >
                    File Name
                  </th>

               
                  <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-white tracking-wider">
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
                  currentItems.map((notice, index) => (
                    <tr key={notice._id} className="reservation-row">
                      <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-500">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm leading-5 text-gray-800">
                              {index + 1}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-500">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm leading-5 text-gray-800">
                              {notice.name}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td class="px-6 py-2 whitespace-no-wrap border-b border-gray-500">
                        <div className="icon-link flex justify-center gap-x-4">
                          <Link to={`/ViewNotices/${notice._id}`}>
                            <Tooltip content="Preview Notice">
                              <IconButton variant="text">
                                <EyeIcon className="h-6 w-6 text-green-500" />
                              </IconButton>
                            </Tooltip>
                          </Link>

                          <Link to={`/DeleteNotice/${notice._id}`}>
                            <Tooltip content="Delete Notice">
                              <IconButton variant="text">
                                <MdDelete className="h-6 w-6 text-red-500" />
                              </IconButton>
                            </Tooltip>
                          </Link>


                          <button
                            onClick={() => handleDownloadClick(notice._id)}
                          >
                            <Tooltip content="Download Notice">
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
            <div class="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans">
              <DefaultPagination onPageChange={handlePageChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageNotices;