import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../styles/Scroller.css";
import "../../../styles/button.css";
import "../../../styles/button2.css";
import Breadcrumb from "../../../components/Breadcrumb.jsx";

const CreateDepartment = () => {
  const [email1, setEmail1] = useState("");
  const [faculty, setFaculty] = useState("");
  const [departments, setDepartments] = useState("");
  const [hod, setHod] = useState("");
  const [loading, setLoading] = useState(false);

  const facuities = ["Enginnering", "Main Unit", "Other"];
  const departments1 = ["DCEE", "DEIE", "MENA", "MME", "IS", "NONE"];

  function handleSaveDepartment(e) {
    e.preventDefault();

    const newDepartment = {
      email1,
      faculty,
      departments,
      hod,
    };
    setLoading(true);
    axios
      .post("http://localhost:8000/user/create", newDepartment)

      .then(() => {
        alert("user added");
        setLoading(false);
        setFaculty("");
        setEmail1("");
        setDepartments("");
        setHod("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log(newDepartment);
  }
  const selected = (crumb) => {
    console.log(crumb);
  };

  return (
    <div class="app-container p-8 rounded border border-gray-200">
      <Breadcrumb
        crumbs={[
          { label: "Home", link: "/adminhome/:id" },
          { label: "All Departments", link: "/alldepartments" },

          { label: "Add Department", link: "/adddepartment" },
        ]}
        selected={(crumb) => console.log(`Selected: ${crumb.label}`)}
      />

      <h3 className={`font-sm mt-0.5`}>Add Department</h3>

      <form onSubmit={handleSaveDepartment}>
        <div class="mt-4 grid  gap-4">
          <div>
            <label
              for="role"
              class="text-sm text-gray-700 block mb-3 font-medium"
            >
              Faculty/Main Unit
            </label>
            <select
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
              class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter your name"
            >
              <option value="">Select faculty/main unit</option>
              {facuities.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              for="department"
              class="text-sm text-gray-700 block mb-3 font-medium"
            >
              Department/Division
            </label>
            <select
              value={departments}
              onChange={(e) => setDepartments(e.target.value)}
              class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
            >
              <option value="">Select your department</option>
              {departments1.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              for="email"
              class="text-sm text-gray-700 block mb-3 font-medium"
            >
              Email Adress
            </label>
            <input
              type="email"
              value={email1}
              onChange={(e) => setEmail1(e.target.value)}
              class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              for="employeenumber"
              class="text-sm text-gray-700 block mb-3 font-medium"
            >
              Head of the Department
            </label>
            <input
              type="text"
              value={hod} //s
              onChange={(e) => setHod(e.target.value)}
              class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter name of the HOD"
            />
          </div>
        </div>

        <div class="space-x-4 mt-8 text-center ">
          <button class="button-71" role="button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreateDepartment;
