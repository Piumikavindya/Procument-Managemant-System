import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import ManageGiidance from "./ManageGuidance ";
import ManageGuidance from "./ManageGuidance ";

const DeleteGuidance = () => {
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const handleDeleteGuidance = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:8000/guidance/delete/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("guidance deleted", { variant: "success" });
        navigate(`/ManageGuidance/${id}`);
        console.log("guidance deleted succesfully");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error deleting guidance", { variant: "error" });
        console.log(error);
      });
  };

  const handleCancel = () => {
    setOpen(false);
    navigate(`/ManageGuidance/${id}`);
  };
  return (
    <div>
      <ManageGuidance />
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() => setOpen(false)}
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <div className="mx-auto flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <ExclamationTriangleIcon
                            className="h-24 w-24 text-red-600"
                            aria-hidden="true"
                          />
                        </div>
                        <Dialog.Title
                          as="h1"
                          className="text-3xl font-bold leading-6 text-black-500"
                        >
                          Are you sure?
                        </Dialog.Title>

                        <div className="mt-2">
                          <p className="text-xl text-black">
                          Are you sure want to delete this guidance document?                            
                            <br />
                            <span className="text-red-500">
                            
                              Note : Once you delete this guidance document 

                              it will be permanently deleted from database!!{" "}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
                    <button
                     type="submit"
                      className="rounded-md bg-green-500 h-12 w-30 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={handleDeleteGuidance}
                    >
                      <h6 className="mt-2">Yes, Delete it</h6>
                      </button>
                    <button
                      type="button"
                      className="rounded-md bg-red-600 h-12 w-30 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={handleCancel}
                      ref={cancelButtonRef}
                    >
                      No, Cancel
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
export default DeleteGuidance;