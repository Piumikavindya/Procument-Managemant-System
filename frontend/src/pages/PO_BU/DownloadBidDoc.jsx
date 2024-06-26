import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import { useNavigate, useParams } from "react-router-dom";
import BiddingDocumentsList from "./BiddingDocumentsList";

const DownloadBidDoc = () => {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  const navigate = useNavigate();
  const { projectId, biddingType } = useParams(); // Include biddingType in the params

  const handleOutsideClick = () => {
    setOpen(false);
    navigate("/biddingDocuments");
  };

  useEffect(() => {
    console.log("projectId:", projectId); // Add console log
    console.log("biddingType:", biddingType); // Add console log
    const fetchPDF = async () => {
      try {
        // Fetching the generated PDF with projectId and biddingType
        const response = await axios.get(
          `http://localhost:8000/procProject/downloadBidPdf/${projectId}/${biddingType}`,
          {
            responseType: "blob",
          }
        );

        // Determine the filename based on biddingType
        let fileName;
        if (biddingType === "Direct Purchasing") {
          fileName = `Direct_Purchasing_${projectId}.pdf`;
        } else if (biddingType === "Shopping Method") {
          fileName = `National_Shopping_${projectId}.pdf`;
        } else {
          fileName = `Bidding_Document_${projectId}.pdf`;
        }

        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        saveAs(pdfBlob, fileName);

        // Redirecting after successful download
        navigate("/biddingDocuments");
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPDF(); // Fetch PDF on component mount
  }, [projectId, biddingType, navigate]);

  return (
    <div>
      <BiddingDocumentsList />
    </div>
  );
};

export default DownloadBidDoc;
