// ... (other imports)

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import { useNavigate } from "react-router-dom";

export default function PreviewUser() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/user/preview-user/${id}`
        );
        console.log("User Data:", response.data);
        setUser(response.data);
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    getUser();
  }, [id]);
  const navigate = useNavigate();

  const handleClose = () => {
    // Navigate to the "alluser" page
    navigate("/allusers");
  };

  return (
    <div className="App">
      <section id="content">
        <main>
          <div className="p-4">
            {loading ? (
              <Spinner />
            ) : (
              <div className="min-h-screen flex items-center justify-center px-4">
                <div
                  className="w-4xl bg-white w-full rounded-lg shadow-xl"
                  style={{ border: "4px solid #3490dc" }} // Add this style
                >
                  {" "}
                  <div className="p-4 border-b">
                    <h1 class="font-medium text-3xl">User Details</h1>
                    <p className="text-sm text-gray-500">
                      Registration details of users.
                      <button
                        type="button"
                        onClick={handleClose}
                        class="fixed top-13 right-24 bg-red-700 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                      >
                        <span class="sr-only">Close menu</span>

                        <svg
                          class="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </p>
                  </div>
                  <div>
                    <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b bg-gray-50">
                      <span className="text-xl mr-4 text-black-900">Role</span>
                      <span className="text-xl mr-4 text-gray-600">
                        {user.role}
                      </span>
                    </div>
                    <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                      <span className="text-xl mr-4 text-black-900">
                        Department
                      </span>

                      <span className="text-xl mr-4 text-gray-600">
                        {user.department}
                      </span>
                    </div>
                    <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b bg-gray-50">
                      <span className="text-xl mr-4 text-black-900">
                        First Name
                      </span>
                      <span className="text-xl mr-4 text-gray-600">
                        {user.firstname}
                      </span>
                    </div>

                    <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                      <span className="text-xl mr-4 text-black-900">
                        Last Name
                      </span>
                      <span className="text-xl mr-4 text-gray-600">
                        {user.lastname}
                      </span>
                    </div>

                    <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b bg-gray-50">
                      <span className="text-xl mr-4 text-black-900">Email</span>
                      <span className="text-xl mr-4 text-gray-600">
                        {user.email}
                      </span>
                    </div>

                    <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                      <span className="text-xl mr-4 text-black-900">
                        Employee Number
                      </span>
                      <span className="text-xl mr-4 text-gray-600">
                        {user.employeeNumber}
                      </span>
                    </div>

                    <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b bg-gray-50">
                      <span className="text-xl mr-4 text-black-900">
                        Username
                      </span>
                      <span className="text-xl mr-4 text-gray-600">
                        {user.username}
                      </span>
                    </div>
                    <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                      <span className="text-xl mr-4 text-black-900">
                        Password
                      </span>
                      <span className="text-xl mr-4 text-gray-600">
                        {user.password}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </section>
    </div>
  );
}
