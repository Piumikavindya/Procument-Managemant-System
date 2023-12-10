const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt =require("bcrypt");
// this Item attributes check with the client
const ItemSchema = new Schema({
  username: {  // Add a unique username field
    type: String,
   
   
  },
  itemName:{
    type: String,
    required: true,
  }, 
  AssetsClass:{     // need to take information from client about assets and need to update this enum
    type: String,
    default: 'Current Assets',
    enum: ['Current Assets', 'Inventory ','Supplier Assets','Contractual Assets']
  },
  AssetsSubClass:{
    type: String,

  },
});



module.exports = mongoose.model('Item', ItemSchema);
