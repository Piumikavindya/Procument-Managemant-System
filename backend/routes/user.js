const router = require('express').Router();
const passport = require('passport');
const { create, changePassword, sendResetPasswordTokenStatus, resetPassword, signIn,updateUser, viewUsers,deleterUser, previewUser } = require('../controllers/user');
const { userValidator, validate, validatePassword, signInValidator } = require('../middlewares/validator');
const {isValidPassResetToken} =require("../middlewares/user");


// Add user create route
router.post("/create", userValidator, validate,create, (req, res) => {
    console.log("Received a request to create a user:", req.body);
    create(req, res);
  });
  // virw all users
router.get('/view-users', viewUsers);
router.get("/preview-user/:id", previewUser)
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleterUser)
// add signIn route
router.post("/signIn",signInValidator, validate, signIn);
//Add forget Password route
router.post('/change-password', changePassword);
router.post('/verify-pass-reset-token',isValidPassResetToken,sendResetPasswordTokenStatus);
router.post('/reset-password', validatePassword, validate,isValidPassResetToken,resetPassword);

module.exports = router;


