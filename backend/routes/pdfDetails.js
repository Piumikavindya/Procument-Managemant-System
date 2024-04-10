// routes/pdfRoutes.js

const express = require('express');
const {createPdf,servePdf } = require('../controllers/pdfprocrequest');


const router = express.Router();

require("./pdfDetails");

module.exports = router;
