import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { saveAs } from "file-saver";
import { useNavigate, useParams } from "react-router-dom";
import RequestList from "./RequestList";

const DownloadRequest = () => {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  const navigate = useNavigate();
  const { requestId } = useParams(); // Extracting requestId from URL params

  const handleOutsideClick = () => {
    setOpen(false);
    navigate("/ViewForRequest");
  };

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        // Fetching the generated PDF with requestId
        const response = await axios.get(
          `http://localhost:8000/fetchPdf/${requestId}`,
          {
            responseType: "blob",
          }
        );
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        saveAs(pdfBlob, `Purchase_Requisition_${requestId}.pdf`);

        // Redirecting after successful download
        navigate("/ViewForRequest");
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      }
    };

    fetchPDF(); // Fetch PDF on component mount
  }, [requestId, navigate]);

  return (
    <div>
      <RequestList />
    </div>
  );
};

export default DownloadRequest;