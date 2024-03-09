
const express = require('express');
const { PDFDocument } = require('pdf-lib');
const { readFile, writeFile } = require('fs/promises');
const PdfRequest = require('../Models/pdfprocrequest');
const fs = require('fs');

exports.createPdf = async (req, res) => {
    try {
        const { inputPath, outputPath } = req.body;

        const newRequest = new PdfRequest({ inputPath, outputPath });
        await newRequest.save(); // Save request details (optional)

        let loadedPdfDoc; // Declare loadedPdfDoc outside the nested try...catch block

        try {
            const fileData = await fs.promises.readFile(inputPath);
            loadedPdfDoc = await PDFDocument.load(fileData); // Assign to loadedPdfDoc only if successful
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.error(`Error: File not found: ${inputPath}`);
                res.status(404).send('File not found');
            } else {
                console.error("Error reading or loading PDF:", error);
                res.status(500).send('Error creating PDF');
            }
        }

        if (loadedPdfDoc) {
            const fields = loadedPdfDoc.getForm().getFields();

            if (fields.length > 0) {
                const formattedFields = [];
                for (const field of fields) {
                    formattedFields.push({ name: field.name, value: field.getValue() });
                }

                res.send(formattedFields); // Send extracted fields in a JSON array
                console.log({ fields });
                const pdfBytes = await loadedPdfDoc.save();
                await writeFile(outputPath, pdfBytes, (err) => {
                    if (err) {
                        console.error(`Error writing PDF file: ${err}`);
                        res.status(500).send('Error creating PDF');
                    } else {
                        res.send('PDF created successfully!');
                    }
                });
            } else {
                console.log("No form fields found in the PDF document.");
                res.status(404).send('No form fields found in the PDF document.');
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating PDF');
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


