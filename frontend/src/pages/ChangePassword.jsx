import React, { useState } from 'react';
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

  const handleCancel = () => {
    // Add your logic to cancel the changes
    console.log('Changes cancelled.');
  };

  return (
    <div className="admin-account-container">
      <div className="header">Change Password</div>
      <div className="input-container">
        <label>Old Password: </label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label>New Password: </label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label>Confirm Password: </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="button-container">
        <button className="button" onClick={handleSave}>
          Save
        </button>
        <button className="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
