const router = require('express').Router();
const { upload,viewGuidance, downloadGuidance } = require('../controllers/guidanceDoc');
const uploads = require('../middlewares/multer');

// Add user create route
// Separate route for POST request to upload a file
router.post("/upload", uploads.single('file'), (req, res) => {
    console.log("Received a request to create a guidance:", req.body);
    upload(req, res);
});

// Separate route for GET request to view guidance
router.get('/view-guidance', viewGuidance);

  router.put("/download/:id", downloadGuidance);
 
  module.exports = router;