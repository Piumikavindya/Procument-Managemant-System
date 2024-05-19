import { Fragment, useRef, useState } from "react";
import { Dialog,Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import ReqForm from "./ReqForm";




const DeleteProcItem = () => {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { requestId } = useParams();
  const { itemId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
 

  useEffect(() => {
    handleDeleteItem();
  }, [requestId]);


  const handleDeleteItem = () => {

    setLoading(true);
    axios
      .delete(`http://localhost:8000/procReqest/deleteProcItem/${requestId}/${itemId}`)
      .then((response) => {
        setLoading(false);
        
        enqueueSnackbar("Item deleted", { variant: "success" });
        navigate(`/reqform`);
    
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error deleting item", { variant: "error" });
        console.log(error);
      });
  };
  
  const handleOutsideClick = () => {
    setOpen(false);
    navigate(`/reqform`);
  };


  return (
    <div>
  <ReqForm/>
      <Transition.Root show={open} as={Fragment}>
      <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={() => handleOutsideClick()} // Use onClose to handle both closing and navigating
          static // Add the static prop here
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="mt-2">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Delete Procurement Item
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this proc item? All of
                        your data will be permanently removed. This action
                        cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={handleDeleteItem}
                  >
                    Delete
                  </button>
                 
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default DeleteProcItem;