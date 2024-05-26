const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const procProjectSchema = new Schema({
  projectId: {
    type: String,
    unique: true,
  },

    procurementRequests: [{
      requestId: String,
      faculty: { type: String },
      department: { type: String },
      date: { type: Date },
      contactPerson: { type: String },
      contactNo: { type: Number },
      budgetAllocation: { type: Number },
      usedAmount: { type: Number },
      balanceAvailable: { type: Number },
      purpose: {
        type: String,
        default: "normal",
        enum: ["", "normal", "Fast Track", "Urgent", "Normal"],
      },
      sendTo: {
        type: String,
        default: "dean",
        enum: ["", "dean", "registrar", "viceChancellor"],
      },
      items: [], // Array of items within ProcurementRequest schema
      files: [],
    }],

  projectTitle: {
    type: String,
  },
  biddingType: {
    type: String,
    default: "Direct Purchasing",
    enum: ["", "Direct Purchasing", "Shopping Method", "National Competitive Method (NCB)", "International Competitive Bidding (ICB)"],
  },
  closingDate: { type: Date },
  closingTime: { type: Date },
  appointTEC: [{ type: String }], // Array of appointTEC values
  appointBOCommite: [{ type: String }], // Array of appointBOCommite values
});

const procProject = mongoose.model("procProject", procProjectSchema);

module.exports = procProject;