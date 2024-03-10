const procReqest = require('../Models/procReqest');
const path = require("path");
// const fs = require('fs').promises;

// Generate Request ID
exports.generateRequestId = async (req, res) => {
    try {
        const latestRequest = await procReqest.findOne({}, {}, { sort: { requestId: -1 } });
        const newRequestId = latestRequest
          ? 'REQ' + String(Number(latestRequest.requestId.slice(3)) + 1).padStart(3, '0')
          : 'REQ001';
    
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
    // items,
    // files
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

exports.deleteRequest = async (req, res) => {
  try {
    await procReqest.deleteOne({ requestId: req.params.requestId });
    res.json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add Item to Request

exports.addProcItem = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { description, cost, qtyRequired, qtyAvailable } = req.body;

    const updatedRequest = await procReqest.findOneAndUpdate(
      { requestId },
      {
        $push: {
          items: {
            description,
            cost,
            qtyRequired,
            qtyAvailable,
          },
        },
      },
      { new: true }
    );

    res.json({ message: 'Item added successfully', updatedRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.veiwProcItems = async (req, res) => {
  try {
    const { requestId } = req.params;

    // Find the request by ID and select only the items field
    const request = await procReqest.findOne({ requestId }).select('items');

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

    res.json({message: 'Item deleted successfully',updatedRequest});
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
      return res.status(404).json({ error: 'File not found' });
    }

    // Replace backslashes with forward slashes in the file path
    const filepath = file.filepath.replace(/\\/g, '/');

    // Check if the file exists
    if (!fs.existsSync(filepath)) {
      return res.status(404).json({ error: 'File not found on the server' });
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
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




exports.deleteFile = async (req, res) => {
  try {
    const updatedRequest = await procReqest.findOneAndUpdate(
      { requestId: req.params.requestId },
      { $pull: { files: { _id: req.params.filename } } }, // Using the string directly
      { new: true }
    );

    res.json({message : 'file deleted successfully',updatedRequest});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


