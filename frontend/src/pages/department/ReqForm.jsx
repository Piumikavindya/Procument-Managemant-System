import React, { useState,useEffect} from "react";
import axios from "axios";
import { Link ,useNavigate, } from "react-router-dom";
import Dropdown from "../../components/DropDown";
import "../../styles/Buttons.css";
import "../../styles/button3.css";
import { AddItemCard } from "./AddItemCard ";

const ReqForm = ({ forms }) => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState("");
  const [requestId, setRequestId] = useState("");
  const [department, setDepartment] = useState("");
  const [faculty, setFaculty] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [budgetAllocation, setBudgetAllocation] = useState("");
  const [usedAmount, setUsedAmount] = useState("");
  const [balanceAvailable, setBalanceAvailable] = useState("");
  const [purpose, setPurpose] = useState('normal');
  const [sendTo, setSendTo] = useState('dean');
  const [items, setItems] = useState({});
  const [files, setFiles] = useState({});

  useEffect(() => {
    const formDataFromStorage = localStorage.getItem("formData");
    if (formDataFromStorage) {
      const formData = JSON.parse(formDataFromStorage);
      setRequestId(formData.requestId);
      setDepartment(formData.department);
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
    } else {
      handleGenerateRequestId();
    }
  }, []);

    // Function to handle the generation of request ID
  const handleGenerateRequestId = async () => {
    try {
      console.log("Generate Request ID button clicked");
      const response = await axios.post(`http://localhost:8000/procReqest/generateRequestId`);
      // Assuming the response contains the generated ID
      const generatedId = response.data.requestId;
      setRequestId(generatedId);
    } catch (error) {
      console.error("Error generating request ID", error);
    }
  };
 
  const handleCheckboxClick = (selectedPurpose) => {
    setPurpose(selectedPurpose);
  };

  const handleAddItemsClick = (itemData) => {

    setItems((prevItems) => ({
      ...prevItems,
      [Date.now()]: itemData, // Assuming you want to use a timestamp as the key
    }));
    const formData = {
      requestId,
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
    // Navigate to the specified route when "Add items" is clicked
    // Store form data in localStorage
    localStorage.setItem("formData", JSON.stringify(formData));
    // Navigate to add item page
    navigate(`/formview/${requestId}`);
  };





  // Function to handle form submission


  const handleGeneratePDF = async () => {
    const formData = {
      requestId,
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
  
    try {
      // Check if requestId is defined before proceeding
      if (!formData.requestId) {
        console.error('Error generating PDF: requestId is undefined');
        return;
      }
  
      const pdfResponse = await axios.post(`http://localhost:8000/procReqest/generatePdf/${formData.requestId}`, formData, {
        responseType: 'arraybuffer' // Change response type to 'arraybuffer'
      });
  
      const pdfBlob = new Blob([pdfResponse.data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
  
      // Add a delay before opening the PDF in a new window
      setTimeout(() => {
        window.open(pdfUrl, '_blank');
      }, 1000); // Adjust the delay time as needed
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      requestId,
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
  
      // Update the state or perform any other actions based on the response
      alert("Request submitted successfully");
      setLoading(false);
  
      // Generate PDF after successful form submission
      await handleGeneratePDF(formData);
  
      // Reset form fields
      setRequestId("");
      setDepartment("");
      setDate("");
      setContactPerson("");
      setContactNo("");
      setBudgetAllocation("");
      setUsedAmount("");
      balanceAvailable("");
      setPurpose("normal");
      setSendTo("dean");
  
      localStorage.removeItem("formData");
  
      console.log("Request submitted successfully", createResponse.data);
    } catch (error) {
      console.error("Error submitting request", error);
      console.dir(error);
    }
  };
  

  
  

  return (
    <div className="max-w-6xl mx-auto mt-40 ">
      <div className="block w-full h-auto rounded-md border border-black bg-black py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        <Dropdown />
      </div>

      <div className="border border-black bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={(e) => handleSubmit(e,items)}>
          <div className="space-y-6 ">
            <div className="flex flex-col justify-end space-y-1">
              <div className=" w-1/4 ml-auto block text-sm font-medium leading-6 text-gray-900">
                {/* Box 1 */}
                <div className="border border-black p-2 bg-black text-white">
                <button  type="button"  onClick={handleGenerateRequestId}>Generate Request ID</button>
                </div>
              </div>
              <div className=" w-1/4 ml-auto block text-sm font-medium leading-6 text-gray-900">
                {/* Box 2 */}
               
                <input
  type="text"
  value={requestId}
  onChange={(e) => setRequestId(e.target.value)}
  className="border-2 border-black px-4 py-2 w-full "disabled={true}
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
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="block w-full rounded-md border border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
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
                <table className="min-w-full bg-white shadow-md rounded-xl">
                  <thead>
                    <tr className="bg-blue-gray-100 text-gray-700">
                      <th className="py-3 px-4 text-left">No</th>
                      <th className="py-3 px-4 text-left">
                        Description of the item/items indented to be purchased
                      </th>
                      <th className="py-3 px-4 text-left">
                        Cost (Approximately)
                      </th>
                      <th className="py-3 px-4 text-left">Qty Required</th>
                      <th className="py-3 px-4 text-left">Qty Available</th>
                      <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="text-blue-gray-900">
                    {forms &&
                      forms.map((form, index) => (
                        <tr
                          key={form._id}
                          className="border-b border-blue-gray-200"
                        >
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
                                  {form.itemId}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="border-blue-gray-200">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm leading-5 text-gray-800">
                                  {form.description}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="border-blue-gray-200">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm leading-5 text-gray-800">
                                  {form.cost}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="border-blue-gray-200">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm leading-5 text-gray-800">
                                  {form.qtyRequired}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm leading-5 text-gray-800">
                                  {form.qtyAvailable}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="border-blue-gray-200">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm leading-5 text-gray-800">
                                  {form.actions}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
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
                            id="comments"
                            name="comments"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <label
                            htmlFor="comments"
                            className="font-medium text-gray-900"
                          >
                            Normal
                          </label>
                        </div>
                      </div>
                      <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <input
                            id="purpose"
                            name="purpose"
                            type="checkbox"
                            onClick={() => handleCheckboxClick('normal')}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <label
                            htmlFor="candidates"
                            className="font-medium text-gray-900"
                          >
                            Fast Track
                          </label>
                        </div>
                      </div>
                      <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <input
                            id="purpose"
                            name="purpose"
                            type="checkbox"
                            onClick={() => handleCheckboxClick('Fast Track')}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <label
                            htmlFor="offers"
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
                          id="push-everything"
                          name="sendTo"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="push-everything"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Dean / Registrar / Bursar
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="push-email"
                          name="dean"
                          type="radio"
                          onClick={() => handleCheckboxClick('dean')}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="push-email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Registrar
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="push-nothing"
                          name="push-notifications"
                          type="radio"
                          onClick={() => handleCheckboxClick('registrar')}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="push-nothing"
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
            <button class="button3" type="button">
              <span class="button3__text">Clear Form</span>
              <span class="button3__icon">
                <svg
                  class="svg"
                  height="48"
                  viewBox="0 0 48 48"
                  width="48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M35.3 12.7c-2.89-2.9-6.88-4.7-11.3-4.7-8.84 0-15.98 7.16-15.98 16s7.14 16 15.98 16c7.45 0 13.69-5.1 15.46-12h-4.16c-1.65 4.66-6.07 8-11.3 8-6.63 0-12-5.37-12-12s5.37-12 12-12c3.31 0 6.28 1.38 8.45 3.55l-6.45 6.45h14v-14l-4.7 4.7z"></path>
                  <path d="M0 0h48v48h-48z" fill="none"></path>
                </svg>
              </span>
            </button>
            <button class="button3" type="submit" onClick={(e) => {
    handleSubmit(e);
    handleGeneratePDF();
}}>
              <span class="button3__text">Save Form</span>
              <span class="button3__icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-save w-5 h-5 mr-1"
                >
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
              </span>
            </button>

            <button class="button3" type="button">
              <span class="button3__text">Download</span>
              <span class="button3__icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 35 35"
                  id="bdd05811-e15d-428c-bb53-8661459f9307"
                  data-name="Layer 2"
                  class="svg"
                >
                  <path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"></path>
                  <path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"></path>
                  <path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"></path>
                </svg>
              </span>
            </button>
            <button class="button3" type="button">
              <span class="button3__text">Send</span>
              <span class="button3__icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    fill="currentColor"
                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ReqForm;