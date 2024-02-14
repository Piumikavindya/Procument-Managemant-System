// FormContainer.js
import React, { useState, useEffect } from 'react';
import ReqForm from './ReqForm';
import axios from 'axios';

const FormContainer = () => {
  const [requestId, setRequestId] = useState('');

  useEffect(() => {
    // Generate the requestId when the component mounts
    handleGenerateRequestId();
  }, []); // Empty dependency array ensures this effect runs only once

  const handleGenerateRequestId = async () => {
    try {
      console.log('Generate Request ID button clicked');
      const response = await axios.post(
        'http://localhost:8000/procReqest/generateRequestId'
      );
      const generatedId = response.data.requestId;
      setRequestId(generatedId);
    } catch (error) {
      console.error('Error generating request ID', error);
    }
  };

  return <ReqForm requestId={requestId} />;
};

export default FormContainer;
