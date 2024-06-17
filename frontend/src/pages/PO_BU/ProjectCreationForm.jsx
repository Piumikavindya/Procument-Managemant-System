import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import UserTypeNavbar from "../../components/UserTypeNavbar";
import { Button, IconButton, Tooltip } from "@material-tailwind/react";
import {
  EyeDropperIcon,
  EyeIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { AiFillPlusCircle } from "react-icons/ai";
import { AddReqCard } from "./AddItemCard";

export default function ProjectCreationForm({ forms }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showAddRequestCard, setShowAddRequestCard] = useState(false);
  const [requests, setRequests] = useState([]);
  const [searchOption, setSearchOption] = useState("requestId");
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState({});
  const [projectId, setProjectId] = useState("");
  const [selectedRequests, setSelectedRequests] = "";
  const [formData, setFormData] = useState({
    projectId: "",
    procurementRequests: [],
    projectTitle: "",
    biddingType: "",
    closingDate: "",
    closingTime: "",
    appointTEC: [],
    appointBOCommite: [],
  });
  const [procurementRequests, setProcurementRequests] = useState([]);
  const [projectTitle, setProjectTitle] = useState("");
  const [biddingType, setBiddingType] = useState("");
  const [closingDate, setClosingDate] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [appointTEC, setAppointTEC] = useState([]);
  const [appointBOCommite, setAppointBOCommite] = useState([]);
  const [projectCreated, setProjectCreated] = useState(false);
  const biddingTypes = ["Direct Purchasing", "Shopping Method"];

  useEffect(() => {
    const formDataFromStorage = localStorage.getItem("formData");
    if (formDataFromStorage) {
      const savedFormData = JSON.parse(formDataFromStorage);
      setFormData(savedFormData);
      setProjectId(savedFormData.projectId);
    } else {
      handleGenerateProjectId();
    }
  }, []);

  useEffect(() => {
    handleViewRequest();
  }, [projectId]);

  const handleGenerateProjectId = async () => {
    try {
      console.log("Generate Project ID button clicked");
      const response = await axios.get(
        `http://localhost:8000/procProject/generateProjectId`
      );
      const generatedId = response.data.projectId;
      setProjectId(generatedId);
    } catch (error) {
      console.error("Error generating project ID", error);
    }
  };

  const handleAddRequestClick = (requestData) => {
    setShowAddRequestCard(true);
    setRequests((prevRequests) => [...prevRequests, requestData]);
    const formData = {
      projectId,
      procurementRequests,
      projectTitle,
      biddingType,
      closingDate,
      closingTime,
      appointTEC,
      appointBOCommite,
    };
    setLoading(true);
    try {
      // Fetch updated items after submitting the form
    } catch (error) {
      console.error("Error submitting project", error);
      console.dir(error);
    }
    navigate(`/ReqSelection/${projectId}`);
    localStorage.setItem("formData", JSON.stringify(formData));
  };

  const handleViewRequest = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/procProject/viewAddedRequests/${projectId}`
      );
      const requestData = response.data;

      setRequests(requestData);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const handleGenerateShoppingMethodPdf = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/procProject/createNationalShoppingPdf",
        formData
      );
      console.log("Shopping Method PDF created successfully", response.data);
      clearFormInputs();
    } catch (error) {
      console.error("Error generating Shopping Method PDF:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleGenerateDirectPurchasingPdf = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/procProject/createPdf",
        formData
      );
      console.log("Direct Purchasing PDF created successfully", response.data);
      clearFormInputs();
    } catch (error) {
      console.error("Error generating Direct Purchasing PDF:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      projectId,
      procurementRequests,
      projectTitle,
      biddingType,
      closingDate,
      closingTime,
      appointTEC,
      appointBOCommite,
    };
    const newProject = {
      projectId,
      procurementRequests,
      projectTitle,
      biddingType,
      closingDate,
      closingTime,
      appointTEC,
      appointBOCommite,
    };

    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8000/procProject/createProject/${projectId}`,
        newProject
      );
      const updatedProject = response.data.updatedProject;
      console.log("Project created:", response.data);
      alert("Project created successfully");
      setLoading(false);

      setFormData("");
      clearFormInputs();
      localStorage.removeItem("formData");
      console.log("Request submitted successfully", response.data);
      navigateToViewProject();
    } catch (error) {
      console.error("Error creating project:", error);
    } finally {
      setLoading(false);
    }
  };

  const navigateToViewProject = () => {
    if (formData.biddingType === "Shopping Method")
      navigate(`/ViewShoppingPdf/${projectId}`);
    else navigate(`/ViewDirectPurchasingPdf/${projectId}`);
  };

  const clearFormInputs = () => {
    setFormData({
      projectId: "",
      projectTitle: "",
      biddingType: "",
      closingDate: "",
      closingTime: "",
      appointTEC: [],
      appointBOCommite: [],
    });
    setRequests([]);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const filteredRequests = requests.filter((request) =>
    request[searchOption].toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <form onSubmit={(e) => handleFormSubmit(e, requests)}>
      <div className="space-y-12 ml-40 mr-40 mt-40">
        <UserTypeNavbar userType="procurement Officer" />

        <Breadcrumb
          crumbs={[
            { label: "Home", link: "/PO_BuHome/:id" },
            { label: "Procurement Project List", link: "/projectList" },

            { label: "Project Form Creation", link: "/addUsers" },
          ]}
          selected={(crumb) => console.log(`Selected: ${crumb.label}`)}
        />

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-gray-900">CREATE PROCUREMENT PROJECT</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Button
                className="flex items-center gap-3 h-10 bg-NeutralBlack"
                size="sm"
                onClick={handleGenerateProjectId}
              >
                <p className="mt-3">Generate Project ID</p>
              </Button>
              <div className="mt-0">
                <input
                  type="text"
                  value={projectId}
                  name="first-name"
                  onChange={(e) => setProjectId(e.target.value)}
                  id="first-name"
                  disabled={true}
                  className="block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                <h5> Project Title</h5>
              </label>
              <div className="mt-4">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  placeholder="Enter the Project Title"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <div className="sm:col-span-4 mt-2">
                <label
                  htmlFor="closingDate"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  <h5>Closing Date & Time</h5>
                </label>
                <input
                  type="date"
                  className="mr-6 
                rounded"
                  value={closingDate}
                  onChange={(e) => setClosingDate(e.target.value)}
                ></input>
                <input type="time" className="rounded"></input>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                <h5> Select the Bidding Type</h5>
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  value={biddingType}
                  onChange={(e) => setBiddingType(e.target.value)}
                  className="block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
                >
                  {biddingTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}{" "}
                  <option value="">Select method</option>
                </select>
              </div>
            </div>
          </div>
          <div className="border-b border-gray-900/10 pb-12">
            <legend className="text-sm font-semibold leading-6 text-gray-900 mt-10">
              <h5>Add the Requests into Projects</h5>
            </legend>

            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <button onClick={handleAddRequestClick} class="button">
                <span className="c-main">
                  <span className="c-ico">
                    <span className="c-blur"></span>{" "}
                    <span className="ico-text">+</span>
                  </span>
                  Add Requests
                </span>
              </button>
            </div>

            <div className="mt-6 space-y-6 sm:col-span-3">
              <div className="align-middle inline-block min-w-full overflow-hidden bg-white shadow-dashboard pt-3 rounded-bl-lg rounded-br-lg">
                <table
                  className="min-w-full"
                  key={Object.keys(requests).length}
                >
                  <thead className="text-xs text-white uppercase bg-NeutralBlack">
                    <tr>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">
                        No
                      </th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">
                        Request ID
                      </th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">
                        Department
                      </th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">
                        Purpose
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {filteredRequests.map((request, index) => (
                      <tr key={request.requestId} className="reservation-row">
                        <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-500">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm leading-5 text-gray-900">
                                {index + 1}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-500">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm leading-5 text-gray-900">
                                {request.requestId}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-500">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm leading-5 text-gray-900">
                                {request.department}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-500">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm leading-5 text-gray-900">
                                {request.purpose}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {showAddRequestCard && (
                  <AddReqCard
                    handleAddRequestClick={handleAddRequestClick}
                    handleViewRequest={handleViewRequest}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <fieldset>
                <legend className="text-sm mt-10 font-semibold leading-6 text-gray-900">
                  <h5>Appoint Members to TEC</h5>
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-5 w-5 rounded border-gray-500 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-900"
                      >
                        <h6>Chairman</h6>
                      </label>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="h-5 w-5 rounded border-gray-500 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="candidates"
                        className="font-medium text-gray-900"
                      >
                        <h6>member2</h6>
                      </label>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="h-5 w-5 rounded border-gray-500 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="offers"
                        className="font-medium text-gray-900"
                      >
                        <h6>member3</h6>
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>

            <div className="sm:col-span-3">
              <fieldset>
                <legend className="text-sm mt-10 font-semibold leading-6 text-gray-900">
                  <h5>Appoint Members to Bid Opening Committee</h5>
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-5 w-5 rounded border-gray-500 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-900"
                      >
                        <h6>Chairman</h6>
                      </label>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="h-5 w-5 rounded border-gray-500 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="candidates"
                        className="font-medium text-gray-900"
                      >
                        <h6>member2</h6>
                      </label>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="h-5 w-5 rounded border-gray-500 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="offers"
                        className="font-medium text-gray-900"
                      >
                        <h6>member3</h6>
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6 mr-40 mb-10">
        <Link to="">
          <button
            type="button"
            className="rounded-md h-14 w-30 bg-pink-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            CLEAR FORM
          </button>
        </Link>
        {formData.biddingType === "Shopping Method" ? (

        <button
          type="submit"
          className="rounded-md bg-blue-600 h-14 w-30 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={(e) => {
            handleFormSubmit(e);
            handleGenerateShoppingMethodPdf();
          }}
        >
          CREATE PROJECT
        </button>
         ) : (
          <button
          type="submit"
          className="rounded-md bg-blue-600 h-14 w-30 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={(e) => {
            handleFormSubmit(e);
            handleGenerateDirectPurchasingPdf();
          }}
        >
          CREATE PROJECT
        </button>
        )}
      </div>
    </form>
  );
}
