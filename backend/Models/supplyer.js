const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt =require("bcrypt");

const supplyerSchema = new Schema({
  username: {  // Add a unique username field
    type: String,
    unique: true, // Ensure uniqueness
    // required: true,
  },
 
  supplierId:{
    type: String,
    
  }, 
  supplierName:{
    type: String,
    // required: true,
  }, 
  email: {
    type: [String,]

  }, 
  address:{
    type: String,

  }, 
  contactOfficer:{
    type: String,

  }, 
  contactNumber :{
    type: [String,]

  }, 
  faxNumber1 :{
    type: String,

  }, 

  faxNumber2 :{
    type: String,

  }, 
  typeofBusiness:{
    type: String,
    // default: 'SoleImporter',
    // enum: ['SoleImporter', 'SoleDistributor ','LocalAgent','contractors']
  },
  classOfAssets :{
    type: String,

  },
});



module.exports = mongoose.model('Supplyer', supplyerSchema);