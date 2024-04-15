const pdf = require("html-pdf");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");
const pdfTemplate = require("../documents/document");
const env = require("dotenv");
const PdfModel = require("../Models/pdfDetails");

env.config();

exports.createPdf = async (req, res) => {
  const options = {
    format: "A4",
  };

  const pdfFileName = `Purchase_Requisition_${req.body.requestId}.pdf`;

  const pdfFilePath = path.join(__dirname, "..", "download", pdfFileName);

  try {
    pdf
      .create(pdfTemplate(req.body), options)
      .toFile(pdfFilePath, async (err) => {
        if (err) {
          console.error("Error generating PDF:", err);
          return res.status(500).send("Error generating PDF");
        }

        const pdfData = fs.readFileSync(pdfFilePath);
        await savePdfToMongoDB(pdfData, pdfFileName);
        res.send("PDF generated, stored in MongoDB, and uploaded successfully");
      });
  } catch (error) {
    console.error("Error creating PDF:", error);
    res.status(500).send("An error occurred while generating PDF");
  }
};

async function savePdfToMongoDB(pdfData, filename) {
  try {
    const newPdf = new PdfModel({
      filename: filename,
      data: pdfData,
    });
    await newPdf.save();
    console.log("PDF saved successfully in MongoDB");
  } catch (error) {
    console.error("Error saving PDF to MongoDB:", error);
    throw new Error("An error occurred while storing the PDF in MongoDB");
  }
}

exports.fetchPdf = (req, res) => {
    const requestId = req.params.requestId;

  const pdfFileName = `Purchase_Requisition_${requestId}.pdf`;

  const pdfFilePath = path.join(__dirname, "..", "download", pdfFileName);

 
  res.sendFile(pdfFilePath);
};

exports.sendPdf = async (req, res) => {
    try {
      const requestId = req.params.requestId;
      const sender = req.params.sendTo; // Corrected to req.body.sender
      const pdfFileName = `Purchase_Requisition_${requestId}.pdf`;
      const pathToAttachment = path.join(__dirname, "..", "download", pdfFileName);
      const attachment = fs.readFileSync(pathToAttachment);
  
      // Define recipients based on sender type
      let recipients;
      switch (sender) {
        case "dean":
          recipients = "imashanaw1999@gmail.com";
          break;
        case "registrar":
          recipients = "imashanaw1999@gmail.com";
          break;
        case "viceChancellor":
          recipients = "usertestoneapp@gmail.com";
          break;
        default:
          recipients = ""; // Provide a default email or handle this case accordingly
          break;
      }
  
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: "Gmail",
        port: 465,
        secure: true,
        auth: {
          user: process.env.USER,
          pass: process.env.PASSWORD,
        },
        tls: { rejectUnauthorized: false },
      });
  
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: recipients, 
        subject: "Request for Approval: Purchase Requisition",
        html: `
          <p>Dear Sir/Madam,</p>
          <p>We are submitting this purchase requisition form to request approval for the procurement of necessary items for the department. The items listed in the form are essential for continuing academic activities in the department. Your timely approval will enable us to proceed with the procurement process efficiently.</p>
          <p><strong>Thank you</strong> for your attention to this matter.</p>
          <p><strong>Best regards,</strong><br>department</p> `,
        attachments: [
          {
            filename: "Purchase_Requisition.pdf",
            content: attachment,
            contentType: "application/pdf",
          },
        ],
      });
  
      res.send("Mail has been sent to the appropriate recipient.");
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send("An error occurred while sending the email.");
    }
  };
  


exports.viewPdf = (req, res) => {
  try {
    const requestId = req.params.requestId;
    const pdfFileName = `Purchase_Requisition_${requestId}.pdf`;
    const pdfFilePath = path.join(__dirname, "..", "download", pdfFileName);

    // Check if the file exists
    if (!fs.existsSync(pdfFilePath)) {
      return res.status(404).send("PDF not found");
    }

    // Set the content type header
    res.setHeader("Content-Type", "application/pdf");


    // Stream the file to the response
    const stream = fs.createReadStream(pdfFilePath);
    stream.pipe(res);
  } catch (error) {
    console.error("Error viewing PDF:", error);
    res.status(500).send("An error occurred while viewing the PDF");
  }
};
