
const express = require('express');
const { PDFDocument } = require('pdf-lib');
const { readFile, writeFile } = require('fs/promises');
const PdfRequest = require('../Models/pdfProcrequest');
const procReqest = require('../Models/procReqest');
const fs = require('fs');

exports.createPdf = async (req, res) => {
    try {
        // Extract requestId from route parameters
        const requestId = req.params.requestId;

        // Fetch data from the database
        const requestData = await procReqest.findOne({ requestId });

        // Load the PDF document
        const pdfDoc = await PDFDocument.load(await readFile('Requestion_form1.pdf'));
        const form = pdfDoc.getForm();
        const fields = form.getFields();

        // Map between PDF form field names and database field names
        const fieldMap = {
            'Text-vzEQJHbvSD': 'faculty',
            'Text-GKhWp3mWid': 'requestId',
            'Text-qD5Z1ICzXZ': 'date',
            'Text-o2aYzrJWlX': '',
            'Text-HqDzzcZGZS': 'department',
            'Text-tOrlO4jNBA': 'contactPerson',
            // Add more mappings as needed
        };

        // Loop through each field in the form
        for (let i = 0; i < fields.length; i++) {
            const fieldName = fields[i].getName();
            let fieldValue = '';

            // Set the text of specific fields based on the database data
            const dbFieldName = fieldMap[fieldName];
            if (dbFieldName) {
                // Check if the field is a date field
                if (dbFieldName === 'date' && requestData.date) {
                    fieldValue = requestData.date.toLocaleDateString(); // Convert date to string
                } else {
                    fieldValue = requestData[dbFieldName] || '';
                }
            } else {
                fieldValue = `Field ${i + 1}`;
            }

            console.log(`${fieldName}: ${fieldValue}`);
            fields[i].setText(fieldValue); // Set the text of the field
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


