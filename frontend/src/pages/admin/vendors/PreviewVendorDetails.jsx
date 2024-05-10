import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Button } from "flowbite-react";
import VendorDetails from "./VendorDetails";



export default function PreviewVendorDetails() {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleOutsideClick = () => {
    setOpen(false);
    navigate("/allvendors");
  };

  const [supplyer, setSupplyer] = useState({});

  useEffect(() => {
    const getSupplyer = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/supplyer/preview-supplyer/${id}`
        );
        console.log("Supllyer Data:", response.data);
        setSupplyer(response.data);
      } catch (error) {
        console.log("Error fetching supplyer:", error);
      }
    };

    getSupplyer();
  }, [id]);

  const handleClose = () => {
    // Navigate to the "alluser" page
    navigate("/allvendors");
  };

  return (
    <div>
      <VendorDetails />
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
                  <div class="min-h-screen flex items-center justify-center px-4 mt-28">
                    <div class="max-w-4xl  bg-white w-full rounded-lg shadow-xl     mt-11 p-12">
                      <div class="p-2 border-b">
                        <h1 class="text-2xl ">VENDOR DETAILS</h1>
                        <h3 class="text-xl text-brandPrimary">
                          Registered Vendor Details.
                        </h3>
                      </div>
                      <div className="mt-4">
                        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                          <h6 class="text-gray-600">User Name</h6>
                          <p> {supplyer.username}</p>
                        </div>
                        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                          <h6 class="text-gray-600">Supplier ID</h6>
                          <p>{supplyer.supplierId}</p>
                        </div>
                        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                          <h6 class="text-gray-600">Supplier Name</h6>
                          <p>{supplyer.supplierName}</p>
                        </div>
                        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                          <h6 class="text-gray-600">Address</h6>
                          <p>{supplyer.address}</p>
                        </div>
                        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                          <h6 class="text-gray-600">Contact Officer</h6>
                          <p>{supplyer.contactOfficer}</p>
                        </div>
                        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                          <h6 class="text-gray-600">Contact Number</h6>
                          <p>
                            {supplyer.contactNumber &&
                              Array.isArray(supplyer.contactNumber) &&
                              supplyer.contactNumber.map((number, index) => (
                                <div
                                  key={index}
                                  class="text-sm leading-5 text-gray-800"
                                >
                                  <h6>{number}</h6>
                                </div>
                              ))}
                          </p>
                        </div>
                        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                          <h6 class="text-gray-600">Contact Emails</h6>
                          <p>
                            {supplyer.email &&
                              Array.isArray(supplyer.email) &&
                              supplyer.email.map((email, index) => (
                                <div
                                  key={index}
                                  class="text-sm leading-5 text-gray-800"
                                >
                                  <h6>{email}</h6>
                                </div>
                              ))}
                          </p>
                        </div>
                        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                          <h6 class="text-gray-600">Fax Numbers</h6>
                          <p>
                            {" "}
                            {supplyer.faxNumber1}, {supplyer.faxNumber2}{" "}
                          </p>
                        </div>
                        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                          <h6 class="text-gray-600">Business Type</h6>
                          <p> {supplyer.typeofBusiness}</p>
                        </div>
                        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                          <h6 class="text-gray-600">
                            Class of Assets Supplies
                          </h6>
                          <p> {supplyer.classOfAssets}</p>
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
}
