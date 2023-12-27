import React, { useState } from "react";
import axios from "axios";
import Spinner from "../../../components/Spinner";
import "../../../styles/Scroller.css";
import "../../../styles/button.css";
import "../../../styles/button2.css";
import Breadcrumb from "../../../components/Breadcrumb.jsx";

const AddVendors = () => {
  const [username, setUsername] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [address, setAddress] = useState("");
  const [contactOfficer, setContactOfficer] = useState("");
  const [contactNumbers, setContactNumbers] = useState([""]);
  const [emails, setEmails] = useState([""]);
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

  const handleSaveAddVendors = (e) => {
    e.preventDefault();

    const newSupplyer = {
      username,
      supplierId,
      supplierName,
      address,
      contactOfficer,
      contactNumbers,
      emails,
      faxNumber,
      typeofBusiness,
      classOfAssets,
    };

    setLoading(true);

    axios
      .post("http://localhost:8000/supplyer/create", newSupplyer)

      .then(() => {
        alert("user added");
        setLoading(false);

        // Reset form fields
        setUsername("");
        setSupplierId("");
        setSupplierName("");
        setAddress("");
        setContactOfficer("");
        setContactNumbers([""]);
        setEmails([""]);
        setFaxNumber("");
        setTypesOFBusiness("");
        setClassOfAssets("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    console.log(newSupplyer);
  };

  const handleContactNumberChange = (index, value) => {
    const newContactNumbers = [...contactNumbers];
    newContactNumbers[index] = value;
    setContactNumbers(newContactNumbers);
  };
  const removeContactNumberField = (index) => {
    const newContactNumbers = [...contactNumbers];
    newContactNumbers.splice(index, 1);
    setContactNumbers(newContactNumbers);
  };
  const addContactNumberField = () => {
    if (contactNumbers.length < 2) {
      setContactNumbers([...contactNumbers, ""]);
    }
  };

  const handleEmailChange = (index, value) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };
  const removeEmailField = (index) => {
    const newEmails = [...emails];
    newEmails.splice(index, 1);
    setEmails(newEmails);
  };

  const addEmailField = () => {
    if (emails.length < 2) {
      setEmails([...emails, ""]);
    }
  };

  const selected = (crumb) => {
    console.log(crumb);
  };

  return (
    <div className="app-container p-8 rounded border border-gray-200">
      <Breadcrumb
        crumbs={[
          { label: "Home", link: "/adminhome/:id" },
          { label: "Suppliers Data List", link: "/allvendors" },
          { label: "Supplier Registatrion", link: "/addvendors" },
        ]}
        selected={(crumb) => console.log(`Selected: ${crumb.label}`)}
      />

      <h1 className="font-medium text-3xl">Supplier Registration</h1>
      {loading && <Spinner />}

      <form onSubmit={handleSaveAddVendors}>
        <div className="mt-8 grid lg:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="contactOfficer"
              className="text-sm text-gray-700 block mb-1 font-medium"
            >
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter your contact officer"
            />
          </div>
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
              placeholder="Enter your supplier ID"
            />
          </div>
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
              placeholder="Enter supplier name"
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="text-sm text-gray-700 block mb-1 font-medium"
            >
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter your address"
            />
          </div>
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
              placeholder="Enter your contact officer"
            />
          </div>
          <div>
            <label
              htmlFor="faxNumber"
              className="text-sm text-gray-700 block mb-1 font-medium"
            >
              Fax Number
            </label>
            <input
              type="text"
              value={faxNumber}
              onChange={(e) => setFaxNumber(e.target.value)}
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter your fax number"
            />
          </div>
          <div>
            <label
              htmlFor="contactNumber"
              className="text-sm text-gray-700 block mb-1 font-medium"
            >
              Contact Numbers
            </label>
            {contactNumbers.map((number, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  value={number}
                  onChange={(e) =>
                    handleContactNumberChange(index, e.target.value)
                  }
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder={`Enter contact number ${index + 1}`}
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeContactNumberField(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    -
                  </button>
                )}
              </div>
            ))}
            {contactNumbers.length < 2 && (
              <button
                type="button"
                onClick={addContactNumberField}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                +
              </button>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-sm text-gray-700 block mb-1 font-medium"
            >
              Contact Email
            </label>
            {emails.map((email, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(index, e.target.value)}
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder={`Enter email address ${index + 1}`}
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeEmailField(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    -
                  </button>
                )}
              </div>
            ))}
            {emails.length < 2 && (
              <button
                type="button"
                onClick={addEmailField}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                +
              </button>
            )}
          </div>
      
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
              placeholder="Enter your type of business"
            >
              <option value="">Select Type</option>
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
              <option value="">Select Type</option>
              {types.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
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

export default AddVendors;
