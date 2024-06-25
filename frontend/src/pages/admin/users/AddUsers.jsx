// AddUsers

import React, { useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const [validationErrors, setValidationErrors] = useState({}); // State to store validation errors

  const roles = [
    "admin",
    "procurement Officer",
    "Finance officers",
    "department",
    "approver",
    "TECofficer",
  ];
  const departments = ["DCEE", "DEIE", "MENA", "MME", "IS", "NONE"];

  // Validate the form fields
  const validateFields = () => {
    let errors = {};
    let isValid = true;

    if (!role) {
      errors.role = "Role is required";
      isValid = false;
    }
    if (!department) {
      errors.department = "Department is required";
      isValid = false;
    }
    if (!firstname) {
      errors.firstname = "First name is required";
      isValid = false;
    }
    if (!lastname) {
      errors.lastname = "Last name is required";
      isValid = false;
    }
    if (!email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
      isValid = false;
    }
    if (!employeeNumber) {
      errors.employeeNumber = "Employee number is required";
      isValid = false;
    }
    if (!username) {
      errors.username = "Username is required";
      isValid = false;
    }
    if (!password) {
      errors.password = "Password is required";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  // Handle form submission
  const handleSaveCreateUsers = (e) => {
    e.preventDefault();

    // Validate fields before saving
    if (!validateFields()) {
      return;
    }

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
         // Show success toast notification
         toast.success("User details successfully added!");
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
                htmlFor="role"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                <h6>Role</h6>
              </label>
              <div className="mt-2">
                <select
                  id="role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={`block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                    validationErrors.role ? "ring-red-500" : "ring-gray-300"
                  } focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                >
                  <option value="">Select your role</option>
                  {roles.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {validationErrors.role && (
                  <p className="text-red-500 text-sm">{validationErrors.role}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="department"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                <h6>Department</h6>
              </label>
              <div className="mt-2">
                <select
                  id="department"
                  name="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className={`block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                    validationErrors.department ? "ring-red-500" : "ring-gray-300"
                  } focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                >
                  <option value="">Select your department</option>
                  {departments.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {validationErrors.department && (
                  <p className="text-red-500 text-sm">{validationErrors.department}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                <h6>First name</h6>
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
                  className={`block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                    validationErrors.firstname ? "ring-red-500" : "ring-gray-300"
                  } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                />
                {validationErrors.firstname && (
                  <p className="text-red-500 text-sm">{validationErrors.firstname}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                <h6>Last name</h6>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="family-name"
                  placeholder="Enter your last name"
                  className={`block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                    validationErrors.lastname ? "ring-red-500" : "ring-gray-300"
                  } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                />
                {validationErrors.lastname && (
                  <p className="text-red-500 text-sm">{validationErrors.lastname}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                <h6>Email Address</h6>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="Enter your email address"
                  className={`block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                    validationErrors.email ? "ring-red-500" : "ring-gray-300"
                  } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                />
                {validationErrors.email && (
                  <p className="text-red-500 text-sm">{validationErrors.email}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="employee-number"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                <h6>Employee Number</h6>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="employee-number"
                  id="employee-number"
                  value={employeeNumber}
                  onChange={(e) => setEmpNo(e.target.value)}
                  autoComplete="employee-number"
                  placeholder="Enter your employee number"
                  className={`block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                    validationErrors.employeeNumber ? "ring-red-500" : "ring-gray-300"
                  } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                />
                {validationErrors.employeeNumber && (
                  <p className="text-red-500 text-sm">{validationErrors.employeeNumber}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                <h6>Username</h6>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  placeholder="Enter your username"
                  className={`block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                    validationErrors.username ? "ring-red-500" : "ring-gray-300"
                  } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                />
                {validationErrors.username && (
                  <p className="text-red-500 text-sm">{validationErrors.username}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                <h6>Password</h6>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  placeholder="Enter your password"
                  className={`block w-full h-12 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                    validationErrors.password ? "ring-red-500" : "ring-gray-300"
                  } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                />
                {validationErrors.password && (
                  <p className="text-red-500 text-sm">{validationErrors.password}</p>
                )}
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
      {/* ToastContainer to display toast notifications */}
     <ToastContainer className="mt-14"/>
    </form>
  );
}