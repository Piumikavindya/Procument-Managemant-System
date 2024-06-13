const Guidance = require("../Models/guidanceDoc");
const asyncWrapper = require("../middlewares/asyncWrapper");
const path = require("path");
const fs = require('fs');
// request from the frontend
const PDFDocument = require("pdfkit");
exports.upload = async (req, res) => {
  try {
    const { name} = req.body;

    // Check if req.file is defined
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const file = req.file.path;

    // Log the file path to ensure it's correct
    console.log("File path:", file);



    // Split the file path string using backslash as delimiter
    const filePathParts = file.split("\\");

    // Get the last part of the array, which is the file name
    const fileNameWithTimestamp = filePathParts[filePathParts.length - 1];

    // Split the file name using underscore as delimiter
    const fileNameParts = fileNameWithTimestamp.split("_");

    // Get the second part of the array, which is the actual file name
    const actualName = fileNameParts.slice(1).join("_");

    console.log("Actual File Name:", name);

    // Rest of your code for creating and saving the guidance
    const newGuidance = new Guidance({ name: name ? name : actualName, file });

    // Log the new guidance object to ensure it's correct
    console.log("New guidance:", newGuidance);

    // Save the data in the database
    await newGuidance.save();

    console.log("Saved to the database");
    res.json({ guidance: newGuidance, message: "File successfully uploaded" });
  } catch (error) {
    console.error("Error saving guidance:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get the all the guidance documents
exports.viewGuidance = async (req, res) => {
  try {
    const guidanceItems = await Guidance.find();
    res.json({ guidance: guidanceItems });
  } catch (error) {
    console.error("Error fetching guidance:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.downloadGuidance = async (req, res) => {
  try {
    const guidanceId = req.params.id;

    const guidance = await Guidance.findById(guidanceId);

    if (!guidance) {
      return res.status(404).json({ status: "guidance not found" });
    }

    const file = guidance.file;
    const filepath = path.join(__dirname, `../${file}`);

    res.download(filepath);
    // Note: Since res.download() will end the response, the following line won't be executed.
    // You may want to remove the line below or handle it differently.
    // res.status(200).json(guidance);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: "Error while downloading guidance", error: err.message });
  }
};

exports.viewPdf = async (req, res) => {
  try {
    const guidanceId = req.params.id;

    // Await the asynchronous call to find the guidance document
    const guidance = await Guidance.findById(guidanceId);

    if (!guidance) {
      return res.status(404).json({ status: "guidance not found" });
    }

    const file = guidance.file;
    const pdfFilePath = path.join(__dirname, '..', file);

    // Check if the file exists
    if (!fs.existsSync(pdfFilePath)) {
      return res.status(404).json({ error: "File not found" });
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

// // view details of perticular user
// exports.previewSupplyer = async (req,res) =>{
//     const supplyerId = req.params.id;

//     try {
//         const supplyer = await Supplyer.findById(supplyerId);
//         if (!supplyer) {

//             return res.status(404).json({ status: "suppler not found" });
//         }

//         res.status(200).json(supplyer);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ status: "Error with getting supplyer", error: err.message });
//     }

//  };

// //update user details
// exports.updateSupplyer = async (req,res)=>{
//     let supplyerId = req.params.id;

//     const { username,supplierName,email, address,contactOfficer,contactNumber,faxNumber,typeofBusiness,classOfAssets} = req.body;

//     const updateSupplyer = {
//        username,
//        supplierName,
//        email,
//        address,
//        contactOfficer,
//        contactNumber,
//        faxNumber,
//        typeofBusiness,
//        classOfAssets,
//     };

//     try {
//         const updatedSupplyer = await guidance.findByIdAndUpdate(supplyerId, updateSupplyer, { new: true });
//         res.status(200).json({ status: "supplyer updated", supplyer: updatedSupplyer });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ status: "Error with updating User", error: err.message });
//     }
// };

// delete guidance
exports.deleteGuidance = async (req, res) => {
  let guidanceId = req.params.id;
  try {
    const deletedGuidance = await Guidance.findByIdAndDelete(guidanceId);
    if (!deletedGuidance) {
      return res.status(404).send({ status: 'Guidance not found' });
    }
    res.status(200).send({ status: 'Guidance deleted' });
  } catch (err) {
    res.status(500).send({ status: 'Error with delete guidance', error: err.message });
  }
};