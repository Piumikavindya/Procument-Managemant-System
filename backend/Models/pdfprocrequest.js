const mongoose = require('mongoose');

const pdfRequestSchema = new mongoose.Schema({
  inputPath: {
    type: String,
    required: true,
  },
  outputPath: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('PdfRequest', pdfRequestSchema);