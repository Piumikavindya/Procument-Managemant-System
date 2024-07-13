const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");
const env = require("dotenv");

env.config();
exports.sendMail = async (req, res) => {
  
  try {
    const requestId = req.params.requestId;
    const pdfFileName = `Purchase_Requisition_${requestId}.pdf`;
    const pathToAttachment = path.join(
      __dirname,
      "..",
      "download",
      pdfFileName
    );
    const attachment = fs.readFileSync(pathToAttachment);

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
      to: process.env.RES,
      subject: "Request is Approved: Purchase Requisition",
      html: `
            <p>Dear Sir/Madam,</p>
            <p>This Requation form is Approved.</p>
            <p><strong>Thank you</strong> You can start bidding Process</p>
            <p><strong>Best regards,</strong><br>Approver</p> `,
      attachments: [
        {
          filename: "Purchase_Requisition.pdf",
          content: attachment,
          contentType: "application/pdf",
        },
      ],
    });

    res.send("Mail has been sent to your email. Check your mail");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("An error occurred while sending the email.");
  }
};
