import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import ItemDetails from "./ItemDetails";
import { DialogBody, DialogFooter, DialogHeader, Typography } from "@material-tailwind/react";




export default function DeleteItems() {


    const [open, setOpen] = useState(true);
    const cancelButtonRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();
  
    const handleDeleteItem = () => {
      setLoading(true);
      axios
        .delete(`http://localhost:8000/item/delete/${id}`)
        .then(() => {
          setLoading(false);
          enqueueSnackbar("Supplier deleted", { variant: "success" });
          navigate("/AllItem");
        })
        .catch((error) => {
          setLoading(false);
          enqueueSnackbar("Error deleting supplier", { variant: "error" });
          console.log(error);
        });
    };
  
    const handleOpen = () => setOpen(!open);

  return (
    <div>
      <ItemDetails/>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
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
                  <DialogHeader className="grid place-items-center">
                    <Typography variant="h5" color="red">
                      <h4>Delete Item Details</h4>
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
                        Are you sure want to delete this Item details?
                      </h3>
                    </Typography>

                    <Typography className="text-center font-normal" color="red">
                      <h6>
                        Note : Once you delete this Item all details of the
                        item will be removed from the system.
                      </h6>
                    </Typography>
                  </DialogBody>
                  <DialogFooter className="space-x-6">
                    <button
                      type="submit"
                      className="rounded-md bg-green-500 h-12 w-30 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={handleDeleteItem}
                    >
                      <h6 className="mt-2">Yes, Delete it</h6>
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-red-600 h-12 w-30 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      No, Cancel
                    </button>
                  </DialogFooter>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
    );
};
