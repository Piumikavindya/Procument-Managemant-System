const User = require('../Models/user');
// request from the frontend
exports.create = async (req,res) =>{
    const {name,email, password} = req.body;
// response will send to frontend
const newUser= new User({name,email, password})
//save the data in the database
await newUser.save()

    res.json({user: newUser});
};