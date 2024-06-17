import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";

// Ensure pdfjs worker is correctly loaded
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ViewNoticePdf = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState("");
  const [prevPageNumber, setPrevPageNumber] = useState(null); // Store the previous page number
  const { noticeId } = useParams();
  const navigate = useNavigate();
  // Function to fetch PDF URL based on requestId
  const fetchPdfUrl = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/notice/viewPdf/${noticeId}`, {
        responseType: 'arraybuffer', // Ensure response is treated as binary data
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(blob);
      setPdfUrl(pdfUrl);
      setLoading(false);// Open the PDF in a new tab
    } catch (error) {
      console.error("Error fetching PDF:", error);
    }
  };


  // Call fetchPdfUrl when component mounts
  useEffect(() => {
    fetchPdfUrl();
  }, [noticeId]);

  // Function to handle page change
  const onPageChange = ({ pageNumber }) => {
    setPrevPageNumber(pageNumber); // Store the previous page number when page changes
    setPageNumber(pageNumber);
  };

  // Function to handle going back to the previous page
  const goBack = () => {
    navigate("/ManageNotice");
  };

  return (
    <div className="flex justify-center items-center h-full bg-gray-200 mt-24">

      {loading ? (
        <div className="text-gray-600">Loading...</div>
      ) : (
        <div className="border-4 border-black rounded-lg overflow-hidden">
          <Document
            file={pdfUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              onPageChange={onPageChange} // Call onPageChange when page changes
            />
          </Document>
          <div className="mt-4 flex justify-between items-center px-4">
            <p className="text-lg text-gray-600">
              Page {pageNumber} of {numPages}
            </p>
            <div className="space-x-2">
              <button
                onClick={goBack} 

                className="py-1 px-2 rounded bg-gray-400 text-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Back
              </button>
              <button
                onClick={() => setPageNumber(pageNumber - 1)}
                disabled={pageNumber <= 1}
                className="py-1 px-2 rounded bg-green-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Previous
              </button>
              <button
                onClick={() => setPageNumber(pageNumber + 1)}
                disabled={pageNumber >= numPages}
                className="py-1 px-2 rounded bg-green-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewNoticePdf;