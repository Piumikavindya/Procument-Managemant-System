const express = require('express');
const { sendMail } = require("../controllers/SendVendorsMail");

const router = express.Router();

router.post('/invite/:projectId', sendMail);// Route to send PDF as an email

module.exports = router;
