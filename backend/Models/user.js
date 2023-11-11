const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt =require("bcrypt");

const userSchema = new Schema({
  name:{
    type: String,
  }, 
  email: {
    type: String,

  }, 
  password:{
    type: String,

  }, 
});

userSchema.plugin(passportLocalMongoose);
userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,8)
      
    }

    next();
})

module.exports = mongoose.model('User', userSchema);
