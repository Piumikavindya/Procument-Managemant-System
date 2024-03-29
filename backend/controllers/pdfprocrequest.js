
const express = require('express');
const { PDFDocument } = require('pdf-lib');
const { readFile, writeFile } = require('fs/promises');
const PdfRequest = require('../Models/pdfprocrequest');
const fs = require('fs');

exports.createPdf = async (req, res) => {
    try {
        const pdfDoc = await PDFDocument.load(await readFile('Requestion_form1.pdf'));
        const form = pdfDoc.getForm();
        const fields = form.getFields();

        // Loop through each field in the form
        for (let i = 0; i < fields.length; i++) {
            const fieldName = fields[i].getName();
            const fieldNumber = i + 1;
            const fieldValue = `Field ${fieldNumber}`;
            console.log(`${fieldName}: ${fieldValue}`);
            fields[i].setText(fieldValue); // Assign a unique number to each field
        }

        const pdfBytes = await pdfDoc.save();
        await writeFile('output5.pdf', pdfBytes);
        console.log('PDF created successfully!');
        
        res.status(200).send('PDF created successfully!');
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ error: 'Error generating PDF', message: error.message });
    }
};




exports.servePdf = (req, res) => {
    const filename = 'output4.pdf'; // Replace with actual filename if needed

    const filePath = `${filename}`; // Adjust file path as needed
  
    try {
      if (fs.existsSync(filePath)) {
        const pdfData = fs.readFileSync(filePath);
        res.contentType('application/pdf');
        res.send(pdfData);
      } else {
        res.status(404).send('PDF not found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error serving PDF');
    }
  };


