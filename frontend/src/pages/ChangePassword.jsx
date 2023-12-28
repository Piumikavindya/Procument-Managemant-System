import React, { useState } from 'react';
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Breadcrumb from "../components/Breadcrumb.jsx";
import axios from 'axios';

export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const handleSave = async () => {
      try {
        // Add validation logic as needed
        if (newPassword !== confirmPassword) {
          console.error('New password and confirm password do not match');
          return;
        }
  
        // Make a request to your backend to change the password
        const response = await axios.post('http://localhost:8000/reset-password', {
          newPassword,
          userId: 'userId', 
        });
  
        console.log(response.data.message); // Log the response from the server
  
        // Add logic to handle success or show a message to the user
      } catch (error) {
        console.error('Error changing password:', error.message);
        // Add logic to handle errors or show an error message to the user
      }
    };
  
   
  return (
    <div className="my-2" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
          <Breadcrumb
        crumbs={[
            { label: "Home", link: "/adminhome/:id" },
            { label: "Account Setting", link: "/profile" },
            { label: "Change Password", link: "/changepassword" },
        ]}
        selected={(crumb) => console.log(`Selected: ${crumb.label}`)}
      />
       <form onSubmit={handleSave}>
      <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931] my-0">
        <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
          <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-0">
            <h2 className="pl-3 mb-4 text-2xl font-semibold">Settings</h2>
            <a
              href="/profile"
              className="flex items-center px-3 py-2.5 font-bold bg-white text-indigo-900 border rounded-full"
            >
              Profile Setting
            </a>
            <a
              href="/changeaccountdetails"
              class="flex items-center px-3 py-2.5 font-semibold  hover:text-indigo-900 hover:border hover:rounded-full"
            >
              Personal Information
            </a>
            <a
              href="/changepassword"
              class="flex items-center px-3 py-2.5 font-semibold  hover:text-indigo-900 hover:border hover:rounded-full"
            >
              Changed  Password
            </a>
            {/* Add other settings links here */}
          </div>
        </aside>
        <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
          <div className="p-2 md:p-4">
            <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
              <h2 className="pl-6 text-2xl font-bold sm:text-xl">
                Change Password
              </h2>
              <div className="grid max-w-2xl mx-auto mt-2">
                <div class="items-center mt-8 sm:mt-14 text-[#202142]">
                  <div class="mb-4 sm:mb-6">
                    <label
                      for="password"
                      class="block mb-4 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Old Password
                    </label>
                    <input
                     type="password"
                     value={oldPassword}
                     onChange={(e) => setOldPassword(e.target.value)}
                      class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      placeholder="Enter your old password"
                      required
                    />
                  </div>
                  <div class="mb-4 sm:mb-6">
                    <label
                      for="password"
                      class="block mb-4 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      New Password
                    </label>
                    <input
                     type='password'
                     value={newPassword}
                     onChange={(e) => setNewPassword(e.target.value)}
                      class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      placeholder="Enter your new password"
                      required
                    />
                  </div>
                  <div class="mb-4 sm:mb-6">
                    <label
                      for="password"
                      class="block mb-4 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      placeholder="Confirm your password"
                      required
                    />
                  </div>

                  <div class="flex justify-end">
                   
                    <button
                      type="submit"
                      onClick={handleSave}
                      class="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                    >
                      Save
                    </button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
    
      </div>
      </form>
    </div>
  );
}
