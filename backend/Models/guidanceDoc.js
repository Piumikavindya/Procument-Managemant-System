const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt =require("bcrypt");

const guidancedocSchema = new Schema({
  // username: {  // Add a unique username field
  //   type: String,
    
  // },
  name:{
    type: String,
    // required: [true,"please provide a name"]
  }, 
  file: {
    type: String,
    required: [true,"please provide a file"]
  }
  
});



// In guidanceDoc.js model file
module.exports = mongoose.model('guidancedoc', guidancedocSchema);

