const procReqest = require("../Models/procReqest");
const user = require("../Models/user");
const path = require("path");
// const fs = require('fs').promises;

const { PDFDocument, rgb } = require("pdf-lib");
// const fs = require('fs').promises;

// Generate Request ID
exports.generateRequestId = async (req, res) => {
  try {
    const latestRequest = await procReqest.findOne(
      {},
      {},
      { sort: { requestId: -1 } }
    );
    const newRequestId = latestRequest
      ? "REQ" +
        String(Number(latestRequest.requestId.slice(3)) + 1).padStart(3, "0")
      : "REQ001";

    // Creating an instance of the model
    const newRequestInstance = new procReqest({
      requestId: newRequestId,
    });

    // Saving the instance to the database
    const savedRequest = await newRequestInstance.save();

    // Respond with the generated ID and the saved document
    res.json({ requestId: savedRequest.requestId, savedRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createRequest = async (req, res) => {
  const requestId = req.params.requestId;
  const {
    faculty,
    department,
    date,
    contactNo,
    contactPerson,
    budgetAllocation,
    usedAmount,
    balanceAvailable,
    purpose,
    sendTo,
    //items,
    //files
  } = req.body;

  try {
    // Find the existing document with the provided requestId
    const existingRequest = await procReqest.findOne({ requestId });

    if (existingRequest) {
      // Update the existing document with additional fields
      existingRequest.faculty = faculty;
      existingRequest.department = department;
      existingRequest.date = date;
      existingRequest.contactNo = contactNo;
      existingRequest.contactPerson = contactPerson;
      existingRequest.budgetAllocation = budgetAllocation;
      existingRequest.usedAmount = usedAmount;
      existingRequest.balanceAvailable = balanceAvailable;
      existingRequest.purpose = purpose;
      existingRequest.sendTo = sendTo;
      // existingRequest.items = items;
      // existingRequest.files = files;
      // existingRequest.items = items;
      // existingRequest.files = files;

      // Save the updated document to the database
      const updatedRequest = await existingRequest.save();
      console.log(updatedRequest);
      // Send the updated document as a response
      res.json(updatedRequest);
    } else {
      // If no document is found, create a new one
      const newprocReqest = new procReqest({
        requestId,
        faculty,
        department,
        date,
        contactNo,
        contactPerson,
        budgetAllocation,
        usedAmount,
        balanceAvailable,
        purpose,
        sendTo,
        // items,
        // files
      });

      // Save the new document to the database
      const createdRequest = await newprocReqest.save();

      // Send the created document as a response
      res.json(createdRequest);
    }
  } catch (error) {
    console.error("Error in createRequest:", error);
    // Handle errors and send an appropriate response
    res.status(500).json({ error: error.message });
  }
};

exports.viewAllRequests = async (req, res) => {
  try {
    // Fetch all requests from the database
    const allRequests = await procReqest.find();

    // Send the list of requests as a response
    res.json(allRequests);
  } catch (error) {
    console.error("Error fetching all requests:", error);
    // Handle errors and send an appropriate response
    res.status(500).json({ error: error.message });
  }
};

exports.viewRequestById = async (req, res) => {
  try {
    const { requestId } = req.params;

    // Find the request by ID
    const request = await procReqest.findOne({ requestId });

    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    // Send the request as a response
    res.json(request);
  } catch (error) {
    console.error("Error fetching request by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteRequest = async (req, res) => {
  let requestID = req.params.id;

  try {
    await procReqest.findByIdAndDelete(requestID);
    res.status(200).send({ status: "Request is deleted" });
  } catch (err) {
    res.status(500).send({ status: "Error with delete request" });
  }
};

// Add Item to Request

exports.addProcItem = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { itemName, cost, qtyRequired, qtyAvailable } = req.body;

    const updatedRequest = await procReqest.findOneAndUpdate(
      { requestId },
      {
        $push: {
          items: {
            itemName,
            cost,
            qtyRequired,
            qtyAvailable,
          },
        },
      },
      { new: true }
    );

    res.json({ message: "Item added successfully", updatedRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.veiwProcItems = async (req, res) => {
  try {
    const { requestId } = req.params;

    // Find the request by ID and select only the items field
    const request = await procReqest.findOne({ requestId }).select("items");

    // Check if request is null
    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    // Send the procurement items associated with the request as a response
    res.json(request.items);
  } catch (error) {
    console.error("Error fetching procurement items:", error);
    // Handle errors and send an appropriate response
    res.status(500).json({ error: error.message });
  }
};

// Delete Item from Request
exports.deleteProcItem = async (req, res) => {
  try {
    const updatedRequest = await procReqest.findOneAndUpdate(
      { requestId: req.params.requestId },
      { $pull: { items: { itemId: req.params.itemId } } },
      { new: true }
    );

    res.json({ message: "Item deleted successfully", updatedRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.uploadFile = async (req, res) => {
  try {
    const fileData = {
      filepath: req.file.path, // Store the full path to the file
      filename: req.file.originalname,
      // Add other file-related information as needed
    };

    const updatedRequest = await procReqest.findOneAndUpdate(
      { requestId: req.params.requestId },
      { $push: { files: fileData } },
      { new: true }
    );

    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.uploadSpecification = async (req, res) => {
  try {
    const specificationData = {
      filepath: req.file.path, // Store the full path to the file
      filename: req.file.originalname,
    };

    // Update the document in the database with the specifications
    const updatedRequest = await procReqest.findOneAndUpdate(
      { requestId: req.params.requestId },
      { $push: { specifications: specificationData } },
      { new: true }
    );

    res.json(updatedRequest);
  } catch (error) {
    console.error("Error uploading specification:", error);
    res.status(500).json({ error: "Failed to upload specification" });
  }
};

exports.downloadFile = async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const fileId = req.params.id;

    const request = await procReqest.findOne({ requestId });

    if (!request) {
      return res.status(404).json({ status: "Request not found" });
    }

    const file = request.files.find((file) => file._id.toString() === fileId);

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    // Replace backslashes with forward slashes in the file path
    const filepath = file.filepath.replace(/\\/g, "/");

    // Check if the file exists
    if (!fs.existsSync(filepath)) {
      return res.status(404).json({ error: "File not found on the server" });
    }

    // Send the file for download
    res.download(filepath, file.filename);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.viewFiles = async (req, res) => {
  try {
    const requests = await procReqest.find();
    const allFiles = [];

    // Iterate through each request and extract files
    requests.forEach((request) => {
      const files = request.files.map((file) => ({
        requestId: request.requestId,
        filename: file.filename,
        filepath: file.filepath,
      }));
      allFiles.push(...files);
    });

    res.json({ files: allFiles });
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const updatedRequest = await procReqest.findOneAndUpdate(
      { requestId: req.params.requestId },
      { $pull: { files: { _id: req.params.filename } } }, // Using the string directly
      { new: true }
    );

    res.json({ message: "file deleted successfully", updatedRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.generatePdf = async (req, res) => {
  try {
    const { requestId } = req.params;

    // Find the request document by ID
    const request = await procReqest.findOne({ requestId });

    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    // Add text to the PDF
    const text = `
      Faculty: ${request.faculty}
      Department: ${request.department}
      Date: ${request.date}
      Contact No: ${request.contactNo}
      Contact Person: ${request.contactPerson}
      Budget Allocation: ${request.budgetAllocation}
      Used Amount: ${request.usedAmount}
      Balance Available: ${request.balanceAvailable}
      Purpose: ${request.purpose}
      Send To: ${request.sendTo}
      Items: ${request.items.map((item) => item.itemName).join(", ")}
    `;
    page.drawText(text, {
      x: 50,
      y: 750,
    });

    // Serialize the PDF
    const pdfBytes = await pdfDoc.save();

    // Set response headers for PDF download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${requestId}.pdf"`
    );

    // Send the PDF as a downloadable file
    res.send(pdfBytes);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res
      .status(500)
      .json({ error: "Error generating PDF", message: error.message });
  }
};

exports.downloadPdf = async (req, res) => {
  const requestId = req.params.requestId;

  try {
    // Generate PDF bytes
    const pdfBytes = await exports.generatePdf(requestId);

    // Set response headers for PDF download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="request_${requestId}.pdf"`
    );

    // Send the PDF as a downloadable file
    res.send(pdfBytes);
  } catch (error) {
    if (error.message === "Request not found") {
      return res.status(404).json({ error: "Request not found" });
    }
    console.error("Error downloading PDF:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const fs = require('fs').promises;
// const docx = require('docx');

// const inputPath = 'test.docx'; // Path to your Word template
// const outputPath = 'output.docx'; // Path to save the generated document

// exports.generateWordDocument = async (req, res) => {
//   try {
//     const { requestId } = req.params;

//     // Retrieve request data from MongoDB
//     const request = await procReqest.findOne({ requestId });

//     if (!request) {
//       return res.status(404).json({ error: 'Request not found' });
//     }

//     // Read the Word template
//     const templateBuffer = await fs.readFile(inputPath);

//     // Create a new document from the template buffer
//     const doc = new docx.Document(templateBuffer);

//     // Check if options2 is defined and contains the sections property
//     if (!options2 || !options2.sections || !Array.isArray(options2.sections)) {
//       throw new Error('Error generating Word document: options2.sections is not defined or not an array');
//     }

//     // Iterate over each section and add it to the document
//     for (const section of options2.sections) {
//       this.addSection(section);
//     }

//     // Replace placeholders with data in the entire document text
//     doc.getBody().getChildren().forEach((child) => {
//       if (child instanceof docx.Paragraph) {
//         const text = child.getText();
//         const updatedText = text
//           .replace('{{requestId}}', request.requestId)
//           .replace('{{purpose}}', request.purpose)
//           .replace('{{sendTo}}', request.sendTo);
//         // Add other placeholder replacements as needed
//         child.removeChildren();
//         child.addRun(new docx.TextRun({ text: updatedText }));
//       }
//     });

//     // Serialize the document to a buffer
//     const buffer = await docx.Packer.toBuffer(doc);

//     // Write the buffer content to the output file
//     await fs.writeFile(outputPath, buffer);

//     // Set response headers for Word download
//     res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
//     res.setHeader('Content-Disposition', `attachment; filename="output.docx"`);

//     // Send the Word document as a downloadable file
//     res.send(buffer);
//   } catch (error) {
//     console.error('Error generating Word document:', error);
//     res.status(500).json({ error: 'Error generating Word document', message: error.message });
//   }
// };

const fs = require("fs");
const { promisify } = require("util");
const Docxtemplater = require("docxtemplater");

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const inputPath = "test1.docx"; // Path to your Word template
const outputPath = "output.docx"; // Path to save the generated document

exports.generateWordDocument = async (req, res) => {
  try {
    const requestId = req.params.requestId;

    // Find data from the database using requestId
    const data = await procReqest.findOne({ requestId });

    if (!data) {
      return res.status(404).send("Request not found");
    }

    console.log("Data:", data);

    // Read the Word template
    const templateData = await readFileAsync(inputPath, "binary");

    console.log("Template data:", templateData);

    // Initialize the docxtemplater with the template data
    const doc = new Docxtemplater();
    doc.loadZip(templateData);

    // Set the data for placeholders
    doc.setData({
      faculty: data.faculty,
      requestId: data.requestId,
      department: data.department,
      purpose: data.purpose,
      sendTo: data.sendTo,
      // Add other placeholders and corresponding data fields as needed
    });

    // Render the template
    doc.render();

    // Get the rendered document as a binary buffer
    const renderedBuffer = doc.getZip().generate({ type: "nodebuffer" });

    // Write the rendered document to the output path
    await writeFileAsync(outputPath, renderedBuffer);

    // Set response headers for Word download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    res.setHeader("Content-Disposition", `attachment; filename="output.docx"`);

    // Send the Word document as a downloadable file
    res.sendFile(outputPath);
  } catch (error) {
    console.error("Error generating Word document:", error);
    res.status(500).send("Error creating Word document");
  }
};
