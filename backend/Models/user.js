const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt =require("bcrypt");

const userSchema = new Schema({
  username: {  // Add a unique username field
    type: String,
    unique: true, // Ensure uniqueness

  },
  firstname:{
    type: String,
    
  }, 
  lastname:{
    type: String,
    
  },
  email: {
    type: String,

  }, 
  password:{
    type: String,

  }, 
 employeeNumber:{
    type: String,

  }, 
  department:{
    type: String,
    enum: ['DEIE', 'DCEE','MME ','DCE','DMNNE','DIS', 'NONE']
  }, 
  role:{
    type: String,
    default: 'admin',
    enum: ['admin', 'department','procurement Officer','TECofficer','approver','Finance officers']
  }
});

userSchema.plugin(passportLocalMongoose);
userSchema.pre('save', async function(next){
  if (this.isModified('password')) {
    // Debug log
    console.log('Before save:', this);

    this.password = await bcrypt.hash(this.password, 8);

    // Debug log
    console.log('After hashing password:', this);
}

    next();
});

userSchema.methods.comparePassword = async function (password){
  const result = await bcrypt.compare(password, this.password);
  return result;
};

module.exports = mongoose.model('User', userSchema);