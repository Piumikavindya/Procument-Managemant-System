import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon, EyeIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProjectCreationForm from "./ProjectCreationForm";
import { useSnackbar } from "notistack";
import { Tooltip } from "flowbite-react";
import { IconButton } from "@material-tailwind/react";
import {} from "react-icons/md";
import axios from "axios";

export const AddReqCard = ({ handleViewRequest }) => {
  const [open, setOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOption, setSearchOption] = useState("requestId");
  const [showAddRequestCard, setShowAddRequestCard] = useState(false);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRequests, setSelectedRequests] = useState([]);
  const { projectId } = useParams();

  // const [projectId, setProjectId] = useState("");

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

  const navigate = useNavigate();

  const handleCloseClick = () => {
    navigate("/ProjectCreationForm");
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

  const handleCheckboxChange = (requestId) => {
    // Toggle the selection status of the request ID
    setSelectedRequests((prevSelectedRequests) =>
      prevSelectedRequests.includes(requestId)
        ? prevSelectedRequests.filter((id) => id !== requestId)
        : [...prevSelectedRequests, requestId]
    );
  };

  const handleAddRequestClick = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/procProject/addRequestsData/${projectId}`,
        {
          requestIds: selectedRequests,
          items: [], // Include an empty items array
        }
      );

      const newRequestData = response.data.newRequest;
      setRequests([]);
      navigate("/ProjectCreationForm");
      console.log("Selected requests added successfully", newRequestData);
      // handleViewRequest();
    } catch (error) {
      console.error("Error adding requests:", error);
    }
  };

  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => handleCloseClick()} // Use onClose to handle both closing and navigating
          static // Add the static prop here
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="px-4 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                  <div className="reservation-list-container">
                    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8  lg:px-8">
                      <div className="rounded-t mb-0  py-3 border-0">
                        <div className="flex flex-wrap items-center">
                          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className="font-semibold  text-blueGray-700">
                              Choose similar category of purchase requisitions
                            </h3>
                          </div>
                        </div>
                      </div>
                      <hr className="border-t border-black-500 my-3  " />

                      <div className="  align-middle inline-block min-w-full  overflow-hidden bg-white shadow-dashboard  pt-3 rounded-bl-lg rounded-br-lg">
                        <table className="min-w-full">
                          <thead className="text-xs text-white uppercase bg-NeutralBlack  dark:bg-gray-200 dark:text-gray-400">
                            {" "}
                            <tr>
                              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-white tracking-wider">
                                Request ID
                              </th>
                              <th
                                className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-white tracking-wider"
                                style={{ width: "500px" }}
                              >
                                Department
                              </th>

                              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-white tracking-wider">
                                Purpose
                              </th>

                              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-white tracking-wider">
                                Actions
                              </th>

                              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-white tracking-wider"></th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            {filteredRequests.map((request) => (
                              <tr
                                key={request.requestId}
                                className="reservation-row"
                              >
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
                                        {request.department}
                                      </div>
                                    </div>
                                  </div>
                                </td>

                                <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-500">
                                  <div className="flex items-center">
                                    <div>
                                      <div className="text-sm leading-5 text-gray-900">
                                        {request.purpose}
                                      </div>
                                    </div>
                                  </div>
                                </td>

                                <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-500">
                                  <div className="icon-link flex justify-center gap-x-4">
                                    <Link
                                      to={`/ViewApprovedForm/${request.requestId}`}
                                    >
                                      <Tooltip content="View">
                                        <IconButton variant="text">
                                          <EyeIcon className="h-6 w-6 text-blue-500" />
                                        </IconButton>
                                      </Tooltip>
                                    </Link>
                                  </div>
                                </td>

                                <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-500">
                                  <div className="flex items-center">
                                    <div>
                                      <input
                                        type="checkbox"
                                        checked={selectedRequests.includes(
                                          request.requestId
                                        )}
                                        onChange={() =>
                                          handleCheckboxChange(
                                            request.requestId
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans">
                          <div>
                            <nav className="relative z-0 inline-flex shadow-sm"></nav>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 px-4 py-3 pt-0 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      onClick={handleCloseClick}
                      type="button"
                      className="rounded-md h-10 w-30 ml-3  bg-pink-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      CANCEL
                    </button>

                    <button
                      onClick={handleAddRequestClick}
                      type="submit"
                      className="rounded-md bg-blue-600 h-10 w-30  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      ADD
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};
