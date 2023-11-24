import React, { useState } from 'react';
import '../styles/AdminAccount.css';

const AdminAccount = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = () => {
    // Add your logic to save the changes
    console.log('Saving changes...');
  };

  const handleCancel = () => {
    // Add your logic to cancel the changes
    
    console.log('Changes cancelled.');
  };

  return (
   
    <div className="admin-account-container">
      <div className='header' >
        Change Password
      </div>
      <div className="input-container">
        <label>Old Password      : </label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        </div>
     
      <div className="input-container">
        <label>New Password      : </label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label>Confirm Password : </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="button-container">
        <button className='button' onClick={handleSave}>Save</button>
        <button className='button 'onClick={handleCancel}>Cancel</button>
        
      </div>
    </div>
    

  );
};

export default AdminAccount;
