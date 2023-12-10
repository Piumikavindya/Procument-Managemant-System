import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../styles/GuidanceDoc.css';

export default function UploadGuidance() {
  const [guidance, setGuidance] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [name, setName] = useState('');

  const viewGuidance = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:8000/guidance/view-guidance');
      setGuidance(res.data.guidance);
      setLoading(false);
      console.log('Guidance data:', res.data.guidance);
    } catch (error) {
      console.log('Error fetching guidance:', error);
    }
  };

  const upload = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(); // Fixed typo here (changed formData to FormData)
      formData.append('name', name);
      formData.append('file', fileInputRef.current.files[0]); // Fixed typo here (changed files to files[0])
      const res = await axios.post('http://localhost:8000/guidance/upload', formData);

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const downloadGuidance = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8000/guidance/download/${id}`, { responseType: 'blob' });
      
      const blob = new Blob([res.data], { type: res.data.type });
  
      // Log the file content to check if it's non-empty
      console.log('File Content:', blob);
  
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
  
      // Check if the 'content-disposition' header is present
      if (res.headers['content-disposition']) {
        // Extract filename from content-disposition header
        const filename = getFileName(res.headers['content-disposition']);
        link.download = filename || 'downloadedFile.pdf';
      } else {
        link.download = 'downloadedFile.pdf'; // Default filename if 'content-disposition' is not present
      }
  
      link.click();
    } catch (error) {
      console.log('Error downloading guidance:', error);
    }
  };
  
  
  // Function to extract filename from content-disposition header
  const getFileName = (contentDisposition) => {
    const match = contentDisposition.match(/filename="(.+?)"/);
    return match ? match[1] : null;
  };
  

  useEffect(() => {
    viewGuidance();
  }, []);

  return (
    <div>
      <div className='upload'>
        <input type='text' placeholder='add name' onChange={(e) => setName(e.target.value)} />
        <input type='file' ref={fileInputRef} />

        <button onClick={upload}>Upload file</button>
      </div>
      <div className='guidance p-5'>
      {guidance &&
  guidance.map((guidance) => (
    <div key={guidance._id} className='guidances'>
      <h3>{guidance.name}</h3>
      <button onClick={() => downloadGuidance(guidance._id)}>Download File</button>
    </div>
  ))}
      </div>
    </div>
  );
}
