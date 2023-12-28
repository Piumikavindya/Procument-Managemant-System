import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/Profile.css';
const UserProfileCard = ({ userData, editMode, onImageChange, onUsernameChange, onRoleChange }) => {
  return (
    <div className="user-profile-card">
      <div>
        <img
          src="https://secure.gravatar.com/avatar/d09eaad01aea86c51b4f892b4f8abf6f?s=100&d=wavatar&r=g"
          alt="User Profile"
        />
        {editMode && (
          <>
            <label htmlFor="profile-image" className="edit-icon">
              📷
            </label>
            <input
              type="file"
              id="profile-image"
              style={{ display: "none" }}
              onChange={onImageChange}
            />
          </>
        )}
      </div>
      <div>
        <strong>Username:</strong>{" "}
        {editMode ? (
          <input
            type="text"
            value={userData.username}
            onChange={onUsernameChange}
          />
        ) : (
          userData.username
        )}
      </div>
      <div>
        <strong>Role:</strong>{" "}
        {editMode ? (
          <input
            type="text"
            value={userData.role}
            onChange={onRoleChange}
          />
        ) : (
          userData.role
        )}
      </div>
    </div>
  );
};

const UserProfileScreen = ({ onClose }) => {
  const initialUserData = {
    username: "JohnDoe",
    role: "Admin",
    // Add other user data properties as needed
  };

  const [userData, setUserData] = useState(initialUserData);
  const [editMode, setEditMode] = useState(false);

  const handleImageChange = (event) => {
    // Handle image change logic
  };

  const handleSave= () => {
   //
  };

  
  const handleUsernameChange = (event) => {
    setUserData({ ...userData, username: event.target.value });
  };

  const handleRoleChange = (event) => {
    setUserData({ ...userData, role: event.target.value });
  };

  return (
    <div className="user-profile-screen">
      <UserProfileCard
        userData={userData}
        onImageChange={handleImageChange}
        onUsernameChange={handleUsernameChange}
        onRoleChange={handleRoleChange}
      />
      <div className="buttons-container">
      <Link to="/adminaccountsetting" className="button-64" role="button">
          <span className="text" onClick={handleSave}>
            Account Setting
          </span>
        </Link>
      
      <button className="button-64" role="button"><span className="text" onClick={onClose}>Close</span></button>
      </div>
    
    </div>
  );
};

export default UserProfileScreen;
