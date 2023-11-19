const User = require('../Models/user');
const {generateMailTransporter} = require('../Utils/mail');
const PasswordResetToken = require("../Models/PasswordResetToken");


const { generateRandomByte, sendError } = require('../Utils/helper');
// request from the frontend
exports.create = async (req,res) =>{
    const {username,name,email, password,role} = req.body;
// response will send to frontend
const newUser= new User({username,name,email, password,role})
//save the data in the database
await newUser.save()

    res.json({user: newUser});
};

exports.changePassword = async(req,res)=>{
const {email} = req.body;
if(!email) return sendError(res, 'email is missing');

const user = await User.findOne({email})
if(!user) return sendError(res, 'User not found', 404);

const alreadyHasToken =  await  PasswordResetToken.findOne({owner: user._id})
if(alreadyHasToken) return sendError(res, 'Only after one hour you can request for another token ');



const token = await generateRandomByte();
// store otp inside the db
const newPasswordResetToken = await PasswordResetToken({owner: user._id, token})
await newPasswordResetToken.save();

const resetPasswordUrl = `http://localhost:3000/reset-password?token=${token}&id=${user._id}`;

var transport = generateMailTransporter();

const emailContent = `
  <p>Click  to reset your password</p>
  <a href="${resetPasswordUrl}">Change Password</a>
`;

transport.sendMail({
    from: 'security@procurementapp.com',
    to: user.email, 
    subject: 'Reset Password Link',
    html: emailContent,
});

res.json({ message: 'Link sent to your email' });
 
};