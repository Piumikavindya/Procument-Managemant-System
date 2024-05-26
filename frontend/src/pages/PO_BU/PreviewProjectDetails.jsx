import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Button } from "flowbite-react";
import ProjectList from "./ProjectList";

const PreviewProjectDetails = () => {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
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
  };

  return (
    <div>
      {/* <UserList /> */}
      <ProjectList/>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={() => handleOutsideClick()} // Use onClose to handle both closing and navigating
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

export default PreviewProjectDetails;