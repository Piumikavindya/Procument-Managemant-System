const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pdfSchema = new Schema({
  filename: {
    type: String,
    required: true,
  },
 
});

module.exports = mongoose.model("PdfModel", pdfSchema);
