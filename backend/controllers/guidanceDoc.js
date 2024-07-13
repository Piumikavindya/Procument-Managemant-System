// backend/controllers/guidanceController.js
const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
const Guidance = require("../Models/guidanceDoc");
const apiKeyConfig = require('../config');

// Load Google API credentials
const SCOPE = ['https://www.googleapis.com/auth/drive.file'];

// Authorize Google API
async function authorize() {
    const jwtClient = new google.auth.JWT(
        apiKeyConfig.client_email,
        null,
        apiKeyConfig.private_key,
        SCOPE
    );

    await jwtClient.authorize();
    return jwtClient;ju                                            
}

// Upload file to Google Drive
async function uploadFileToGoogleDrive(authClient, filePath, fileName) {
    const drive = google.drive({ version: 'v3', auth: authClient });

    const fileMetaData = {
        name: fileName,
        parents: ['1-NmJvQp6PHhibDRr0zyi7eY7LBZeoU7D'] // Replace with your folder ID
    };

    const media = {
        mimeType: 'application/pdf',
        body: fs.createReadStream(filePath)
    };

    const response = await drive.files.create({
        resource: fileMetaData,
        media: media,
        fields: 'id'
    });

    return response.data.id; // Return the file ID from Google Drive
}

// Download file from Google Drive
async function downloadFileFromGoogleDrive(authClient, fileId, res) {
    const drive = google.drive({ version: 'v3', auth: authClient });

    const response = await drive.files.get(
        { fileId: fileId, alt: 'media' },
        { responseType: 'stream' }
    );

    response.data
        .on('end', () => console.log('Download completed'))
        .on('error', err => console.error('Error downloading file:', err))
        .pipe(res);
}

// Delete file from Google Drive
async function deleteFileFromGoogleDrive(authClient, fileId) {
    const drive = google.drive({ version: 'v3', auth: authClient });

    await drive.files.delete({ fileId: fileId });
}

// Upload guidance document
exports.upload = async (req, res) => {
    try {
        const { name } = req.body;

        // Check if req.file is defined
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const file = req.file.path;
        const fileNameWithTimestamp = path.basename(file);
        const actualName = name || fileNameWithTimestamp.split('_').slice(1).join('_');

        // Authorize and upload to Google Drive
        const authClient = await authorize();
        const googleDriveFileId = await uploadFileToGoogleDrive(authClient, file, actualName);

        // Create a new guidance document with Google Drive file ID
        const newGuidance = new Guidance({ name: actualName, file: googleDriveFileId });

        // Save the data in the database
        await newGuidance.save();

        res.json({ guidance: newGuidance, message: "File successfully uploaded to Google Drive" });
    } catch (error) {
        console.error("Error saving guidance:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// View all guidance documents
exports.viewGuidance = async (req, res) => {
    try {
        const guidanceItems = await Guidance.find();
        res.json({ guidance: guidanceItems });
    } catch (error) {
        console.error("Error fetching guidance:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Download guidance document
exports.downloadGuidance = async (req, res) => {
    try {
        const guidanceId = req.params.id;
        const guidance = await Guidance.findById(guidanceId);

        if (!guidance) {
            return res.status(404).json({ status: "Guidance not found" });
        }

        const authClient = await authorize();
        await downloadFileFromGoogleDrive(authClient, guidance.file, res);
    } catch (error) {
        console.error('Error downloading guidance:', error);
        res.status(500).json({ status: "Error while downloading guidance", error: error.message });
    }
};

// View PDF guidance document
exports.viewPdf = async (req, res) => {
    try {
        const guidanceId = req.params.id;
        const guidance = await Guidance.findById(guidanceId);

        if (!guidance) {
            return res.status(404).json({ status: "Guidance not found" });
        }

        const authClient = await authorize();
        res.setHeader("Content-Type", "application/pdf");
        await downloadFileFromGoogleDrive(authClient, guidance.file, res);
    } catch (error) {
        console.error("Error viewing PDF:", error);
        res.status(500).send("An error occurred while viewing the PDF");
    }
};

// Delete guidance document
exports.deleteGuidance = async (req, res) => {
    try {
        const guidanceId = req.params.id;
        const guidance = await Guidance.findById(guidanceId);

        if (!guidance) {
            return res.status(404).json({ status: "Guidance not found" });
        }

        const authClient = await authorize();
        await deleteFileFromGoogleDrive(authClient, guidance.file);

        await Guidance.findByIdAndDelete(guidanceId);

        res.status(200).json({ status: "Guidance deleted" });
    } catch (error) {
        console.error('Error deleting guidance:', error);
        res.status(500).json({ status: "Error with delete guidance", error: error.message });
    }
};
