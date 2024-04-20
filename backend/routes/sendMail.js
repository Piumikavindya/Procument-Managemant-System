const express = require('express');
const {sendMail}= require( "../controllers/sendMail.js");

const router = express.Router();


router.post('/sendMail/:requestId', sendMail); // Route to send PDF as an email

module.exports = router;