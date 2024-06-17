const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const PaperAddPdf = require("pdfkit-table");
const PaperAdd = require("../Models/paperAdvertisement");

exports.createPaperAdvertisement = async (req, res) => {
  try {
    const requestData = req.body;

    const pdfFileName = `Advertisement_${requestData.advertisementId}.pdf`;
    const pdfDirPath = path.join(__dirname, "..", "paperAdds");
    const pdfFilePath = path.join(pdfDirPath, pdfFileName);

    if (!fs.existsSync(pdfDirPath)) {
      fs.mkdirSync(pdfDirPath, { recursive: true });
    }

    const doc = new PaperAddPdf({ size: "A4" });
    const outputStream = fs.createWriteStream(pdfFilePath);
    doc.pipe(outputStream);

    const logoPath = path.join(__dirname, "..", "images", "logo.jpg");
    doc.image(logoPath, 260, 20, { width: 60 ,align: "center" });

    doc.font("Helvetica-Bold");
    doc.fontSize(12).text("University of Ruhuna - Matara", { align: "center" },110);
    doc.moveDown();

    doc.fontSize(12).text("Invitation for Bids (IFB)", { align: "center" },130);
    doc.moveDown();

    doc.fontSize(12).text(
        requestData.projectTitle,
      { align: "center" }
    );
    doc.moveDown();

    doc.fontSize(10).text(
      "1. The Chairman, Department Procurement Committee on behalf of the Vice Chancellor, University of Ruhuna now invites sealed bids from eligible and qualified bidders for the Supply, Delivery, Installation, Commissioning, Testing and Maintenance of the following goods for the University of Ruhuna."
    );
    doc.moveDown();

    doc.fontSize(12).text(requestData.projectId, { align: "left" });
    doc.moveDown(2);

    const table = {
      headers: ["Item No", "Goods Description", "Qty", "Non-refundable Tender Fee (Rs.)", "Bid Security (Rs.)"],
      rows: [
        [{ text: "Package No 01-Laboratory Equipment", alignment: "center" }, "", "", "", ""],
        ["1.1", "Control System Design Trainer kit", "2", "30,000.00", "1,000.00"],
        ["1.2", "Analog AC Milliameter (100 mA)", "2", "1,400.00", "1,000.00"],
        ["1.3", "Analog DC Milliameter (100 mA)", "2", "1,400.00", "1,000.00"],
        ["1.4", "Analog DC Voltmeter (30V)", "2", "1,400.00", "1,000.00"],
        ["1.5", "DC Voltmeter (300 V)", "2", "1,400.00", "1,000.00"],
        ["1.6", "Indicator Double knob (10 k)", "2", "1,400.00", "1,000.00"],
        ["1.7", "Capacitor Decade Box (10 nF)", "2", "1,400.00", "1,000.00"],
        ["1.8", "Resistor Decade Box (10 MΩ)", "2", "1,400.00", "1,000.00"],
        ["1.9", "Desktop computer with Digital Storage Oscilloscope", "15", "12,500.00", "4,000.00"],
        ["1.10", "Function Generator", "1", "4,000.00", "1,500.00"],
        ["1.11", "Power Supply (0-30V)", "5", "21,000.00", "2,000.00"],
        ["1.12", "Multimeter", "10", "5,000.00", "2,000.00"],
        ["1.13", "Oscilloscope", "1", "50,000.00", "4,000.00"],
        [{ text: "Package No 02 – Computer & Network Equipment", alignment: "center" }, "", "", "", ""],
        ["2.1", "2U Rack Server (Type 01)", "1", "35,000.00", "10,000.00"],
        ["2.2", "2U Rack Server (Type 02)", "2", "45,000.00", "15,000.00"],
        ["2.3", "3kVA Online UPS", "5", "10,000.00", "12,000.00"],
        ["2.4", "2kVA Online UPS", "6", "5,000.00", "5,000.00"],
        ["2.5", "Cisco L3 RAM upgrade for ISR router", "5", "6,000.00", "6,000.00"],
        ["2.6", "GP Workstation (Type 01)", "8", "30,000.00", "40,000.00"],
        ["2.7", "GP Workstation (Type 02)", "8", "20,000.00", "10,000.00"],
        ["2.8", "Handheld DC Belt Drive", "2", "8,000.00", "4,000.00"],
        ["2.9", "HP Workstation", "5", "30,000.00", "10,000.00"],
        ["2.10", "Laptop Computers", "8", "20,000.00", "20,000.00"],
        ["2.11", "Desktop Computers", "10", "20,000.00", "20,000.00"],
        ["2.12", "All-in-One PC", "4", "30,000.00", "30,000.00"],
        ["2.13", "Apple Mac Mini Server", "3", "10,000.00", "10,000.00"],
        ["2.14", "Network Switches", "6", "50,000.00", "5,000.00"],
        ["2.15", "Cisco Switch (24-Ports)", "4", "20,000.00", "10,000.00"],
        ["2.16", "Routers (Cisco ISR-4321) with IOS-XE Image", "2", "10,000.00", "7,000.00"]
      ]
    };

    doc.table(table, { width: 500 });
    
    doc.addPage();
    
    const additionalText = [
      " Bidding will be conducted through National Competitive Bidding (NCB) procedures.",
      ` A complete set of Bidding Documents (in English) can be obtained from the ${requestData.address} up to ${requestData.lastDate} by making a payment of a non-refundable tender fee as given above either to the Shroff counter, or by submitting the same copy of payment slip after making payment of a non-refundable tender fee as given in the above table to the A/C No  ${requestData.accountNo}(People’s Bank, Galle Main Street) through any branch of the People’s Bank.`,
      ` Bid shall be valid up ${requestData.validateTime}`,
      "Evaluation shall be done item by item basis.",
      "Bid shall be accompanied by a bid security (unconditional) as relevant to the applicable bidding items, issued by an acceptable commercial bank operating in Sri Lanka.",
      `Bid security should be addressed to "${requestData.sendAddress}" and shall be valid up to ${requestData. validityPeriod} `,
      `Deadline for submission of bids shall be ${requestData.deadline}`,
      `Pre bid meeting will be held on  ${requestData.meetingPlaceAddress} `,
      `Duly completed sealed bids in duplicate shall be sent under registered cover to receive on or before above closing time to the ${requestData. sendFinalDocumentAddress} or deposited in the Tender Box 01 place at the office of Registrar, University of Ruhuna, Wellamadama, Matara before above closing time. Late bids shall be rejected. Name, Tender Number and Package Number should be indicated in the left-hand top corner of envelope.`,

      "11. Bids shall be opened immediately after closing of bids at the above address and Bidders or their authorized representatives are requested to be present at the opening of the bids.",
      `12. Interested bidders may obtain further information from ${requestData. furtherInformationAddress}.`
    ];

    additionalText.forEach((text, index) => {
      doc.fontSize(12).text(`${index + 2}. ${text}`, { align: "left" });
      doc.moveDown();
    });

    doc.moveDown(2);

    doc.font("Helvetica-Bold");
    doc.fontSize(12).text("The Chairman,", { align: "left" });
    doc.text("Department Procurement Committee,", { align: "left" });
    doc.text("University of Ruhuna,", { align: "left" });
    doc.text("Wellamadama, Matara.", { align: "left" });
    doc.text(requestData.publishDate, { align: "left" });
    
    doc.end();

    outputStream.on("finish", () => {
      console.log(`PaperAdvertisement ${pdfFilePath} generated successfully.`);
      res.download(pdfFilePath);
    });
  } catch (error) {
    console.error("Error generating paper advertisement:", error.message);
    res.status(500).send("Error generating paper advertisement");
  }
};

exports.viewPaperAdvertisement = (req, res) => {};
