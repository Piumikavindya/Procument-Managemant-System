import React, { useState, useEffect } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import axios from "axios";

export default function AddSupplier() {
  const [username, setUsername] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [addressStreet, setAddressStreet] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressProvince, setAddressProvince] = useState("");
  const [contactOfficer, setContactOfficer] = useState("");
  const [contactNumbers1, setContactNumbers1] = useState("");
  const [contactNumbers2, setContactNumbers2] = useState("");
  const [emails1, setEmails1] = useState("");
  const [emails2, setEmails2] = useState("");
  const [faxNumber1, setFaxNumber1] = useState("");
  const [faxNumber2, setFaxNumber2] = useState("");
  const [typeofBusiness, setTypesOFBusiness] = useState("");
  const [classOfAssets, setClassOfAssets] = useState("");
  const [loading, setLoading] = useState(false);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const address = `${addressStreet}, ${addressCity}, ${addressProvince}`;
  const contactNumber = `${contactNumbers1}, ${contactNumbers2}`;

  const types = [
    "SoleImporter",
    "SoleDistributor",
    "LocalAgent",
    "contractors",
  ];
  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSaveAddVendors = (e) => {
    e.preventDefault();

    const newSupplyer = {
      username,
      supplierId,
      supplierName,
      address, // pass the concatenated address as a string

      contactOfficer,
      contactNumber: [contactNumbers1, contactNumbers2],
      email: [emails1, emails2],
      faxNumber1,
      faxNumber2,
      typeofBusiness,
      classOfAssets,
    };

    setLoading(true);

    axios
      .post("http://localhost:8000/supplyer/create", newSupplyer)

      .then(() => {
        alert("supplyer added");
        setLoading(false);

        // Reset form fields
        setUsername("");
        setSupplierId("");
        setSupplierName("");

        setContactOfficer("");
        setAddressStreet("");
        setAddressCity("");
        setAddressProvince("");

        setContactOfficer("");
        setContactNumbers1("");
        setContactNumbers2("");
        setEmails1("");
        setEmails2("");
        setFaxNumber1("");
        setFaxNumber2("");
        setTypesOFBusiness("");
        setClassOfAssets("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    console.log(newSupplyer);
  };

  const selected = (crumb) => {
    console.log(crumb);
  };

  return (
    <form onSubmit={handleSaveAddVendors}>
      <div className="space-y-12 ml-40 mr-40 mt-40">
        <Breadcrumb
          crumbs={[
            { label: "Home", link: "/adminhome/:id" },
            { label: "Vendor Details", link: "/allvendors" },

            { label: "Add Vendor Details", link: "/addvendors" },
          ]}
          selected={(crumb) => console.log(`Selected: ${crumb.label}`)}
        />

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className=" text-gray-900">SUPPLIER REGISTRATION.</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900 "
              >
                <h6>User Name</h6>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="given-name"
                  placeholder="Enter the User Name"
                  className="block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                <h6>Supplier ID </h6>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  value={supplierId}
                  onChange={(e) => setSupplierId(e.target.value)}
                  autoComplete="family-name"
                  placeholder="Enter the Supplier ID"
                  className="block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900 "
              >
                <h6>Supplier Name </h6>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  value={supplierName}
                  onChange={(e) => setSupplierName(e.target.value)}
                  autoComplete="given-name"
                  placeholder="Enter the Supplier Name"
                  className="block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                <h6>Contact Officer </h6>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  value={contactOfficer}
                  onChange={(e) => setContactOfficer(e.target.value)}
                  autoComplete="family-name"
                  placeholder="Enter the Contact Officer Name"
                  className="block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                <h6>Address </h6>
              </label>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={addressStreet}
                  onChange={(e) => setAddressStreet(e.target.value)}
                  autoComplete="address-level2"
                  placeholder="Street"
                  className="block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <div className="mt-2">
                <input
                  type="text"
                  name="region"
                  id="region"
                  value={addressCity}
                  onChange={(e) => setAddressCity(e.target.value)}
                  autoComplete="address-level1"
                  placeholder="City"
                  className="block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <div className="mt-2">
                <input
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  value={addressProvince}
                  onChange={(e) => setAddressProvince(e.target.value)}
                  autoComplete="postal-code"
                  placeholder="Province"
                  className="block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                <h6>Fax Numbers </h6>
              </label>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={faxNumber1}
                  onChange={(e) => setFaxNumber1(e.target.value)}
                  autoComplete="address-level2"
                  placeholder="Fax Number 1"
                  className="block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <div className="mt-2">
                <input
                  type="text"
                  name="region"
                  id="region"
                  value={faxNumber2}
                  onChange={(e) => setFaxNumber2(e.target.value)}
                  autoComplete="address-level1"
                  placeholder="Fax Number 2"
                  className="block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                <h6>Contact Numbers </h6>
              </label>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={contactNumbers1}
                  onChange={(e) => setContactNumbers1(e.target.value)}
                  autoComplete="address-level2"
                  placeholder="Contact Number 1"
                  className="block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <div className="mt-2">
                <input
                  type="text"
                  name="region"
                  id="region"
                  value={contactNumbers2}
                  onChange={(e) => setContactNumbers2(e.target.value)}
                  autoComplete="address-level1"
                  placeholder="Contact Number 2"
                  className="block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                <h6>Contact Email Addresses </h6>
              </label>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <div className="mt-2">
                <input
                  type="email"
                  name="city"
                  id="city"
                  value={emails1}
                  onChange={(e) => setEmails1(e.target.value)}
                  autoComplete="address-level2"
                  placeholder="Email address 1"
                  className="block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <div className="mt-2">
                <input
                  type="email"
                  name="region"
                  id="region"
                  value={emails2}
                  onChange={(e) => setEmails2(e.target.value)}
                  autoComplete="address-level1"
                  placeholder="Email address 2"
                  className="block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                <h6>Business Type</h6>
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  value={typeofBusiness}
                  onChange={(e) => setTypesOFBusiness(e.target.value)}
                  name="country"
                  autoComplete="country-name"
                  className="block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
                >
                 <option value="">business Type</option>
                  {types.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                <h6>Class of Assets Supply </h6>
              </label>
              <div className="mt-2">
                <select        
                  id="country"
                  value={classOfAssets}
                  onChange={(e) => setClassOfAssets(e.target.value)}
                  name="country"
                  autoComplete="country-name"
                  className="block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
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
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6 mr-40 mb-10">
        <button
          type="button"
          className="rounded-md  h-12 w-20 bg-pink-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-blue-600  h-12 w-20 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
