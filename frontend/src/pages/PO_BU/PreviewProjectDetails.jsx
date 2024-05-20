import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
<<<<<<< HEAD
=======
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
>>>>>>> 68032d0836f8b5717ff0bbef99277c4a89025353
import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Button } from "flowbite-react";
import ProjectList from "./ProjectList";

const PreviewProjectDetails = () => {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
<<<<<<< HEAD
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleOutsideClick = () => {
    setOpen(false);
    navigate("/projectList");
  };

  const [project, setProject] = useState({});

  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/procProject/viewProject/${projectId}`);
        console.log("Project Data:", response.data);
        setProject(response.data);
      } catch (error) {
        console.log("Error fetching project:", error);
      }
    };

    if (projectId) {
      getProject();
    }
  }, [projectId]);

  const handleClose = () => {
    setOpen(false);
    navigate("/projectList");
=======
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();


  const handleOutsideClick = () => {
    setOpen(false);
    navigate("/allusers");
  };

  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
            `http://localhost:8000/user/preview-user/${id}`
        );
        console.log("User Data:", response.data);
        setUser(response.data);
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    getUser();
  }, [id]);

  const handleClose = () => {
    navigate("/allusers");
>>>>>>> 68032d0836f8b5717ff0bbef99277c4a89025353
  };

  return (
    <div>
<<<<<<< HEAD
      <ProjectList />
=======
      {/* <UserList /> */}
      <ProjectList/>
>>>>>>> 68032d0836f8b5717ff0bbef99277c4a89025353
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          initialFocus={cancelButtonRef}
<<<<<<< HEAD
          onClose={handleOutsideClick}
          static
=======
          onClose={() => handleOutsideClick()} // Use onClose to handle both closing and navigating
          static // Add the static prop here
>>>>>>> 68032d0836f8b5717ff0bbef99277c4a89025353
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
            <div>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel>
<<<<<<< HEAD
                  <div className="min-h-screen flex items-center justify-center px-4 mt-12">
                    <div className="max-w-4xl bg-white w-full rounded-lg shadow-xl mt-11 p-12">
                      <div className="p-2 border-b">
                        <h1 className="text-2xl">PROCUREMENT PROJECT DETAILS</h1>
                        <h3 className="text-xl text-brandPrimary">Created Project Details.</h3>
                      </div>
                      <div className="mt-4">
                        <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                          <h6 className="text-gray-600">Project ID :</h6>
                          <p>{project.projectId}</p>
                        </div>
                        <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                          <h6 className="text-gray-600">Project Title :</h6>
                          <p>{project.projectTitle}</p>
                        </div>
                        <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                          <h6 className="text-gray-600">Bidding Type :</h6>
                          <p>{project.biddingType}</p>
                        </div>

                        {/* Iterate over procurementRequests */}
                        {project.procurementRequests && project.procurementRequests.length > 0 && (
                          <div className="p-2 border-b">
                            <h6 className="text-gray-600">Procurement Requests:</h6>
                            {project.procurementRequests.map((request, index) => (
                              <div key={index} className="mt-4">
                                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                                  <h6 className="text-gray-600">Request ID :</h6> 
                                  <p>{request.requestId}</p>
                                </div>
                                {/* Add more procurement request details if needed */}
                                {/* <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                                  <h6 className="text-gray-600">Faculty :</h6>
                                  <p>{request.faculty}</p>
                                </div>
                                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                                  <h6 className="text-gray-600">Department :</h6>
                                  <p>{request.department}</p>
                                </div>
                                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                                  <h6 className="text-gray-600">Date :</h6>
                                  <p>{new Date(request.date).toLocaleDateString()}</p>
                                </div>
                                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                                  <h6 className="text-gray-600">Contact Person :</h6>
                                  <p>{request.contactPerson}</p>
                                </div>
                                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                                  <h6 className="text-gray-600">Contact No :</h6>
                                  <p>{request.contactNo}</p>
                                </div>
                                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                                  <h6 className="text-gray-600">Budget Allocation :</h6>
                                  <p>{request.budgetAllocation}</p>
                                </div>
                                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                                  <h6 className="text-gray-600">Used Amount :</h6>
                                  <p>{request.usedAmount}</p>
                                </div>
                                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                                  <h6 className="text-gray-600">Balance Available :</h6>
                                  <p>{request.balanceAvailable}</p>
                                </div>
                                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                                  <h6 className="text-gray-600">Purpose :</h6>
                                  <p>{request.purpose}</p>
                                </div>
                                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                                  <h6 className="text-gray-600">Send To :</h6>
                                  <p>{request.sendTo}</p>
                                </div> */}

                                {/* Iterate over items */}
                                {request.items && request.items.length > 0 && (
                                  <div className="p-2 border-b mt-2">
                                    <h6 className="text-gray-600">Items:</h6>
                                    {request.items.map((item, itemIndex) => (
                                      <div key={itemIndex} className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                                        <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                                          <h6 className="text-gray-600">Item Name :</h6>
                                          <p>{item.itemName}</p>
                                        </div>
                                        <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                                          <h6 className="text-gray-600">Quantity Required :</h6>
                                          <p>{item.qtyRequired}</p>
                                        </div>
                                        {/* Add more fields if needed */}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="mt-4 flex">
                          <div className="flex flex-1 justify-start"></div>
                          <div className="flex flex-1 justify-end">
                            <Button
                              variant="outlined"
                              className="rounded-md bg-red-600 h-12 w-30 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-600 focus-visible:outline"
                              onClick={handleClose}
                            >
                              CLOSE
                            </Button>
                          </div>
=======
                  <div class="min-h-screen flex items-center justify-center px-4 mt-12">
                    <div class="max-w-4xl  bg-white w-full rounded-lg shadow-xl     mt-11 p-12">
                      <div class="p-2 border-b">
                        <h1 class="text-2xl ">PROCUREMENT PROJECT DETAILS</h1>
                        <h3 class="text-xl text-brandPrimary">
                          Created Project Details.
                        </h3>
                      </div>
                      <div className="mt-4">
                        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                          <h6 class="text-gray-600">Project ID :</h6>
                          <p> RUH_ENG_NCB_2024_001</p>
                        </div>
                        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                          <h6 class="text-gray-600">Project Title :</h6>
                          <p>RUH_ENG_NCB</p>
                        </div>
                        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                          <h6 class="text-gray-600">Bidding Type :</h6>
                          <p>Shopping Method</p>
                        </div>
                        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                          <h6 class="text-gray-600">Requested IDs :</h6>
                          <p>EIE_001, DIE_002, MME_003</p>
                        </div>
                        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                          <h6 class="text-gray-600">Closing Date :</h6>
                          <p>06.07.2024</p>
                        </div>
                        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                          <h6 class="text-gray-600">Closing Time :</h6>
                          <p> 12.00 PM </p>
                        </div>
                        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                          <h6 class="text-gray-600">
                            Appoint Members to TEC :
                          </h6>
                          <p> Chairman, Member_1, Member_2</p>
                        </div>
                        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                          <h6 class="text-gray-600">
                            Appoint Members to Bid Opening Committee :
                          </h6>
                          <p>Chairman, Member_1,  Member_2</p>
                        </div>

                        <div className="flex gap-2 mt-4 justify-end">
                          <Button
                            variant="outlined"
                            className="rounded-md bg-red-600 h-12 w-30 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-600 focus-visible:outline "
                            onClick={() => setOpen(false)}
                            ref={cancelButtonRef}
                          >
                            CLOSE
                          </Button>
>>>>>>> 68032d0836f8b5717ff0bbef99277c4a89025353
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
                {/* Render the PreviewUserCom component here */}
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

<<<<<<< HEAD
export default PreviewProjectDetails;
=======
export default PreviewProjectDetails;
>>>>>>> 68032d0836f8b5717ff0bbef99277c4a89025353
