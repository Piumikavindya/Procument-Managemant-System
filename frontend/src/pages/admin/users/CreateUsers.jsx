import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import React, { useState, useEffect } from "react";

import axios from "axios";
import "../../../styles/Scroller.css";
import "../../../styles/button.css";
import "../../../styles/button2.css";
import Breadcrumb from "../../../components/Breadcrumb.jsx";


const CreateUsers = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [employeeNumber, setEmpNo] = useState("");
  const [department, setDepartment] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showFullName, setShowFullName] = useState(true);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const roles = [
    "admin",
    "procurement Officer",
    "financeofficers",
    "department",
    "approver",
  ];
  const departments = ["DCEE", "DEIE", "MENA", "MME", "IS", "NONE"];
  const [headingFontSize, setHeadingFontSize] = useState("3xl");
  const [labelMargin, setLabelMargin] = useState("mb-1");
  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
      if (window.innerHeight < 768) {
        setHeadingFontSize("xl");
        setLabelMargin("mb-0.3");
        setShowFullName(false); // Hide Full Name and Last Name when height is less than 768
      } else {
        setHeadingFontSize("3xl");
        setLabelMargin("mb-1");
        setShowFullName(true); // Show Full Name and Last Name when height is 768 or more
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
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
        alert("user added");
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
    <div class="app-container p-8 rounded border border-gray-200">
      <Breadcrumb
        crumbs={[
          { label: "Home", link: "/adminhome/:id" },
          { label: "User Registered List", link: "/allusers" },
          { label: "User Registration", link: "/createusers" },
        ]}
        selected={(crumb) => console.log(`Selected: ${crumb.label}`)}
      />

      <h1 className={`font-medium text-${headingFontSize} mt-0.5`}>
        User Registration
      </h1>

      <form onSubmit={handleSaveCreateUsers}>
        <div class="mt-2 grid lg:grid-cols-2 gap-4">
          <div>
            <label
              for="role"
              class="text-sm text-gray-700 block mb-1 font-medium"
            >
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter your name"
            >
              <option value="">Select your role</option>
              {roles.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              for="department"
              class="text-sm text-gray-700 block mb-1 font-medium"
            >
              Department
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
            >
              <option value="">Select your department</option>
              {departments.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {window.innerWidth < 768 ? (
            <div>
              <label
                htmlFor="fullname"
                className="text-sm text-gray-700 block mb-1 font-medium"
              >
                Full Name
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                  className="ml-2 bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder="Last Name"
                />
              </div>
            </div>
          ) : (
            <>
              <div>
                <label
                  htmlFor="firstname"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  First Name
                </label>
                <input
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label
                  htmlFor="Lastname"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder="Enter your name"
                />
              </div>
            </>
          )}

          <div>
            <label
              for="email"
              class="text-sm text-gray-700 block mb-1 font-medium"
            >
              Email Adress
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              for="employeenumber"
              class="text-sm text-gray-700 block mb-1 font-medium"
            >
              Employee Number
            </label>
            <input
              type="text"
              value={employeeNumber}
              onChange={(e) => setEmpNo(e.target.value)}
              class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter your employee number"
            />
          </div>
          <div>
            <label
              for="username"
              class="text-sm text-gray-700 block mb-1 font-medium"
            >
              Username
            </label>
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label
              for="password"
              class="text-sm text-gray-700 block mb-1 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter your password"
            />
          </div>
        </div>

        <div class="space-x-4 mt-8 text-center mt-2">
          <button class="button-71" role="button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreateUsers;
