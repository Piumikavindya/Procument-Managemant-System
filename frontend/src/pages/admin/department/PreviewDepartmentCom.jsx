import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../../styles/button2.css";

export default function PreviewDepartmentCom() {
  const [departments, setDepartments] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getDepartment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/user/preview-user/${id}`
        );
        console.log("Department Data:", response.data);
        setDepartments(response.data);
      } catch (error) {
        console.log("Error fetching department:", error);
      }
    };

    getDepartment();
  }, [id]);

  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/alldepartments");
  };

  return (
    <div className="App">
      <section id="content">
        <main>
          <div className="p-4">
            <div className="min-h-screen flex items-center justify-center px-4">
              <div
                className="max-w-2xl mx-auto  bg-white w-full rounded-lg shadow-xl p-8"
                style={{ border: "4px solid #3490dc" }}
              >
                <div className="p-3 border-b">
                  <h1 className="font-medium text-2xl">Department Details</h1>
                </div>
                <div>
                  <style>
                    {`
                        @media (max-width: 280px) {
                          .md\:grid {
                            grid-template-columns: 1fr;
                          }
                          .md\:grid-cols-2 {
                            grid-template-columns: 1fr;
                          }
                          .md\:space-y-0 {
                            grid-row-gap: 0;
                          }
                          .md\:space-y-1 {
                            grid-row-gap: 0.25rem;
                          }
                          .md\:hover\:bg-gray-50:hover {
                            background-color: #f9fafb;
                          }
                          .md\:p-2 {
                            padding: 0.5rem;
                          }
                          .md\:border-b {
                            border-bottom-width: 1px;
                          }
                          .md\:bg-gray-50 {
                            background-color: #f9fafb;
                          }

                          .md\:grid-cols-2 .text-black-900,
                          .md\:grid-cols-2 .text-gray-600 {
                            display: block;
                          }
                        }
                      `}
                  </style>
                  <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b bg-gray-50">
                    <span className="text-xl md:mr-4 text-black-900 font-bold block sm:inline">
                      Faculty/Main Unit :
                    </span>
                    <span className="text-xl md:mr-4 text-gray-600">
                      {departments.faculty}
                    </span>
                  </div>
                  <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                    <span className="text-xl md:mr-4 text-black-900 font-bold block sm:inline">
                      Department:
                    </span>
                    <span className="text-xl md:mr-4 text-gray-600">
                      {departments.departments}
                    </span>
                  </div>
                  <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b bg-gray-50">
                    <span className="text-xl md:mr-4 text-black-900 font-bold block sm:inline">
                      Head of department:
                    </span>
                    <span className="text-xl mr-4 text-gray-600">
                      {departments.hod}
                    </span>
                  </div>

                  <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                    <span className="text-xl md:mr-4 text-black-900 font-bold block sm:inline">
                      Email:
                    </span>
                    <span className="text-xl mr-4 text-gray-600">
                      {departments.email1}
                    </span>
                  </div>

                  <div class="space-x-4 mt-8 text-center mt-2">
                    <button onClick={handleClose} className="button-71">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}
