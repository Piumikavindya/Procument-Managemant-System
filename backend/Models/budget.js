const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt =require("bcrypt");

const budgetSchema = new Schema({
    department:{
        type: String,
        enum: ['DEIE', 'DCEE','DMME','DCE','DMNNE','DIS', 'NONE']
      }, 
 
  budgetAllocation:{
    type: String,
    
  }, 
  usedAmount:{
    type: String,
    // required: true,
  }, 
  availableBalance: {
    type: String,

  }, 
  
});



module.exports = mongoose.model('Budget', budgetSchema);