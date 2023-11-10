const router = require('express').Router();
const passport = require('passport');
const { create } = require('../controllers/user');

// Add user route
router.post("/create",create);

module.exports = router;