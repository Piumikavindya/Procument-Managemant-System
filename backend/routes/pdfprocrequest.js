// routes/pdfRoutes.js

const express = require('express');
const {createPdf,servePdf } = require('../controllers/pdfprocrequest');


const router = express.Router();

router.post('/createpdf', createPdf);
router.get('/serve/:filename',servePdf);

module.exports = router;
