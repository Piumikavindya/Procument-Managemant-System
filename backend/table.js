// Importing required modules 
const PDFDocument = require("pdfkit"); 
const fs = require("fs"); 

// Creating a new instance of PDFDocument class 
const doc = new PDFDocument(); 

// Piping the output stream to a file 
// named "output.pdf" 
doc.pipe(fs.createWriteStream("new.pdf")); 

// Setting font for professional look
doc.font('Helvetica');

// Setting the fill color to black and 
// font size to 15 
doc.fillColor("black") 
	.fontSize(15) 
	.text("Official Document", {align: 'center'}) 
	.moveDown(0.5); 

// Defining the dimensions for the box
const boxWidth = 450;
const boxHeight = 200;
const startX = (doc.page.width - boxWidth) / 2;
const startY = 120;

// Drawing the box
doc.rect(startX, startY, boxWidth, boxHeight)
    .stroke();

// First part - Displaying user
const userX = startX + 20;
const userY = startY + 20;

doc.fontSize(20)
    .fillColor("black")
    .text("User Details", userX, userY)
    .fontSize(15)
    .text("Username: John Doe", userX, userY + 30);

// Second part - Label-input fields
const labelX = startX + boxWidth / 2;
const labelY = startY + 20;

doc.fontSize(20)
    .fillColor("black")
    .text("Input Fields", labelX, labelY);

const inputX = startX + boxWidth / 2;
const inputY = labelY + 40;

const labels = ["Label 1:", "Label 2:", "Label 3:", "Label 4:"];
const inputs = ["Input 1", "Input 2", "Input 3", "Input 4"];

labels.forEach((label, index) => {
    doc.fontSize(15)
        .fillColor("black")
        .text(label, inputX, inputY + index * 30);

    doc.moveTo(inputX + 60, inputY + index * 30)
        .lineTo(inputX + 250, inputY + index * 30)
        .stroke();

    doc.fontSize(12)
        .fillColor("black")
        .text(inputs[index], inputX + 65, inputY + index * 30 + 8);
});

// Ending the document 
doc.end();
