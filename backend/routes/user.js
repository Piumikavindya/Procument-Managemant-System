const router = require('express').Router();
const passport = require('passport');
const { create } = require('../controllers/user');

// Add user create route
router.post("/create",create);

module.exports = router;