import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../../styles/button2.css";


export default function PreviewVendor() {
  const [supplyer, setSupplyer] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const getSupplyer = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/supplyer/preview-supplyer/${id}`
        );
        console.log("Supllyer Data:", response.data);
        setSupplyer(response.data);
      } catch (error) {
        console.log("Error fetching supplyer:", error);
      }
    };

    getSupplyer();
  }, [id]);
  const navigate = useNavigate();

  const handleClose = () => {
    // Navigate to the "alluser" page
    navigate("/allvendors");
  };

  return (
    <div className="App">
      <section id="content">
        <main>
          <div className="p-4">
           
              <div className="min-h-screen flex items-center justify-center px-4">
               
                <div
                  className="max-w-2xl mx-auto  bg-white w-full rounded-lg shadow-xl p-8"
                  style={{ border: "4px solid #3490dc" }} // Add this style
                >
                  {" "}
                  <div className="p-5 border-b ">
                  
                    <h1 class="font-medium text-2xl">Supplyers Details</h1>
                    <p className=" text-sm text-gray-500">
                      Registration details of supplyers.
                
                    </p>
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
                        Username:
                      </span>
                      <span className="text-xl mr-4 text-gray-600">
                        {supplyer.username}
                      </span>
                    </div>

                    <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                      <span className="text-xl md:mr-4 text-black-900 font-bold block sm:inline">
                        Supplier ID:
                      </span>
                      <span className="text-xl mr-4 text-gray-600">
                        {supplyer.supplierId}
                      </span>
                    </div>
                    <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b bg-gray-50">
                      <span className="text-xl md:mr-4 text-black-900 font-bold block sm:inline">
                        Supplier Name:
                      </span>
                      <span className="text-xl mr-4 text-gray-600">
                        {supplyer.supplierName}
                      </span>
                    </div>

                    <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                      <span className="text-xl md:mr-4 text-black-900 font-bold block sm:inline">
                        Address:
                      </span>

                      <span className="text-xl mr-4 text-gray-600">
                        {supplyer.address}
                      </span>
                    </div>
                    <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b bg-gray-50">
                      <span className="text-xl md:mr-4 text-black-900 font-bold block sm:inline">
                        Contact Officer:
                      </span>
                      <span className="text-xl mr-4 text-gray-600">
                        {supplyer.contactOfficer}
                      </span>
                    </div>

                    <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                      <span className="text-xl md:mr-4 text-black-900 font-bold block sm:inline">
                        Contact Numbers:
                      </span>
                      {supplyer.contactNumbers ? (
                        <span className="text-xl mr-4 text-gray-600">
                          {supplyer.contactNumbers.map((number, index) => (
                            <div key={index} className="mb-1">
                              {number}
                            </div>
                          ))}
                        </span>
                      ) : (
                        <span className="text-xl mr-4 text-gray-600">N/A</span>
                      )}
                    </div>

                    <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b bg-gray-50">
                      <span className="text-xl md:mr-4 text-black-900 font-bold block sm:inline">
                        Contact Emails:
                      </span>
                      {supplyer.emails ? (
                        <span className="text-xl mr-4 text-gray-600">
                          {supplyer.emails.map((email, index) => (
                            <div key={index} className="mb-1">
                              {email}
                            </div>
                          ))}
                        </span>
                      ) : (
                        <span className="text-xl mr-4 text-gray-600">N/A</span>
                      )}
                    </div>

                    <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                      <span className="text-xl md:mr-4 text-black-900 font-bold block sm:inline">
                        Fax Number:
                      </span>
                      <span className="text-xl mr-4 text-gray-600">
                        {supplyer.faxNumber}
                      </span>
                    </div>

                    <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b bg-gray-50">
                      <span className="text-xl md:mr-4 text-black-900 font-bold block sm:inline">
                        Business Type:
                      </span>
                      <span className="text-xl mr-4 text-gray-600">
                        {supplyer.typeofBusiness}
                      </span>
                    </div>

                    <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-2 border-b">
                      <span className="text-xl md:mr-4 text-black-900 font-bold block sm:inline">
                        Class of Assets Supplies:
                      </span>
                      <span className="text-xl mr-4 text-gray-600">
                        {supplyer.classOfAssets}
                      </span>
                    </div>
                    <div class="space-x-4 mt-8 text-center mt-2">         
                    <button
                       
                        onClick={handleClose}
                        className="button-71"
                      >
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
