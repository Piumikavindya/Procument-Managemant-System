const router = require('express').Router();
const passport = require('passport');
const { create, changePassword } = require('../controllers/user');
const { userValidator, validate } = require('../middlewares/validator');
const {isValidPassResetToken} =require("../middlewares/user");
// Add user create route
router.post("/create",userValidator, validate, create);
//Add forget Password route
router.post('/change-password', changePassword);
router.post('/verify-pass-reset-token',isValidPassResetToken, (req,res)=>{
    req.json({valid: true});
});

module.exports = router;