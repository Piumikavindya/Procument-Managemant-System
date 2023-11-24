const User = require('../Models/user');
const {generateMailTransporter} = require('../Utils/mail');
const PasswordResetToken = require("../Models/PasswordResetToken");


const { generateRandomByte, sendError } = require('../Utils/helper');
const user = require('../Models/user');
// request from the frontend

exports.create = async (req,res) =>{
    const {username,name,email, password,role} = req.body;
// response will send to frontend
const newUser= new User({username,name,email, password,role})
//save the data in the database

try {
    console.log('New User:', newUser);
    await newUser.save();
    
    res.json({ user: newUser });
} catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
};

// get the all the users
exports.viewUsers = async (req,res) =>{
   User.find().then((Users)=>{
    res.json(Users)
   }).catch((err)=>{
    console.log(err);
   })

};

exports.previewUser = async (req,res) =>{
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            
            return res.status(404).json({ status: "user not found" });
        }
        

        res.status(200).json(user); 
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "Error with getting user", error: err.message });
    }
 
 };



exports.updateUser = async (req,res)=>{
    let userId = req.params.id;

    const { username, name, email, password,role } = req.body;

    const updateUser = {
       username,
       name,
       email,
       password,
       role
    };

    try {
        const updatedUser = await user.findByIdAndUpdate(userId, updateUser, { new: true });
        res.status(200).json({ status: "User updated", user: updatedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error with updating User", error: err.message });
    }
};


exports.deleterUser = async (req,res)=>{
    let userId = req.params.id;

    await user.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status:"User deleted"}).catch((err)=>{
            res.status(500).send({status: "Error with delete user"})
        })
    });
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

const transport = generateMailTransporter();

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

exports.sendResetPasswordTokenStatus =  (req,res)=>{
    res.json({valid: true});
};

exports.resetPassword =  async (req,res)=>{
    const {newPassword,userId }= req.body;
    
    const user =  await User.findById(userId)
    const matched = await user.comparePassword(newPassword)
    if(matched) return sendError(res,'the new password must be different from the old one ');

    user.password = newPassword;
await user.save();

// remove the old password from the database

await PasswordResetToken.findByIdAndDelete(req.resetToken._id);


const transport = generateMailTransporter();

const emailContent = `
  <h1>Password Reset Sucessfully</h1>
  <p> Now you can use new Password </p>
`;

transport.sendMail({
    from: 'security@procurementapp.com',
    to: user.email, 
    subject: 'Password Reset Sucessfully',
    html: emailContent,
});

res.json({ message: 'Password reset sucessfully, Now you can use new Password' });
 
};

exports.signIn = async (req,res) =>{

   
        const {email,password} = req.body;

        const user = await User.findOne({email})
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
          }


    const matched= await user.comparePassword(password);
    if(!matched) return sendError(res,'Email/Password mismatch!');

    const {_id, name, role} = user;
   // const jwtToken = jwt.sign({userId: _id}, 'dfjjjjlkhf5454ggmnkfkj8787')

   res.json({user: {id: _id, name,  role}});
   
   
}



