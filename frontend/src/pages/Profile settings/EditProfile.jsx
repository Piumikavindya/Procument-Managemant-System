import React from "react";

const EditProfile = () => {
  return (
    <div className="p-2 md:p-4">
      <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
        <h2 className="text-2xl font-bold sm:text-xl">Edit Your Details</h2>
        <div className="grid max-w-2xl mx-auto mt-8">
          <div className="items-center mt-8 sm:mt-14 text-[#202142]">
            <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
              <div className="w-full">
                <label
                  htmlFor="current_password"
                  className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                >
                  First Name
                </label>
                <input
                  type="password"
                  id="current_password"
                  className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                  placeholder=""
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="new_password"
                  className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                >
                  Last Name
                </label>
                <input
                  type="password"
                  id="new_password"
                  className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                  placeholder=""
                  required
                />
              </div>
            </div>
            <div className="mb-2 sm:mb-6">
              <label
                htmlFor="confirm_password"
                className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
              >
                Email Address
              </label>
              <input
                type="password"
                id="confirm_password"
                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                placeholder=""
                required
              />
            </div>
            <div className="mb-2 sm:mb-6">
              <label
                htmlFor="confirm_password"
                className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
              >
                User Name
              </label>
              <input
                type="password"
                id="confirm_password"
                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                placeholder=""
              />
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="text-white bg-brandPrimary hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default EditProfile;

