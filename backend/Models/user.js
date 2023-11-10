const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  name:{
    type: String,
    trim: true,
    required: true
  }, 
  email: {
    type: String,
    trim: true,
    unique:true,
    required: true
  }, 
  password:{
    type: String,
 
    required: true
  }, 
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
