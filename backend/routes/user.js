const router = require('express').Router();
const passport = require('passport');
const { create, changePassword, sendResetPasswordTokenStatus, resetPassword } = require('../controllers/user');
const { userValidator, validate, validatePassword } = require('../middlewares/validator');
const {isValidPassResetToken} =require("../middlewares/user");
// Add user create route
router.post("/create",userValidator, validate, create);
//Add forget Password route
router.post('/change-password', changePassword);
router.post('/verify-pass-reset-token',isValidPassResetToken,sendResetPasswordTokenStatus);
router.post('/reset-password', validatePassword, validate,isValidPassResetToken,resetPassword);

module.exports = router;