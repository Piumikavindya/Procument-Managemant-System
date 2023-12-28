import React from 'react';

export const UserNavBar = () => {
  return (
    <nav className="bg-blue-500  shadow dark:bg-gray-800 mt-20 ">
      <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
        <a href="/allusers" className="text-gray-800 dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6">User Registration</a>

        <a href="/allvendors" className="text-gray-800 dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6">Vendor Registraion</a>

        <a href="#" className="text-gray-800 dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6">Add Items</a>

        <a href="/managenotices" className="text-gray-800 dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6">Manage Notices</a>
        <a href="/manageguidance" className="text-gray-800 dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6">Manage Guidance</a>
        <a href="#" className="text-gray-800 dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6">Budeget & Plan</a>

       

      </div>
    </nav>
  );
};
