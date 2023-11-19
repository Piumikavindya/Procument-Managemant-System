const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt =require("bcrypt");

const userSchema = new Schema({
  username: {  // Add a unique username field
    type: String,
    unique: true, // Ensure uniqueness
    required: true,
  },
  name:{
    type: String,
    required: true,
  }, 
  email: {
    type: String,

  }, 
  password:{
    type: String,

  }, 
  role:{
    type: String,
    default: 'admin',
    enum: ['admin', 'department','SuplyOfficer','TECofficer']
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
})

module.exports = mongoose.model('User', userSchema);
