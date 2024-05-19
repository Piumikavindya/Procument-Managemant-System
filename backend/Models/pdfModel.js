const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    filename: {type: String,},
    file: {type: String,},
    filepath:{type: String,},
    
  });
  const specificationSchema = new Schema({
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
      action: {type: String,},
   
  });
const procRequestSchema = new Schema({
  requestId: {
    type: String,
    
    unique: true,
  },
  faculty: {type: String,},
  department: {type: String,},
  date:{type: Date,},
  contactPerson: {type: String,},
  contactNo: {type: Number,},
   budgetAllocation: {type: Number,},
  usedAmount:{type: Number,},
  balanceAvailable:{type: Number,},
  purpose:{
    type: String,
    default: 'normal',
    enum: [ '','normal', 'Fast Track','Urgent','Normal']
  },
  sendTo:{
    type: String,
    default: 'dean',
    enum: ['','dean', 'registrar','viceChancellor']
  },
  
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
 
  items: [itemSchema],  // Array of items within ProcurementRequest schema
  files: [fileSchema],  // Array of files within ProcurementRequest schema
  specifications: [specificationSchema]
});


const procReqest = mongoose.model('procRequest', procRequestSchema);

module.exports = procReqest;