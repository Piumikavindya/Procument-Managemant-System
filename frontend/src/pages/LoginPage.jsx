import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { handleSignIn } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const validateFields = () => {
    const newErrors = {};

    if (!credentials.email) newErrors.email = "Email is required";
    if (!credentials.password) newErrors.password = "Password is required";
    if (!credentials.role || credentials.role === "role")
      newErrors.role = "Role is required";

    return newErrors;
  };

  const handleSignInClick = async () => {
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/user/signIn", {
        email: credentials.email,
        password: credentials.password,
        role: credentials.role,
      });

      if (response.data.user) {
        handleSignIn(response.data.user);

        // Redirect based on user role
        switch (response.data.user.role) {
          case "admin":
            navigate("/adminhome/" + response.data.user.id);
            break;
          case "department":
            navigate(
              `/department/${response.data.user.department}/${response.data.user.id}`
            );
            break;
          case "procurement Officer":
            navigate("/PO_BuHome/" + response.data.user.id);
            break;
          case "TECofficer":
            navigate("/TECofficer/" + response.data.user.id);
            break;
          case "Finance officers":
            navigate("/Finance officers/" + response.data.user.id);
            break;
          case "approver":
            navigate("/approver/" + response.data.user.id);
            break;
          default:
            console.log("Invalid role");
        }
      } else {
        toast.error("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Sign in failed:", error);
      if (error.response) {
        console.log("Axios response:", error.response.data);
        toast.error("Sign in failed. Please try again.");
      } else {
        toast.error("Network error. Please try again.");
      }
    }
  };

  return (
    <div>
      <div className="flex  flex-1 flex-col justify-center px-6 py-20 lg:px-8 bg-white min-h-screen">
        <div className="sm:mx-auto sm:w-full ">
          <img
            className="mx-auto h-15 w-20 mt-2"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCt-SLcMs8hS4aNdbyYIn9lQNRXX55C2ZsQO0SHz9j-g&s"
            alt="FoE,UoR-"
          />
          <h1 className="mt-4 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
            Procurement Management System
          </h1>
          <h1 className="mt-2 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
            Faculty of Engineering
          </h1>
          <h1 className="mt-1 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
            University of Ruhuna
          </h1>
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            LOGIN
          </h2>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-2xl">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                htmlFor="role"
                className="block text-2xl font-medium leading-6 text-gray-900"
              >
                Role
              </label>
              <div className="mt-2">
                <select
                  id="role"
                  name="role"
                  value={credentials.role}
                  onChange={handleChange}
                  className={`block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-l sm:leading-6 ${
                    errors.role ? "ring-red-500" : ""
                  }`}
                >
                  <option value="role">Select your role</option>
                  <option value="admin">Admin</option>
                  <option value="procurement Officer">Procurement Officer</option>
                  <option value="Finance officers">Finance Officers</option>
                  <option value="department">User Department</option>
                  <option value="approver">Approver</option>
                 

                </select>
                {errors.role && (
                  <p className="text-red-500 text-sm">{errors.role}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-2xl font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className={`block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-l sm:leading-6 ${
                    errors.email ? "ring-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-2xl font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>

              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  className={`block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-l sm:leading-6 ${
                    errors.password ? "ring-red-500" : ""
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
            </div>

            <div className="text-l">
              <a
                href="#"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </a>
            </div>

            <div>
              <button
                type="button"
                onClick={handleSignInClick}
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer className="mt-14" />
    </div>
  );
};

export default LoginPage;
