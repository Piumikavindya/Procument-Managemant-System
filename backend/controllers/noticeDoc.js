const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
const Notice = require('../Models/noticeDoc');
const { client_email, private_key } = require('../config'); // Adjust path as per your configuration

// Load Google API credentials
const SCOPE = ['https://www.googleapis.com/auth/drive.file'];

// Authorize Google API
async function authorize() {
    const jwtClient = new google.auth.JWT(
        client_email,
        null,
        private_key,
        SCOPE
    );

    await jwtClient.authorize();
    return jwtClient;
}

// Upload file to Google Drive
async function uploadFileToGoogleDrive(authClient, filePath, fileName) {
    const drive = google.drive({ version: 'v3', auth: authClient });

    const fileMetaData = {
        name: fileName,
        parents: ['18mkiYvR3XmOdQxiGSpZm9W_lcdHycEYs'] // Replace with your folder ID
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

// Delete file from Google Drive
async function deleteFileFromGoogleDrive(authClient, fileId) {
    const drive = google.drive({ version: 'v3', auth: authClient });

    try {
        await drive.files.delete({
            fileId: fileId
        });

        console.log('File deleted successfully from Google Drive');
    } catch (error) {
        console.error('Error deleting file from Google Drive:', error);
        throw error; // Propagate the error back
    }
}

// Upload notice function
exports.uploadNotice = async (req, res) => {
    try {
        const { username, name } = req.body;

        // Check if req.file is defined
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const file = req.file.path;

        // Extract file name
        const fileNameWithTimestamp = path.basename(file);
        const actualName = name || fileNameWithTimestamp.split('_').slice(1).join('_');

        // Authorize and upload to Google Drive
        const authClient = await authorize();
        const googleDriveFileId = await uploadFileToGoogleDrive(authClient, file, actualName);

        // Create a new notice with Google Drive file ID
        const newNotice = new Notice({ username, name: actualName, file: googleDriveFileId });

        // Save the data in the database
        await newNotice.save();

        res.json({ notice: newNotice, message: 'File successfully uploaded to Google Drive' });

    } catch (error) {
        console.error('Error uploading notice:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// View all notices
exports.viewNotice = async (req, res) => {
    try {
        const noticeItems = await Notice.find();
        res.json({ notice: noticeItems });
    } catch (error) {
        console.error('Error fetching notice:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Download notice document
exports.downloadNotice = async (req, res) => {
    try {
        const noticeId = req.params.id;
        const notice = await Notice.findById(noticeId);

        if (!notice) {
            return res.status(404).json({ status: "Notice not found" });
        }

        const authClient = await authorize();
        await downloadFileFromGoogleDrive(authClient, notice.file, res);

    } catch (error) {
        console.error('Error downloading notice:', error);
        res.status(500).json({ status: "Error while downloading notice", error: error.message });
    }
};

// View PDF of notice document
exports.viewPdf = async (req, res) => {
    try {
        const noticeId = req.params.id;
        const notice = await Notice.findById(noticeId);

        if (!notice) {
            return res.status(404).json({ status: "Notice not found" });
        }

        const authClient = await authorize();
        res.setHeader("Content-Type", "application/pdf");
        await downloadFileFromGoogleDrive(authClient, notice.file, res);

    } catch (error) {
        console.error("Error viewing PDF:", error);
        res.status(500).send("An error occurred while viewing the PDF");
    }
};

// Delete notice document
exports.deleteNotice = async (req, res) => {
    try {
        const noticeId = req.params.id;
        const notice = await Notice.findById(noticeId);

        if (!notice) {
            return res.status(404).json({ status: "Notice not found" });
        }

        const authClient = await authorize();
        await deleteFileFromGoogleDrive(authClient, notice.file);

        await Notice.findByIdAndDelete(noticeId);

        res.status(200).json({ status: "Notice deleted" });

    } catch (error) {
        console.error('Error deleting notice:', error);
        res.status(500).json({ status: "Error with delete notice", error: error.message });
    }
};

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
