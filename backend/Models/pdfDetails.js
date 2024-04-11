const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PdfDetailsSchema = new Schema(
  {
    filename: {
      type: String,
      required: true,
      unique: true // Ensure uniqueness of filenames
    },
    pdfData: {
      type: Buffer,
    },
  },
  { collection: "PdfDetails" }
);


module.exports = mongoose.model('PdfDetails', PdfDetailsSchema);
