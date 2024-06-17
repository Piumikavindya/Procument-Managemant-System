const router = require('express').Router();
const { uploadnotice,viewNotice, downloadNotice, deleterNotice,viewPdf } = require('../controllers/noticeDoc');
const uploads = require('../middlewares/multer');

// Add user create route
// Separate route for POST request to upload a file
router.post("/uploadnotice", uploads.single('file'), (req, res) => {
    console.log("Received a request to create a notice:", req.body);
    uploadnotice(req, res);
});

// Separate route for GET request to view guidance
router.get('/view-notice', viewNotice);

  router.get("/download/:id", downloadNotice);
  router.delete("/delete/:id", deleterNotice);
  router.get('/viewPdf/:id', viewPdf);
  
  module.exports = router;