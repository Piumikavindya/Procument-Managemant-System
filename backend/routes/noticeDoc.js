const router = require('express').Router();
const { uploadNotice, viewNotice, downloadNotice, deleteNotice, viewPdf } = require('../controllers/noticeDoc');
const uploads = require('../middlewares/multer');

// Route to upload a notice (POST request)
router.post("/uploadnotice", uploads.single('file'), uploadNotice);

// Route to view all notices (GET request)
router.get('/view-notice', viewNotice);

// Route to download a notice (GET request)
router.get("/download/:id", downloadNotice);

// Route to delete a notice (DELETE request)
router.delete("/delete/:id", deleteNotice);

// Route to view PDF of a notice (GET request)
router.get('/viewPdf/:id', viewPdf);

module.exports = router;
