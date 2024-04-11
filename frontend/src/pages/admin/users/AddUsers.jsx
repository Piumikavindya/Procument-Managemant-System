import React, { useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AddUsers() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [employeeNumber, setEmpNo] = useState("");
  const [department, setDepartment] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const roles = [
    "admin",
    "procurement Officer",
    "Finance officers",
    "department",
    "approver",
    "TECofficer",
  ];
  const departments = ["DCEE", "DEIE", "MENA", "MME", "IS", "NONE"];

  function handleSaveCreateUsers(e) {
    e.preventDefault();

    const newUser = {
      role,
      email,
      firstname,
      lastname,
      employeeNumber,
      department,
      username,
      password,
    };
    setLoading(true);
    axios
      .post("http://localhost:8000/user/create", newUser)

      .then(() => {
        alert("User added successfully”");
        setLoading(false);
        setRole("");
        setEmail("");
        setLastName("");
        setFirstName("");
        setDepartment("");
        setEmpNo("");
        setUsername("");
        setPassword("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log(newUser);
  }
  const selected = (crumb) => {
    console.log(crumb);
  };

  return (
    <form onSubmit={handleSaveCreateUsers}>
      <div className="space-y-12 ml-40 mr-40 mt-40">
        <Breadcrumb
          crumbs={[
            { label: "Home", link: "/adminhome/:id" },
            { label: "User Details", link: "/userList" },

            { label: "Add User Details", link: "/addUsers" },
          ]}
          selected={(crumb) => console.log(`Selected: ${crumb.label}`)}
        />

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-gray-900">USER REGISTRATION</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                <h6> Role</h6>
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  value={role}
              onChange={(e) => setRole(e.target.value)}
                  autoComplete="country-name"
                  className="block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
                >
                  <option value="">Select your role</option>
                  {roles.map((type, index) => (
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
                <h6> Department</h6>
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  value={department}
              onChange={(e) => setDepartment(e.target.value)}
                  autoComplete="country-name"
                  className="block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
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
                className="block text-sm font-medium leading-6 text-gray-900 "
              >
                <h6> First name </h6>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="given-name"
                  placeholder="Enter your first name"
                  className="block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                <h6> Last name</h6>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  value={lastname}
              onChange={(e) => setLastName(e.target.value)}
                  autoComplete="family-name"
                  placeholder="Enter the last name"
                  className="block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900 "
              >
                <h6> Email Address </h6>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  value={email}
              onChange={(e) => setEmail(e.target.value)}
                  autoComplete="given-name"
                  placeholder="Enter the email address"
                  className="block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                <h6> Employee Number </h6>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  value={employeeNumber}
              onChange={(e) => setEmpNo(e.target.value)}
                  autoComplete="family-name"
                  placeholder="Enter the employee name"
                  className="block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900 "
              >
                <h6> User Name</h6>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  value={username}
              onChange={(e) => setUsername(e.target.value)}
                  autoComplete="given-name"
                  placeholder="Enter the user name"
                  className="block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                <h6> Password</h6>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  value={password}
              onChange={(e) => setPassword(e.target.value)}
                  autoComplete="family-name"
                  placeholder="Enter the password"
                  className="block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6 mr-40 mb-10">
      <Link to="/userList">
      <button
        type="button"
        className="rounded-md h-12 w-20 bg-pink-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        CANCEL
      </button>
      </Link>
        <button
          type="submit"
          className="rounded-md bg-blue-600 h-12 w-20 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          SAVE
        </button>
      </div>
    </form>
  );
}
