const express = require('express');
const {createPaperAdvertisement,viewPaperAdvertisement } = require('../controllers/paperAdvertisement');


const router = express.Router();

router.post('/createPaperAdd', createPaperAdvertisement);
router.get('/viewPaperAdd',viewPaperAdvertisement);

module.exports = router;
