const express = require('express');
const { sendMail } = require("../controllers/SendVendorsMail");

const router = express.Router();

router.post('/invite/:projectId/:biddingType', sendMail);// Route to send PDF as an email

module.exports = router;