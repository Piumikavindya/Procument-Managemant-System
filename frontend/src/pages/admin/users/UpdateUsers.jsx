import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import Breadcrumb from "../../../components/Breadcrumb.jsx";

const UpdateUsers = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [department, setDepartment] = useState("");
  const [employeeNumber, setEmpNo] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [headingFontSize, setHeadingFontSize] = useState("3xl");
  const [labelMargin, setLabelMargin] = useState("mb-1");
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  useEffect(() => {
    setScreenHeight(window.innerHeight);
    if (window.innerHeight < 768) {
      setHeadingFontSize("xl");
      setLabelMargin("mb-0");
    } else {
      setHeadingFontSize("3xl");
      setLabelMargin("mb-1");
    }
    setLoading(true);
    axios
      .get(`http://localhost:8000/user/${id}`)
      .then((response) => {
        setRole(response.data.role);
        setEmail(response.data.email);
        setFirstName(response.data.firstname);
        setLastName(response.data.lastname);
        setPassword(response.data.password);
        setUsername(response.data.username);
        setDepartment(response.data.department);
        setEmpNo(response.data.employeeNumber);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("An error occurred. Please check the console.", {
          variant: "error",
        });
        console.error(error);
      });
  }, [id]);

  const handleUpdateUsers = (e) => {
    e.preventDefault();
    const newUser = {
      role,
      email,
      firstname,
      lastname,
      password,
      username,
      department,
      employeeNumber,
    };

    setLoading(true);
    axios
      .put(`http://localhost:8000/user/update/${id}`, newUser)
      .then(() => {
        alert("User Updated");
        setRole("");
        setEmail("");
        setLastName("");
        setFirstName("");
        setPassword("");
        setUsername("");
        setDepartment("");
        setEmpNo("");
        setLoading(false);
        enqueueSnackbar("User account is updated successfully", {
          variant: "success",
        });
        navigate("/AllUsers");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error updating user account", { variant: "error" });
        console.error(error);
      });
  };

  const navigate = useNavigate();

  const selected = (crumb) => {
    console.log(crumb);
  };

  return (
    <div className="app-container p-8 rounded border border-gray-200">
      <Breadcrumb
        crumbs={[
          { label: "Home", link: "/adminhome/:id" },
          { label: "Registered List", link: "/allusers" },
          { label: "Update Details", link: "/updateusers" },
        ]}
        selected={(crumb) => console.log(`Selected: ${crumb.label}`)}
      />
<h1 className={`font-medium text-${headingFontSize} mt-[-0.5rem]`}>Update details</h1>
    

      <form onSubmit={handleUpdateUsers}>
        <div className="mt-8 grid lg:grid-cols-2 gap-4">
          <div>
            <label htmlFor="role" className="text-sm text-gray-700 block mb-1 font-medium">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
            >
              <option value="">Update your role</option>
              {[
                "Admin",
                "Procurment Officer",
                "Finance Officers",
                "User Department",
                "Approver",
              ].map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="department" className="text-sm text-gray-700 block mb-1 font-medium">
              Department
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
            >
              <option value="">Select your department</option>
              {["DCEE", "DEIE", "MENA", "MME", "IS", "NONE"].map((type, index) => (
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
              htmlFor="email"
              className="text-sm text-gray-700 block mb-1 font-medium"
            >
              Email Adress
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Update your email"
            />
          </div>

          <div>
            <label
              htmlFor="employeenumber"
              className="text-sm text-gray-700 block mb-1 font-medium"
            >
              Employee Number
            </label>
            <input
              type="text"
              value={employeeNumber}
              onChange={(e) => setEmpNo(e.target.value)}
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Update your employee number"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="text-sm text-gray-700 block mb-1 font-medium"
            >
              Username
            </label>
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Update your username"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm text-gray-700 block mb-1 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Update your password"
            />
          </div>
        </div>
        <div className="space-x-4 mt-8 text-center mt-2">
          <button className="button-71" role="button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUsers;
