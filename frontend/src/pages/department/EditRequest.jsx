import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "../../components/DropDown";
import { saveAs } from "file-saver";
import { AddItemCard } from "./AddItemCard ";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { Breadcrumb } from "flowbite-react";
import UserTypeNavbar from "../../components/UserTypeNavbar";

const EditRequest = ({ forms }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showAddItemCard, setShowAddItemCard] = useState(false);

  const [date, setDate] = useState("");
  const [requestId, setRequestId] = useState("");
  const [department, setDepartment] = useState("");
  const [faculty, setFaculty] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [budgetAllocation, setBudgetAllocation] = useState("");
  const [usedAmount, setUsedAmount] = useState("");
  const [balanceAvailable, setBalanceAvailable] = useState("");
  const [purpose, setPurpose] = useState("Normal");
  const [sendTo, setSendTo] = useState("Dean");
  const [items, setItems] = useState({});
  const [files, setFiles] = useState({});
  const departments = ["DCEE", "DEIE", "MENA", "MME", "IS", "NONE"];

  useEffect(() => {
    const formDataFromStorage = localStorage.getItem("formData");
    if (formDataFromStorage) {
      const formData = JSON.parse(formDataFromStorage);
      setRequestId(formData.requestId);
      setDepartment(formData.department);
      setFaculty(formData.faculty);
      setDate(formData.date);
      setContactPerson(formData.contactPerson);
      setContactNo(formData.contactNo);
      setBudgetAllocation(formData.budgetAllocation);
      setUsedAmount(formData.usedAmount);
      setBalanceAvailable(formData.balanceAvailable);
      setPurpose(formData.purpose);
      setSendTo(formData.sendTo);
      setItems(formData.items);
      setFiles(formData.files);
    } else if (!requestId) {
    }
  }, []);

  useEffect(() => {
    handleViewProcItems();
  }, [requestId]);

  const handleAddItemsClick = (itemData) => {
    setShowAddItemCard(true);
    setItems((prevItems) => ({
      ...prevItems,
      [Date.now()]: itemData,
    }));

    const formData = {
      requestId,
      faculty,
      department,
      date,
      contactPerson,
      contactNo,
      budgetAllocation,
      usedAmount,
      balanceAvailable,
      purpose,
      sendTo,
      items,
      files,
    };
    setLoading(true);
    try {
      // Fetch updated items after submitting the form
    } catch (error) {
      console.error("Error submitting request", error);
      console.dir(error);
    }
    // Navigate to the specified route after updating items
    navigate(`/formview/${requestId}`);

    // Store form data in localStorage
    localStorage.setItem("formData", JSON.stringify(formData));
  };

  const handleViewProcItems = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/procReqest/viewProcItems/${requestId}`
      );
      const itemsData = response.data;
      setItems((prevItems) => ({
        ...prevItems,
        ...itemsData, // Merge the existing items with the new data
      }));
    } catch (error) {
      console.error("Error fetching procurement items:", error);
    }
  };

  const handleGeneratePDF = async () => {
    const data = {
      requestId,
      department,
      date,
      faculty,
      contactPerson,
      contactNo,
      budgetAllocation,
      usedAmount,
      balanceAvailable,
      purpose,
      sendTo,
      items,
      files,
    };

    try {
      // Create PDF
      await axios.post("http://localhost:8000/createPdf", data);

      // Fetching the generated PDF
      const response = await axios.get("http://localhost:8000/fetchPdf", {
        responseType: "blob",
      });
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      saveAs(pdfBlob, "InvoiceDocument.pdf");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // Function to handle form submission

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      requestId,
      faculty,
      department,
      date,
      contactPerson,
      contactNo,
      budgetAllocation,
      usedAmount,
      balanceAvailable,
      purpose,
      sendTo,
      items,
      files,
    };
    const newRequest = {
      requestId,
      faculty,
      department,
      date,
      contactPerson,
      contactNo,
      budgetAllocation,
      usedAmount,
      balanceAvailable,
      purpose,
      sendTo,
      items,
      files,
    };
    setLoading(true);
    try {
      const createResponse = await axios.post(
        `http://localhost:8000/procReqest/createRequest/${requestId}`,
        newRequest
      );
      const updatedRequest = createResponse.data.updatedRequest;
      alert("Request submitted successfully");
      setLoading(false);

      setRequestId("");
      setFaculty("");
      setDepartment("");
      setDate("");
      setContactPerson("");
      setContactNo("");
      setBudgetAllocation("");
      setUsedAmount("");
      setBalanceAvailable("");
      setPurpose("normal");
      setSendTo("dean");
      setItems({});
      setFiles({});
      localStorage.removeItem("formData");
      console.log("Request submitted successfully", createResponse.data);
    } catch (error) {
      console.error("Error submitting request", error);
      console.dir(error);
    }
  };

  return (
    <div>
      <UserTypeNavbar userType="department" />

      <div className="max-w-6xl mx-auto mt-40 ">
        <div className="block w-full h-auto rounded-md border border-black bg-black py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          <Dropdown />
        </div>

        <div className="border border-black bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={(e) => handleSubmit(e, items)}>
            <div className="space-y-6 ">
              <div className="flex flex-col justify-end space-y-1">
                <div className=" w-1/4 ml-auto block text-sm font-medium leading-6 text-gray-900">
                  {/* Box 1 */}
                  <div className="border border-black p-2 bg-black text-white">
                    <button type="button">Generate Request ID</button>
                  </div>
                </div>
                <div className=" w-1/4 ml-auto block text-sm font-medium leading-6 text-gray-900">
                  {/* Box 2 */}

                  <input
                    type="text"
                    value={requestId}
                    onChange={(e) => setRequestId(e.target.value)}
                    className="border-2 border-black px-4 py-2 w-full "
                    disabled={true}
                  />
                </div>
                <div className=" w-1/4 ml-auto block text-sm font-medium leading-6 text-gray-900">
                  {/* Box 3 */}
                  {/* Content for Box 3 */}
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border-2 border-black px-4 py-2  w-full "
                  />
                </div>
              </div>

              <div className="border-b border-gray-900/10 pb-12 ">
                <h2 className="text-base font-bold leading-7 text-gray-900">
                  User Details
                </h2>
                {/* New boxes added here */}

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Faculty/Admin :
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        value={faculty}
                        onChange={(e) => setFaculty(e.target.value)}
                        className="block w-full rounded-md border border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Department/Branch :
                    </label>
                    <div className="mt-2">
                      <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="block w-full rounded-md border border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        <option value="">Select your department</option>
                        {departments.map((type, index) => (
                          <option key={index} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Contact Person :
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        value={contactPerson}
                        onChange={(e) => setContactPerson(e.target.value)}
                        className="block w-full rounded-md border border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Telephone No :
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        value={contactNo}
                        onChange={(e) => setContactNo(e.target.value)}
                        autoComplete="family-name"
                        className="block w-full rounded-md border border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-bold leading-7 text-gray-900">
                  Annual Budget Details
                </h2>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Budget Allocation :
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="number"
                          value={budgetAllocation}
                          onChange={(e) => setBudgetAllocation(e.target.value)}
                          className="block w-full rounded-md border border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Used Amount So far :
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="text"
                          value={usedAmount}
                          onChange={(e) => setUsedAmount(e.target.value)}
                          className="block w-full rounded-md border border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Balance Available :
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="text"
                          value={balanceAvailable}
                          onChange={(e) => setBalanceAvailable(e.target.value)}
                          className="block w-full rounded-md border border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Please check your available balance here before request to
                  purchasing items.
                </p>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold leading-7 text-gray-900">
                    Requesting Item Details
                  </h2>

                  <button type="button" onClick={handleAddItemsClick}>
                    <span className="c-main">
                      <span className="c-ico">
                        <span className="c-blur"></span>{" "}
                        <span className="ico-text">+</span>
                      </span>
                      Add items
                    </span>
                  </button>
                </div>

                <div className="flex items-center">
                  <table
                    key={Object.keys(items).length}
                    className="min-w-full bg-white shadow-md rounded-xl"
                  >
                    <thead>
                      <tr className="bg-blue-gray-100 text-gray-700">
                        <th className="py-3 px-4 text-left">No</th>
                        <th className="py-3 px-4 text-left">Item Id</th>
                        <th className="py-3 px-4 text-left">Description</th>
                        <th className="py-3 px-4 text-left">
                          Cost (Approximately)
                        </th>
                        <th className="py-3 px-4 text-left">Qty Required</th>
                        <th className="py-3 px-4 text-left">Qty Available</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                      </tr>
                    </thead>

                    <tbody className="text-blue-gray-900">
                      {Object.entries(items).map(([key, item], index) => (
                        <tr key={key} className="border-b border-blue-gray-200">
                          <td className="border-blue-gray-200">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm leading-5 text-gray-800">
                                  {index + 1}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="border-blue-gray-200">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm leading-5 text-gray-800">
                                  {item.itemId}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="border-blue-gray-200">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm leading-5 text-gray-800">
                                  {item.itemName}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="border-blue-gray-200">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm leading-5 text-gray-800">
                                  {item.cost}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="border-blue-gray-200">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm leading-5 text-gray-800">
                                  {item.qtyRequired}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="border-blue-gray-200">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm leading-5 text-gray-800">
                                  {item.qtyAvailable}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="border-blue-gray-200">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm leading-5 text-gray-800">
                                  <div className="icon-link flex justify-center gap-x-4">
                                    {/* <Link to={/updatevendor/${item._id}}>
                      <AiOutlineEdit className="text-2xl text-blue-800 " />
                    </Link> */}
                                    <Link
                                      to={`/DeleteItem/${requestId}/${item.itemId}`}
                                    >
                                      <MdOutlineDelete className="text-2xl text-red-500" />
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {showAddItemCard && (
                  <AddItemCard
                    handleAddItemsClick={handleAddItemsClick}
                    handleViewProcItems={handleViewProcItems}
                  />
                )}
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-bold leading-7 text-gray-900">
                  Purpose
                </h2>

                <div className="mt-10 flex space-x-28">
                  <div className="flex-1 space-x-20">
                    <fieldset>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Select methods:{" "}
                      </p>
                      <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="normal"
                              name="purpose"
                              type="radio"
                              value="Normal"
                              checked={purpose === "Normal"}
                              onChange={() => setPurpose("Normal")}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="normal"
                              className="font-medium text-gray-900"
                            >
                              Normal
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="fastTrack"
                              name="purpose"
                              type="radio"
                              value="Fast Track"
                              checked={purpose === "Fast Track"}
                              onChange={() => setPurpose("Fast Track")}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="fastTrack"
                              className="font-medium text-gray-900"
                            >
                              Fast Track
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="urgent"
                              name="purpose"
                              type="radio"
                              value="Urgent"
                              checked={purpose === "Urgent"}
                              onChange={() => setPurpose("Urgent")}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="urgent"
                              className="font-medium text-gray-900"
                            >
                              Urgent
                            </label>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  <div className="flex-1 space-x-16  ">
                    <div className="col-span-full">
                      <label
                        htmlFor="about"
                        className="mt-1 text-sm leading-6 text-gray-600"
                      >
                        If Urgent Provide The Justification :
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="about"
                          name="about"
                          rows={3}
                          className="block w-full md:w-96 rounded-md border border-black py-10.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          defaultValue={""}
                        />
                      </div>

                      <div class="mb-3">
                        <label
                          for="formFileMultiple"
                          class="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                        >
                          Attach Specifications
                        </label>
                        <input
                          class="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                          type="file"
                          id="formFileMultiple"
                          multiple
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 space-x-4">
                    <fieldset>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Send the request To{" "}
                      </p>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            id="dean"
                            name="sendTo"
                            type="radio"
                            value="dean"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="dean"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Dean / Registrar / Bursar
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="registrar"
                            name="sendTo"
                            type="radio"
                            value="registrar"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="registrar"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Registrar
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="viceChancellor"
                            name="sendTo"
                            type="radio"
                            value="viceChancellor"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="viceChancellor"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Vice Chancellor
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-end gap-x-6">
              <button
                className="bg-green-600 hover:bg-green-700 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                type="submit"
                onClick={(e) => {
                  handleSubmit(e);
                  handleGeneratePDF();
                }}
              >
                <span>Submit, Download & Send</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default EditRequest;
