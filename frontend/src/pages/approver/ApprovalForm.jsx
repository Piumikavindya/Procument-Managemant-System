import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import {
  DialogBody,
  DialogFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import { Button, Textarea } from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";
import ApprovalList from "./ApprovalList";

const ApprovalForm = () => {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  const navigate = useNavigate();

  const handleOutsideClick = () => {
    setOpen(false);
    navigate("/ViewForApproval");
  };
  // Function to handle approval confirmation
  const handleApproval = () => {
    navigate("/ViewForApproval");
  };

  const handleOpen = () => setOpen(!open);

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
                      <DialogBody>
                        <div className="grid gap-6">
                          <Typography
                            className="-mb-1"
                            color="blue-gray"
                            variant="h6"
                          >
                            Forward request to (enter the official email of the
                            officer):
                          </Typography>
                          <Input label="Email" />
                        </div>

                        <Typography className="mt-4 mb-2" variant="h6">
                          Choose Action:
                        </Typography>
                        <div>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              className="form-radio"
                              name="action"
                            />
                            <span className="ml-2">
                              Approve and Forward to Supply Division
                            </span>
                          </label>
                        </div>
                        <div>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              className="form-radio"
                              name="action"
                            />
                            <span className="ml-2">Approve and Complete</span>
                          </label>
                        </div>
                        <Typography
                          className="mt-4 mb-2 overflow-y-auto"
                          variant="h6"
                        >
                          Comments:
                        </Typography>
                        <Textarea label="Comments" />
                      </DialogBody>
                      <DialogFooter className="space-x-2">
                        <Typography className="mt-4 mb-2" variant="h6">
                          Are you sure to approve?
                        </Typography>
                        <div className="mt-4 flex justify-center">
                          <Button className="mr-2" onClick={handleOutsideClick}>
                            No
                          </Button>
                          <Button onClick={handleApproval}>Yes</Button>
                        </div>
                      </DialogFooter>
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

export default ApprovalForm;
