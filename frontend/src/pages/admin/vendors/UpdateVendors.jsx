import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import Breadcrumb from "../../../components/Breadcrumb.jsx";

import "../../../styles/button2.css";

const UpdateVendors = () => {
  const [username, setUsername] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [supplierId, setSupplierId] = useState("");

  const [addressNo, setAddressNo] = useState("");
  const [addressStreet, setAddressStreet] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [contactOfficer, setContactOfficer] = useState("");
  const [contactNumbers1, setContactNumbers1] = useState("");
  const [contactNumbers2, setContactNumbers2] = useState("");
  const [emails1, setEmails1] = useState("");
  const [emails2, setEmails2] = useState("");

  const [faxNumber, setFaxNumber] = useState("");
  const [typeofBusiness, setTypesOFBusiness] = useState("");
  const [classOfAssets, setClassOfAssets] = useState("");
  const [loading, setLoading] = useState(false);
  const types = [
    "SoleImporter",
    "SoleDistributor",
    "LocalAgent",
    "contractors",
  ];
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  // React Router Hook to get the parameter from the URL
  const { id } = useParams();

  // Snackbar Hook for displaying notifications
  const { enqueueSnackbar } = useSnackbar();

  // Fetch user data from the API based on the ID
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8000/supplyer/${id}`)
      .then((response) => {
        setUsername(response.data.username);
        setSupplierId(response.data.supplierId);
        setSupplierName(response.data.supplierName);
        setAddressNo(response.data.addressNo);
        setAddressStreet(response.data.addressStreet);
        setAddressLine(response.data.addressLine);

        setContactOfficer(response.data.contactOfficer);
        setContactNumbers1(response.data.contactNumbers1);
        setContactNumbers2(response.data.contactNumbers2);
        setEmails1(response.data.emails1);
        setEmails2(response.data.emails2);
        setFaxNumber(response.data.faxNumber);
        setTypesOFBusiness(response.data.typeofBusiness);
        setClassOfAssets(response.data.classOfAssets);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("An error occurred. Please check the console.", {
          variant: "error",
        });
        console.error(error);
      });
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [id]);

  const handleUpdateVendors = () => {
    const UpdateSupplyer = {
      username,
      supplierId,
      supplierName,
      address: [addressNo, addressStreet, addressLine],
      contactOfficer,
      contactNumbers: [contactNumbers1, contactNumbers2],
      emails: [emails1, emails2],
      faxNumber,
      typeofBusiness,
      classOfAssets,
    };

    setLoading(true);

    axios
      .put(`http://localhost:8000/supplyer/update/${id}`, UpdateSupplyer)
      .then(() => {
        alert("Supplyer Updated");
        // Reset form fields
        setUsername("");
        setSupplierName("");

        setAddressNo("");
        setAddressStreet("");
        setAddressLine("");

        setContactOfficer("");
        setContactNumbers1("");
        setContactNumbers2("");
        setEmails1("");
        setEmails2("");
        setFaxNumber("");
        setTypesOFBusiness("");
        setClassOfAssets("");
        setLoading(false);
        enqueueSnackbar("Vendor is updated successfully", {
          variant: "success",
        });
        navigate("/allvendors");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar(`Error updating vendor account: ${error.message}`, {
          variant: "error",
        });
        console.error(error);
      });
  };
  // React Router Hook for navigation

  const selected = (crumb) => {
    console.log(crumb);
  };

  const navigate = useNavigate();

  return (
    <div class="app-container p-8 rounded border border-gray-200">
      <Breadcrumb
        crumbs={[
          { label: "Home", link: "/adminhome/:id" },
          { label: "Suppliers Data List", link: "/allvendors" },
          { label: "Update Suppliers Details", link: "/addvendors" },
        ]}
        selected={(crumb) => console.log(`Selected: ${crumb.label}`)}
      />
      <h1 class="font-medium text-2xl">Update Suppliers Details</h1>

      <form onSubmit={handleUpdateVendors}>
        <div className="mt-8 grid lg:grid-cols-2 gap-2">
          <div>
            <label
              htmlFor="supplierId"
              className="text-sm text-gray-700 block mb-1 font-medium"
            >
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Update your supplier ID"
            />
          </div>
          {window.innerWidth < 768 ? (
            <div>
              <label
                htmlFor="Supplyer ID and Name"
                className="text-sm text-gray-700 block mb-1 font-medium"
              >
                Supplyer ID and Name
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={supplierId}
                  onChange={(e) => setSupplierId(e.target.value)}
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder="Supplier ID"
                />
                <input
                  type="text"
                  value={supplierName}
                  onChange={(e) => setSupplierName(e.target.value)}
                  className="ml-2 bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder="Supplier name"
                />
              </div>
            </div>
          ) : (
            <>
              <div>
                <label
                  htmlFor="supplierId"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  Supplier ID
                </label>
                <input
                  type="text"
                  value={supplierId}
                  onChange={(e) => setSupplierId(e.target.value)}
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder="Update your supplier ID"
                />
              </div>
            </>
          )}
          <div>
            <label
              htmlFor="supplierName"
              className="text-sm text-gray-700 block mb-1 font-medium"
            >
              Supplier Name
            </label>
            <input
              type="text"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Update supplier name"
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="text-sm text-gray-700 block mb-1 font-medium"
            >
              Address
            </label>
            <div className="grid grid-cols-3 gap-1">
              <input
                type="text"
                value={addressNo}
                onChange={(e) => setAddressNo(e.target.value)}
                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="No"
              />
              <input
                type="text"
                value={addressStreet}
                onChange={(e) => setAddressStreet(e.target.value)}
                className="ml-1 bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="Street"
              />
              <input
                type="text"
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
                className="ml-1 bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="Address Line"
              />
            </div>
          </div>

          {window.innerWidth < 768 ? (
            <div>
              <label
                htmlFor="Supplyer ID and Name"
                className="text-sm text-gray-700 block mb-1 font-medium"
              >
                Contact Officer and Fax Number
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={contactOfficer}
                  onChange={(e) => setContactOfficer(e.target.value)}
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder="Enter your contact officer"
                />
                <input
                  type="text"
                  value={faxNumber}
                  onChange={(e) => setFaxNumber(e.target.value)}
                  className="ml-2 bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder="Enter your fax number"
                />
              </div>
            </div>
          ) : (
            <>
              <div>
                <label
                  htmlFor="contactOfficer"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  Contact Officer
                </label>
                <input
                  type="text"
                  value={contactOfficer}
                  onChange={(e) => setContactOfficer(e.target.value)}
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder="Upadte your contact officer"
                />
              </div>
            </>
          )}
          <div>
            <label
              htmlFor="contact Numbers"
              className="text-sm text-gray-700 block mb-1 font-medium"
            >
              Contact Numbers
            </label>
            <div className="flex">
              <input
                type="text"
                value={contactNumbers1}
                onChange={(e) => setContactNumbers1(e.target.value)}
                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="Contact No 1"
              />
              <input
                type="textr"
                value={contactNumbers2}
                onChange={(e) => setContactNumbers2(e.target.value)}
                className="ml-2 bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="Contact No 2"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="contactEmails"
              className="text-sm text-gray-700 block mb-1 font-medium"
            >
              Contact Emails
            </label>
            <div className="flex">
              <input
                type="email"
                value={emails1}
                onChange={(e) => setEmails1(e.target.value)}
                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="Contact Email 1"
              />
              <input
                type="email"
                value={emails2}
                onChange={(e) => setEmails2(e.target.value)}
                className="ml-2 bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="Contact Email 2"
              />
            </div>
          </div>

          {window.innerWidth < 768 ? (
            <div>
              <label
                htmlFor="typeofBusiness"
                className="text-sm text-gray-700 block mb-1 font-medium"
              >
                Select
              </label>
              <div className="flex">
                <select
                  value={typeofBusiness}
                  onChange={(e) => setTypesOFBusiness(e.target.value)}
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder="Enter your type of business"
                >
                  <option value="">business Type</option>
                  {types.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <select
                  type="text"
                  value={classOfAssets}
                  onChange={(e) => setClassOfAssets(e.target.value)}
                  className="ml-2 bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder="Enter your class of assets"
                >
                  <option value="">Assets Class</option>
                  {types.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            <>
              <div>
                <label
                  htmlFor="rtypeofBusiness"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  Business Type
                </label>
                <select
                  value={typeofBusiness}
                  onChange={(e) => setTypesOFBusiness(e.target.value)}
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder="Update your type of business"
                >
                  <option value="">Update Type</option>
                  {types.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="rclassOfAssets"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  Class of Assets Supplies
                </label>
                <select
                  type="text"
                  value={classOfAssets}
                  onChange={(e) => setClassOfAssets(e.target.value)}
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder="Enter your class of assets"
                >
                  <option value="">Update Type</option>
                  {types.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>

        <div className="space-x-4 mt-8 text-center">
          <button className="button-71" role="button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateVendors;