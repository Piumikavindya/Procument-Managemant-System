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
import BiddingDocumentsList from "./BiddingDocumentsList";

const DownloadBidDoc = () => {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  const navigate = useNavigate();
  const { projectId } = useParams(); 

  const handleOutsideClick = () => {
    setOpen(false);
    navigate("/biddingDocuments");
  };

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        // Fetching the generated PDF with requestId
        const response = await axios.get(
          `http://localhost:8000/procProject/downloadBidPdf/${projectId}`,
          {
            responseType: "blob",
          }
        );
        
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        saveAs(pdfBlob, `Bidding_Document_${projectId}.pdf`);

        // Redirecting after successful download
        navigate("/biddingDocuments");
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      }
    };

    fetchPDF(); // Fetch PDF on component mount
  }, [projectId, navigate]);

  return (
    <div>
      <BiddingDocumentsList />
    </div>
  );
};

export default DownloadBidDoc;