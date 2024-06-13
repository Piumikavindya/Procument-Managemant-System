// controllers/SendVendorsMail.js
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");
const env = require("dotenv");
const Supplier = require('../Models/supplyer'); 

env.config();

exports.sendMail = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { supplierIds } = req.body;

    if (!Array.isArray(supplierIds) || supplierIds.length === 0) {
      return res.status(400).send("No suppliers selected.");
    }

    const vendors = await Supplier.find({ _id: { $in: supplierIds } });

    const vendorEmails = vendors.flatMap(vendor => vendor.email);
console.log(vendorEmails);
    if (vendorEmails.length === 0) {
      return res.status(400).send("No valid email addresses found for the selected suppliers.");
    }

    const pdfFileName = `Bidding_Document_${projectId}.pdf`;
    const pathToAttachment = path.join(__dirname, "..", "projects", pdfFileName);
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
      to: vendorEmails,
      subject: "Bidding Document",
      html: `
        <p>Dear Sir/Madam,</p>
        <p>We are sending the Bidding Document from Foe, UOR</p>
        <p><strong>Best regards,</strong><br>Faculty of Engineering <br> Uniersity of Ruhuna</p>`,
      attachments: [
        {
          filename: pdfFileName,
          content: attachment,
          contentType: "application/pdf",
        },
      ],
    });

    res.send("Mail has been sent to the selected vendors. Check your email.");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("An error occurred while sending the email.");
  }
};
