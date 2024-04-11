import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";

import UserTypeNavbar from "../../components/UserTypeNavbar";
import { Button } from "@material-tailwind/react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { AiFillPlusCircle } from "react-icons/ai";

export default function ProjectCreationForm() {
  const [showAddItemCard, setShowAddItemCard] = useState(false);
  const [items, setItems] = useState({});
  const handleAddItemsClick = (itemData) => {
    setShowAddItemCard(true);
    setItems((prevItems) => ({
      ...prevItems,
      [Date.now()]: itemData,
    }));
  };
  return (
    <form>
      <div className="space-y-12 ml-40 mr-40 mt-40">
        <UserTypeNavbar userType="procurement Officer" />


        <Breadcrumb
          crumbs={[
            { label: "Home", link: "/PO_BuHome/:id" },
            { label: "Procurement Project List", link: "/CreatedProjects" },

            { label: "Project Form Creation", link: "/addUsers" },
          ]}
          selected={(crumb) => console.log(`Selected: ${crumb.label}`)}
        />

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-gray-900">CREATE PROCUREMENT PROJECT</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900 "
              >
                <h5> Project ID </h5>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  placeholder="Enter the Project ID"
                  className="block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  placeholder="Enter the Project Title"
                  className="block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                <h5>Add the Requests into Projects</h5>
              </legend>

              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button
                  className="flex items-center gap-3 h-10 bg-NeutralBlack"
                  size="sm"
                  onclick="popuphandler(true)"
                >
                  <AiFillPlusCircle strokeWidth={2} className="h-5 w-5" />
                  <Link
                    to={"/ReqSelection/:${procId}"}
                    class="text-white"
                    style={{ textDecoration: "none" }}
                  >
                    <h6 className="mt-2">Add Request</h6>
                  </Link>
                </Button>
              </div>

              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center"></div>
                  <div className="text-sm leading-6">
                    <h6>1. Requisition from Department MME</h6>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center"></div>
                  <div className="text-sm leading-6">
                    <h6>2. Requisition from Department EIE</h6>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center"></div>
                  <div className="text-sm leading-6">
                    <h6>3. Requisition from Department COM</h6>
                  </div>
                </div>
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
                  className="block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
                >
                  <option value="">Direct Purchasing</option>
                  <option value="">Shopping Method</option>
                  <option value="">National Competitive Method ( NCB)</option>
                  <option value="">
                    International Competitive Bidding (ICB)
                  </option>
                </select>
              </div>

              <div className="sm:col-span-4 mt-2">
                <label
                  htmlFor="closingDate"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  <h5>Closing Date & Time</h5>
                </label>
                <input type="date" className="mr-6 rounded"></input>
                <input type="time" className="rounded"></input>
              </div>
            </div>

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
        <button
          type="submit"
          className="rounded-md bg-blue-600 h-14 w-30 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          CREATE PROJECT
        </button>
      </div>
    </form>
  );
}
