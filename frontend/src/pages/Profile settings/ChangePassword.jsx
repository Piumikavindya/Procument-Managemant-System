import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      console.log("New password and confirm password do not match.");
      // You can also set an error state to display a message to the user if needed
      return;
    }

    setLoading(true); // Set loading state to true while waiting for the API request

    try {
      // Make an API call to change the password
      const response = await axios.post(
        `http://localhost:8000/user/change-password`,
        {
          currentPassword,
          newPassword,
        }
      );
      console.log("Password changed successfully:", response.data);
      alert({
        type: "success",
        message: "Password Changed successfully",
      });
      navigate("/"); // Redirect to the desired page after successful password change
    } catch (error) {
      console.error("Error changing password:", error.response.data);
      // You can display an error message to the user if needed
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };

  return (
    <div className="p-2 md:p-4">
      <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
        <h2 className="text-2xl font-bold sm:text-xl">Account Password Settings</h2>
        <div className="grid max-w-2xl mx-auto mt-8">
          <div className="items-center mt-8 sm:mt-14 text-[#202142]">
            <form onSubmit={handleSave}>
              <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                <div className="w-full">
                  <label
                    htmlFor="current_password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="current_password"
                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                    placeholder="Enter your current password"
                    required
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="new_password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="new_password"
                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                    placeholder="Enter your new password"
                    required
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-2 sm:mb-6">
                <label
                  htmlFor="confirm_password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirm_password"
                  className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                  placeholder="Confirm your new password"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="text-white bg-brandPrimary hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                  disabled={loading} // Disable button while loading
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
