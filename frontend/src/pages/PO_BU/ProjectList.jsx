import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import {
  MdOutlineDelete,
  MdPreview,
  MdOutlineSimCardDownload,
} from "react-icons/md";
import { useParams } from "react-router-dom";
import UserTypeNavbar from "../../components/UserTypeNavbar.jsx";
import Breadcrumb from "../../components/Breadcrumb.jsx";
import DefaultPagination from "../../components/DefaultPagination.js";
import { Tooltip } from "flowbite-react";
import { IconButton } from "@material-tailwind/react";
import { EyeIcon } from "@heroicons/react/24/outline";
import { MdDelete, MdDownload } from "react-icons/md";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUploadForm, setShowUploadForm] = useState(false);
  const navigate = useNavigate();

  const filteredprojects = projects.filter((project) =>
    project.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [searchOption, setSearchOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // State to manage current page
  const itemsPerPage = 5; // Number of items per page

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/procProject/viewProjects")
      .then((response) => {
        setProjects(response.data);
        setLoading(false);
        console.error("view project is success");
      })
      .catch((error) => {
        console.error("Error fetching project:", error);
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
  const currentItems = filteredprojects.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const { id } = useParams();
  const handleDownloadClick = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/project/download/${id}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "downloaded-project.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading project:", error);
    }
  };

  const selected = (crumb) => {
    console.log(crumb);
  };
  const handleUploadClick = () => {
    navigate("/Uploadproject");
  };

  return (
    <div className="p-4">
      <UserTypeNavbar userType="procurement Officer" />
      <Breadcrumb
        crumbs={[
          { label: "Home", link: "/PO_BuHome/:id" },
          { label: "Created Projects", link: "/CreatedProjects" },
        ]}
        selected={(crumb) => console.log(`Selected: ${crumb.label}`)}
      />

      <div className="reservation-list-container">
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold  text-blueGray-700">
                  <i className="fa-solid fa-file-lines"></i> Generated Project List
                </h3>
              </div>

              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <div className="flex justify-end gap-4">
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
                </div>
              </div>
            </div>
          </div>
          <hr className="border-t border-black-500 my-3  " />

          <div className="align-middle inline-block min-w-full  overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
            <table className="min-w-full">
              <thead className="text-xs text-white uppercase bg-NeutralBlack   dark:text-gray-400">
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
                projects.map((project, index) => (
                    <tr key={project._id} className="reservation-row">
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
                              {project.projectId}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-500">
                        <div className="icon-link flex justify-center gap-x-4">
                          <Link to={`/PreviewProjectDetails/${project.projectId}`}>
                            <Tooltip content="Preview the Project">
                              <IconButton variant="text">
                                <EyeIcon className="h-6 w-6 text-green-500" />
                              </IconButton>
                            </Tooltip>
                          </Link>

                          <button
                            onClick={() => handleDownloadClick(project._id)}
                          >
                            <Tooltip content="Download Project">
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
              <DefaultPagination onPageChange={handlePageChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}