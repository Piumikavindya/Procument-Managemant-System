// SendRequest.js
import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import RequestList from "./RequestList";

const SendRequest = () => {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  const navigate = useNavigate();
  const { requestId, sendTo } = useParams(); // Access sendTo from URL params
  const handleOutsideClick = () => {
    setOpen(false);
    navigate("/ViewForRequest");
  };
  useEffect(() => {
    const sendPDF = async () => {
      try {
        await axios.post(
          `http://localhost:8000/sendPdf/${requestId}/${sendTo}`,
      
        );
        alert("PDF sent successfully");
        navigate("/ViewForRequest");
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      }
    };

    sendPDF();
  }, [requestId, sendTo, navigate]);
  return (
    <div>
      <RequestList />
     
    </div>
  );
};

export default SendRequest;
