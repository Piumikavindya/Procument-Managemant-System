import Breadcrumb from "../components/Breadcrumb.jsx";
import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

const ChangeAccountDetails = () => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdateUsers = () => {
    const newUser = {
      firstname,
      lastname,
      email,
      username,
    };

    // Uncomment and modify the code below when needed
    // setLoading(true);
    // axios
    //   .put(`http://localhost:8000/user/update/${id}`, newUser)
    //   .then(() => {
    //     alert('User Updated');
    //     // Clear the form
    //     setEmail('');
    //     setName('');
    //     setPassword('');
    //     setUsername('');
    //     setLoading(false);
    //     enqueueSnackbar('User account is updated successfully', { variant: 'success' });
    //     navigate('/AllUsers');
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     enqueueSnackbar('Error updating user account', { variant: 'error' });
    //     console.error(error);
    //   });
  };
  return (
    <div
      className="my-2"
      style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
    >
      <Breadcrumb
        crumbs={[
          { label: "Home", link: "/adminhome/:id" },
          { label: "Account Setting", link: "/profile" },
          { label: "  Personal Information ", link: "/changeaccountdetails" },
        ]}
        selected={(crumb) => console.log(`Selected: ${crumb.label}`)}
      />
      <form onSubmit={handleUpdateUsers}>
        <div className="bg-white w-full flex flex-col gap-3 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931] my-0">
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
                Changed Password
              </a>
              {/* Add other settings links here */}
            </div>
          </aside>
          <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
            <div className="p-2 md:p-4">
              <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                <h2 className="pl-6 text-2xl font-bold sm:text-xl">
                  Personal Information
                </h2>
                <div className="grid max-w-2xl mx-auto mt-2">
                  <div class="items-center mt-8 sm:mt-14 text-[#202142]">
                    <div class="flex flex-col items-center w-full mb-4 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                      <div class="w-full">
                        <label
                          for="first_name"
                          class="block mb-4 text-sm font-medium text-indigo-900 dark:text-white"
                        >
                          Your first name
                        </label>
                        <input
                          type="text"
                          value={firstname}
                          onChange={(e) => setFirstName(e.target.value)}
                          class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                          placeholder="Your first name"
                          required
                        />
                      </div>

                      <div class="w-full">
                        <label
                          for="last_name"
                          class="block mb-4 text-sm font-medium text-indigo-900 dark:text-white"
                        >
                          Your last name
                        </label>
                        <input
                          type="text"
                          value={lastname}
                          onChange={(e) => setLastName(e.target.value)}
                          class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                          placeholder="Your last name"
                          required
                        />
                      </div>
                    </div>

                    <div class="mb-4 sm:mb-6">
                      <label
                        for="email"
                        class="block mb-4 text-sm font-medium text-indigo-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                        placeholder="your.email@mail.com"
                        required
                      />
                    </div>

                    <div class="mb-4 sm:mb-6">
                      <label
                        for="profession"
                        class="block mb-4 text-sm font-medium text-indigo-900 dark:text-white"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                        placeholder="username"
                        required
                      />
                    </div>

                    <div class="mb-6">
                      <label
                        for="message"
                        class="block mb-4 text-sm font-medium text-indigo-900 dark:text-white"
                      >
                        Bio
                      </label>
                      <textarea
                        id="message"
                        rows="4"
                        class="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 "
                        placeholder="Write your bio here..."
                      ></textarea>
                    </div>

                    <div class="flex justify-end">
                      <button
                        type="submit"
                        class="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
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
};
export default ChangeAccountDetails;
