import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { Button, Textarea } from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";
import ApprovalList from "./ApprovalList";
import axios from "axios";
import { useSnackbar } from "notistack";

const DenyRequest = () => {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleOutsideClick = () => {
    setOpen(false);
    navigate("/ViewForApproval");
  };
 
  const handleOpen = () => setOpen(!open);
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();


  const denyRequest = () => {
     setLoading(true);
     axios
     .delete(`http://localhost:8000/procReqest/deleteRequest/${id}`)
     .then(() => {
      setLoading(false);
      alert("Request is deleted");
       navigate("/ViewForApproval");
    })
    .catch((error) => {
      setLoading(false);
      alert("Error deleting reuest. Try again");
     console.log(error);
    });
    
  };
  
  return (
    <div>
      <ApprovalList />
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-y-auto "
          onClose={() => handleOutsideClick()}
          initialFocus={cancelButtonRef}
        >
          <div className="flex items-center justify-center min-h-screen px-4 py-12 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
            </Transition.Child>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
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
              <div className="mt-5 inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-left sm:mt-0 sm:ml-4">
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <DialogHeader className="grid place-items-center">
                    <Typography variant="h5" color="red" className="text-center">
                      <h4>Approve Purchase Requisition</h4>
                    </Typography>
                  </DialogHeader>
                  <DialogBody divider className="grid place-items-center">
                    <img
                      src="https://www.bitdefender.com/images/Knowledge%20Base%20SMB/admonitions/important.png"
                      alt=""
                      className="max-w-24 h-24  md:max-w-md lg:max-w-24 md:h-24 w-24"
                    ></img>
                   
                    <Typography className="text-center font-normal">
                      <h3>
                        Are you sure want to deny this requset and delete it?
                      </h3>
                    </Typography>

                    <Typography className="text-center font-normal" color="red">
                      <h6>
                      Note: Once you deny the request and delete the requset,
            it cannot be undo!!!
                      </h6>
                    </Typography>
                  </DialogBody>
                  <DialogFooter className="space-x-6">
                    <button
                      type="submit"
                      className="rounded-md bg-green-500 h-12 w-30 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={denyRequest}

                   >
                      <h6 className="mt-2">Yes, Delete it</h6>
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-red-600 h-12 w-30 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={handleOutsideClick}
                    >
                      No, Cancel
                    </button>
                  </DialogFooter>
                </Dialog.Panel>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default  DenyRequest;