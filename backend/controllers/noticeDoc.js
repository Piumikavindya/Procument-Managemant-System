

const Notice = require('../Models/noticeDoc');
const asyncWrapper = require('../middlewares/asyncWrapper');
const path = require("path");
const fs = require('fs');

// request from the frontend

exports.uploadnotice = async (req, res) => {
    try {
        const { username, name } = req.body;

        // Check if req.file is defined
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const file = req.file.path;

        // Log the file path to ensure it's correct
        console.log('File path:', file);

          // Split the file path string using backslash as delimiter
    const filePathParts = file.split("\\");

    // Get the last part of the array, which is the file name
    const fileNameWithTimestamp = filePathParts[filePathParts.length - 1];

    // Split the file name using underscore as delimiter
    const fileNameParts = fileNameWithTimestamp.split("_");

    // Get the second part of the array, which is the actual file name
    const actualName = fileNameParts.slice(1).join("_");

    console.log("Actual File Name:", name);

    // Rest of your code for creating and saving the notice
    const newNotice = new Notice({ username, name: name ? name : actualName, file });


        // Log the new notice object to ensure it's correct
        console.log('New notice:', newNotice);

        // Save the data in the database
        await newNotice.save();

        console.log('Saved to the database');
        res.json({ notice: newNotice, message: 'File successfully uploaded' });

    } catch (error) {
        console.error('Error saving notice:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




// get the all the guidance documents
exports.viewNotice = async (req, res) => {
    try {
      const noticeItems = await Notice.find();
      res.json({ notice: noticeItems });
    } catch (error) {
      console.error('Error fetching notice:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

exports.downloadNotice = async (req, res) => {
    try {
        const noticeId = req.params.id;

        const notice = await Notice.findById(noticeId);

        if (!notice) {
            return res.status(404).json({ status: "notice not found" });
        }

        const file = notice.file;
        const filepath = path.join(__dirname, `../${file}`);
        
        res.download(filepath);
        // Note: Since res.download() will end the response, the following line won't be executed.
        // You may want to remove the line below or handle it differently.
        // res.status(200).json(guidance);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error while downloading notice", error: err.message });
    }

};



exports.viewPdf = async (req, res) => {
  try {
    const noticeId = req.params.id;

    // Await the asynchronous call to find the guidance document
    const notice = await Notice.findById(noticeId);

    if (!notice) {
      return res.status(404).json({ status: "guidance not found" });
    }

    const file = notice.file;
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




// delete guidance
exports.deleterNotice = async (req,res)=>{
    let noticeId = req.params.id;
    try {
        // Use await here to wait for the deletion to complete
        await Notice.findByIdAndDelete(noticeId);
        res.status(200).send({ status: "notice deleted" });
      } catch (err) {
        // Use status 500 for server errors
        res.status(500).send({ status: "Error with delete notice", error: err.message });
      }
};


exports.viewPdf = async (req, res) => {
  try {
    const noticeId = req.params.id;

    // Await the asynchronous call to find the guidance document
    const notice = await Notice.findById(noticeId);

    if (!notice) {
      return res.status(404).json({ status: "guidance not found" });
    }

    const file = notice.file;
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
