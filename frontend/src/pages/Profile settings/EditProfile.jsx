import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditProfile = ({ userId }) => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  // Fetch user data from the API based on the ID
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8000/user/preview-user/${userId}`)
      .then((response) => {
        const userData = response.data;

        console.log("Fetched user data:", userData);

        setEmail(userData.email);
        setFirstName(userData.firstname);
        setLastName(userData.lastname);
        setUsername(userData.username);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("An error occurred. Please check the console.", {
          variant: "error",
        });
        console.error(error);
      });
  }, [userId]);

  // Handle updating user data
  const handleUpdateUsers = (e) => {
    e.preventDefault();
    const newUser = {
      email,
      firstname,
      lastname,
      username,
    };

    setLoading(true);
    axios
      .put(`http://localhost:8000/user/update/${userId}`, newUser)
      .then(() => {
        alert("User Updated");
        // Clear the form
        setEmail("");
        setLastName("");
        setFirstName("");
        setUsername("");
        setLoading(false);
        enqueueSnackbar("User account is updated successfully", {
          variant: "success",
        });
        navigate("/profile");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error updating user account", { variant: "error" });
        console.error(error);
      });
  };

  return (
    <div className="p-2 md:p-4">
      <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
        <h2 className="text-2xl font-bold sm:text-xl">Edit Your Details</h2>
        <div className="grid max-w-2xl mx-auto mt-8">
          <form onSubmit={handleUpdateUsers} className="text-[#202142]">
            <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
              <div className="w-full">
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  id="firstname"
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                  placeholder="Edit your first name"
                  required
                />
              </div>
              <div className="w-full">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  id="lastname"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                  placeholder="Enter the last name"
                  required
                />
              </div>
            </div>
            <div className="mb-2 sm:mb-6">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                placeholder="Enter your new email address"
                required
              />
            </div>
            <div className="mb-2 sm:mb-6">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                placeholder="Edit the username"
              />
            </div>
            <div className="flex justify-end mt-6 gap-x-6">
              <button
                type="button"
                className="text-white bg-pink-500 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-white bg-brandPrimary hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
