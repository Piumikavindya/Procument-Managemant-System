
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    filename: {type: String,},
    file: {type: String,},
    filepath:{type: String,},
    
  });
  
  const itemSchema = new Schema({
    itemId: {
      type: String,
      default: function () {
          // Ensure the counter is initialized and incremented
          this.constructor.counter = this.constructor.counter || 1;
          return 'Item' + String(this.constructor.counter++).padStart(3, '0');
      },
  },
    itemName: {type: String,},
      cost: {type: Number,},
      qtyRequired: {type: Number,},
      qtyAvailable: {type: Number,},
   
  });
const procRequestSchema = new Schema({
  requestId: {
    type: String,
    required: true,
    unique: true,
  },
  department: {type: String,},
  date:{type: Date,},
  contactNo: {type: String,},
  contactPerson: {type: String,},
budgetAllocation: {type: Number,},
  usedAmount:{type: Number,},
  balanceAvailable:{type: Number,},
  purpose:{
    type: String,
    default: 'Normal',
    enum: ['Normal', 'Fast Track','Urgent']
  },
  items: [itemSchema],  // Array of items within ProcurementRequest schema
  files: [fileSchema],  // Array of files within ProcurementRequest schema

});

const procReqest = mongoose.model('procRequest', procRequestSchema);

module.exports = procReqest;
