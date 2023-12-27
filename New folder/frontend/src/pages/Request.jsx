import React, { useState } from 'react';
import axios from 'axios';

export default function Request() {
    const [requestId, setRequestId] = useState('');
    const [formFields, setFormFields] = useState({
      department: '',
      date: '',
      contactNo: '',
      contactPerson: '',
      budgetAllocation: '',
      usedAmount: '',
      balanceAvailable: '',
      purpose: 'Normal',
    });
  
    const [file, setFile] = useState(null);
    const [item, setItem] = useState({
      itemName: '',
      cost: '',
      qtyRequired: '',
      qtyAvailable: '',
    });
    const generateRequestId = async () => {
        try {
          const response = await axios.post('/generateRequestId');
          setRequestId(response.data.requestId);
        } catch (error) {
          console.error('Error generating REQ ID:', error);
          console.log('AxiosError Details:', error.toJSON()); // Log the entire error object
        }
      };
      
  
    const createRequest = async () => {
      try {
        const response = await axios.post('/createRequest', { requestId, ...formFields });
       
      } catch (error) {
        console.error('Error creating request:', error);
      }
    };
  
    const uploadFile = async () => {
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        const response = await axios.post(`/uploadFile/${requestId}`, formData);
        // Handle the response, e.g., show a success message
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };
  
    const addItem = async () => {
      try {
        const response = await axios.post(`/addProcItem/${requestId}`, item);
        // Handle the response, e.g., show a success message
      } catch (error) {
        console.error('Error adding item:', error);
      }
    };
  
    return (
      <div>
        <h1>Procurement Request Form</h1>
  
        <button onClick={generateRequestId}>Generate REQ ID</button>
  
        <form>
          <label htmlFor="requestId">Request ID:</label>
          <input type="text" id="requestId" name="requestId" value={requestId} readOnly />
  
          {/* Add other input fields for department, date, contactNo, contactPerson, budgetAllocation, usedAmount, balanceAvailable, and purpose */}
          
          <button type="button" onClick={createRequest}>Create Request</button>
        </form>
  
        <h2>Upload File</h2>
  
        <form encType="multipart/form-data">
          <label htmlFor="file">Choose file:</label>
          <input type="file" id="file" name="file" accept=".pdf, .doc, .docx" onChange={(e) => setFile(e.target.files[0])} />
          <button type="button" onClick={uploadFile}>Upload File</button>
        </form>
  
        <h2>Add Item</h2>
  
        <form>
          {/* Add input fields for itemName, cost, qtyRequired, qtyAvailable */}
          
          <button type="button" onClick={addItem}>Add Item</button>
        </form>
      </div>
    );
}

