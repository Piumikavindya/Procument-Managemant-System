import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import Spinner from "../../../components/Spinner";
import axios from "axios";
import "../../../styles/Scroller.css";
import "../../../styles/button.css";
import "../../../styles/button2.css";
import Breadcrumb from "../../../components/Breadcrumb.jsx";
import UserTypeNavbar from "../../../components/UserTypeNavbar.jsx";

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
  const roles = [
    "admin",
    "procurement Officer",
    "Finance officers",
    "department",
    "approver",
    "TECofficer"
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
       <UserTypeNavbar userType="admin" />
      <Breadcrumb
        crumbs={[
          { label: "Home", link: "/adminhome/:id" },
          { label: "User Registered List", link: "/allusers" },
          { label: "Register New User", link: "/createusers" },
        ]}
        selected={(crumb) => console.log(`Selected: ${crumb.label}`)}
      />

      <h1 class="font-medium text-3xl">User Registration</h1>
      {loading ? <Spinner /> : ""}

      <form onSubmit={handleSaveCreateUsers}>
        <div class="mt-8 grid lg:grid-cols-2 gap-4">
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
          <div>
            <label
              for="firstname"
              class="text-sm text-gray-700 block mb-1 font-medium"
            >
              First Name
            </label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter your first name"
            />
          </div>
          <div>
            <label
              for="Lastname"
              class="text-sm text-gray-700 block mb-1 font-medium"
            >
              Last Name
            </label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter your name"
            />
          </div>

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


        <div class="space-x-4 mt-8 text-center">         
       
        <button class="button-71" role="button">Save</button>   
             </div>
      </form>
    </div>
  );
};
export default CreateUsers;
