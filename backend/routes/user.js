const router = require('express').Router();
const passport = require('passport');
const { create, changePassword, sendResetPasswordTokenStatus, resetPassword, signIn,updateUser, deleterUser } = require('../controllers/user');
const { userValidator, validate, validatePassword, signInValidator } = require('../middlewares/validator');
const {isValidPassResetToken} =require("../middlewares/user");


// Add user create route
router.post("/create",userValidator, validate, create);
// add signIn route
router.post("/signIn",signInValidator, validate, signIn);
//Add forget Password route
router.post('/change-password', changePassword);
router.post('/verify-pass-reset-token',isValidPassResetToken,sendResetPasswordTokenStatus);
router.post('/reset-password', validatePassword, validate,isValidPassResetToken,resetPassword);
router.put("/update/:id", updateUser);
//router.post("/delete/:id", deleterUser)
module.exports = router;