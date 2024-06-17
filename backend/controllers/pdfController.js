const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const nodemailer = require("nodemailer");
const env = require("dotenv");
const PdfModel = require("../Models/pdfDetails");
const ProcRequest= require("../Models/procReqest"); // Import your Mongoose model
env.config();

exports.createPdf = async (req, res) => {
  try {
    const requestData = req.body; // Corrected variable name
    const options = {
      format: "A4",
    };

    const pdfFileName = `Purchase_Requisition_${requestData.requestId}.pdf`; // Corrected variable name

    const pdfFilePath = path.join(__dirname, "..", "download", pdfFileName);

    // Creating a new instance of PDFDocument class
    const doc = new PDFDocument();

    // Piping the output stream to a file named "output.pdf"
    const outputStream = fs.createWriteStream(pdfFilePath); // Corrected output file path
    doc.pipe(outputStream);

    // Setting font for professional look
    doc.font("Helvetica");
    // Load university logo
    const logoPath =
      "E:/Procument-Managemant-System/backend/images/logo.jpg";
    doc.image(logoPath, 10, 10, { width: 60 });

    // University header text
    doc.fontSize(12).text("UNIVERSITY OF RUHUNA - MATARA ", 75, 10);

    // University header text
    doc
      .fontSize(12)
      .font("Helvetica-Bold")
      .text("PURCHASE REQUISITION FORM", 75, 25);
    doc.font("Helvetica");
    // Contact information
    doc
      .fontSize(8)
      .text("Supplies Branch", 75, 40)
      .text("Tel: Extension 2115 Fax 041 2227027", 75, 55)
      .text("E-mail: sabs@admin.ruh.ac.lk", 75, 70)
      .text("Web: http://www.ruh.ac.lk", 75, 85);
    // Drawing the first input field box
    const firstInputBoxX = 464; // Adjusted X-coordinate for the first input box
    const firstInputBoxY = 25; // Adjusted Y-coordinate for the first input box
    const inputBoxWidth = 140; // Width of the input box
    const inputBoxHeight = 20; // Height of the input box

    doc
      .rect(firstInputBoxX, firstInputBoxY, inputBoxWidth, inputBoxHeight) // Drawing the rectangle for the first input box
      .stroke();

    // Adding label for the first input field box
    const firstInputLabel = "Form No-" + requestData.requestId;
    const firstInputLabelX = firstInputBoxX + 5; // Adjusted X-coordinate for the label
    const firstInputLabelY = firstInputBoxY + 5; // Adjusted Y-coordinate for the label

    doc
      .fontSize(8)
      .fillColor("black")
      .text(firstInputLabel, firstInputLabelX, firstInputLabelY);

    // Drawing the second input field box
    const secondInputBoxX = 464; // Adjusted X-coordinate for the second input box
    const secondInputBoxY = 50; // Adjusted Y-coordinate for the second input box

    doc
      .rect(secondInputBoxX, secondInputBoxY, inputBoxWidth, inputBoxHeight) // Drawing the rectangle for the second input box
      .stroke();

    // Adding label for the second input field box
    const secondInputLabel = "Date-" + requestData.date;
    const secondInputLabelX = secondInputBoxX + 5; // Adjusted X-coordinate for the label
    const secondInputLabelY = secondInputBoxY + 5; // Adjusted Y-coordinate for the label

    doc
      .fontSize(8)
      .fillColor("black")
      .text(secondInputLabel, secondInputLabelX, secondInputLabelY);

    // Adding the text "To be Completed in triplicate"
    const triplicateTextX = 400; // Adjusted X-coordinate for the text
    const triplicateTextY = 85; // Adjusted Y-coordinate for the text

    doc
      .fontSize(10)
      .fillColor("black")
      .font("Helvetica-Oblique") // Applying italic font style
      .text("To be Completed in triplicate", triplicateTextX, triplicateTextY);

    doc.font("Helvetica");

    // Defining the dimensions for the first box
    const firstBoxWidth = 600;
    const firstBoxHeight = 90;
    const firstBoxStartX = (doc.page.width - firstBoxWidth) / 2;
    const firstBoxStartY = 100;

    // Drawing the first box
    doc
      .rect(firstBoxStartX, firstBoxStartY, firstBoxWidth, firstBoxHeight)
      .stroke();

    // First part - Displaying user
    const userX = firstBoxStartX + 12;
    const userY = firstBoxStartY + 30;
    const userWidth = 40; // Adjust this value to your preference

    doc
      .fontSize(10)
      .fillColor("black")
      .text("User", userX, userY, { width: userWidth }) // Added width option
      .fontSize(8);

    // Draw a vertical line to separate sections
    doc
      .moveTo(userX + userWidth + 20, firstBoxStartY) // Adjusted X-coordinate
      .lineTo(userX + userWidth + 20, firstBoxStartY + firstBoxHeight)
      .stroke();

    // Second part - Label-input fields for the first box
    const firstBoxLabelX = firstBoxStartX + 80; // Adjusted X-coordinate for labels
    const firstBoxLabelY = firstBoxStartY + 10;
    const firstBoxInputX = firstBoxLabelX + 90; // Adjusted input field starting position
    const firstBoxInputY = firstBoxLabelY;
    const firstBoxLabelWidth = 150; // Adjusted width for labels
    const firstBoxInputWidth = 420; // Adjusted width for input fields to leave space
    const firstBoxInputTextXOffset = 5; // Offset for input text X-coordinate

    const firstBoxLabels = [
      "Faculty/Admin ",
      "Department/Branch ",
      "Contact Person ",
      "Telephone No ",
    ];
    const firstBoxInputs = [
      requestData.faculty,
      requestData.department,
      requestData.contactPerson,
      requestData.contactNo,
    ]; // Populate with data from MongoDB

    firstBoxLabels.forEach((label, index) => {
      doc
        .fontSize(10) // Increased font size for labels
        .fillColor("black")
        .text(label, firstBoxLabelX, firstBoxLabelY + index * 20, {
          width: firstBoxLabelWidth,
        }); // Adjusted X-coordinate and added width option for labels

      // Draw a rectangle for each input field
      doc
        .rect(
          firstBoxInputX,
          firstBoxInputY + index * 20 - 8,
          firstBoxInputWidth,
          20
        ) // Adjusted X-coordinate and width for input fields
        .stroke();

      // Add input text inside the rectangle
      doc
        .fontSize(8)
        .fillColor("black")
        .text(
          firstBoxInputs[index],
          firstBoxInputX + firstBoxInputTextXOffset,
          firstBoxInputY + index * 20 + 5
        ); // Adjusted X-coordinate for input text
    });

    ///////////////////////////////////////////////////////////
    // Add a new box after the first one
    const secondBoxStartY = firstBoxStartY + firstBoxHeight + 5; // Adjusted Y-coordinate for the second box
    const secondBoxWidth = 600;
    const secondBoxHeight = 140;
    const secondBoxStartX = firstBoxStartX; // Keep the same start X-coordinate for the second box

    doc
      .rect(secondBoxStartX, secondBoxStartY, secondBoxWidth, secondBoxHeight)
      .stroke();

    // First part - Displaying Funds
    const fundsX = secondBoxStartX + 10; // Adjusted X-coordinate for funds
    const fundsY = secondBoxStartY + 30; // Adjusted Y-coordinate for funds
    const fundsWidth = 40; // Adjust this value to your preference

    doc
      .fontSize(10)
      .fillColor("black")
      .text("Funds", fundsX, fundsY, { width: fundsWidth }) // Added width option
      .fontSize(8);

    // Draw a vertical line to separate sections
    doc
      .moveTo(fundsX + fundsWidth + 20, secondBoxStartY) // Adjusted X-coordinate
      .lineTo(fundsX + fundsWidth + 20, secondBoxStartY + secondBoxHeight)
      .stroke();

    // Second part - Label-input fields for the second box
    const secondBoxFirstLabelX = secondBoxStartX + 80; // Adjusted X-coordinate for labels
    const secondBoxFirstLabelY = secondBoxStartY + 12;
    const secondBoxFirstInputX = secondBoxFirstLabelX + 90; // Adjusted input field starting position
    const secondBoxFirstInputY = secondBoxFirstLabelY;
    const secondBoxFirstLabelWidth = 110; // Adjusted width for labels
    const secondBoxFirstInputWidth = 50; // Adjusted width for input fields to leave space
    const secondBoxFirstInputTextXOffset = 5; // Offset for input text X-coordinate

    const secondBoxFirstLabels = ["Fund GOSL Yes", "Project", "Vote"];
    const secondBoxFirstInputs = [
      "", // Sample data, replace with actual data
      "", // Sample data, replace with actual data
      "", // Sample data, replace with actual data
    ];

    secondBoxFirstLabels.forEach((label, index) => {
      // Calculate the X-coordinate for each label and input field
      const labelX = secondBoxFirstLabelX + index * 180; // Adjusted X-coordinate for labels
      const inputX = secondBoxFirstInputX + index * 160; // Adjusted X-coordinate for input fields

      doc
        .fontSize(10) // Increased font size for labels
        .fillColor("black")
        .text(label, labelX, secondBoxFirstLabelY, {
          width: secondBoxFirstLabelWidth,
        }); // Adjusted X-coordinate and added width option for labels

      // Draw a rectangle for each input field
      doc
        .rect(inputX, secondBoxFirstInputY - 8, secondBoxFirstInputWidth, 20) // Adjusted X-coordinate and width for input fields
        .stroke();

      // Add input text inside the rectangle
      doc
        .fontSize(8)
        .fillColor("black")
        .text(
          secondBoxFirstInputs[index],
          inputX + secondBoxFirstInputTextXOffset,
          secondBoxFirstInputY + 5
        ); // Adjusted X-coordinate for input text
    });

    // Draw a horizontal line above the "Whether the item/items requested Included in procurement Plan" label
    const thirdBoxLabelY = secondBoxStartY + 40; // Adjusted Y-coordinate for third box labels

    doc
      .moveTo(secondBoxStartX, thirdBoxLabelY - 10)
      .lineTo(secondBoxStartX + secondBoxWidth, thirdBoxLabelY - 10)
      .stroke();

    // Third part - Label-input fields for the second box
    const thirdBoxLabels = [
      "Whether the item/items requested Included",
      "Procurement Plan",
      "Budget Allocation",
      "Used Amount",
      "Balance Available",
    ];
    const ThirdBoxInputs = [
      requestData.budgetAllocation,

      requestData.usedAmount,
      requestData.balanceAvailable,
    ];
    const thirdBoxLabelX = secondBoxStartX + 80; // Adjusted X-coordinate for labels
    const thirdBoxInputX = secondBoxFirstLabelX + 90; // Adjusted input field starting position
    const thirdBoxInputY = thirdBoxLabelY;
    const thirdBoxLabelWidths = [410, 100, 100, 100, 100, 100]; // Adjusted width for labels
    const thirdBoxInputWidth = 210; // Adjusted width for input fields to leave space
    const thirdBoxInputTextXOffset = 5; // Offset for input text X-coordinate

    thirdBoxLabels.forEach((label, index) => {
      doc
        .fontSize(10) // Increased font size for labels
        .fillColor("black")
        .text(label, thirdBoxLabelX, thirdBoxLabelY + index * 20, {
          width: thirdBoxLabelWidths[index], // Adjusted width option for labels
        }); // Adjusted X-coordinate and added width option for labels

      // Draw a rectangle for each input field except for the first label
      if (index !== 0) {
        if (index === 1) {
          // Check if it's the second "Procurement Plan" field

          // Draw label for the first input field
          doc
            .fontSize(8)
            .fillColor("black")
            .text(
              "Yes:", // Your label text here
              thirdBoxInputX, // Adjusted X-coordinate for the label
              thirdBoxInputY + index * 20
            );

          // Draw first input field
          doc
            .rect(
              thirdBoxInputX + 20,
              thirdBoxInputY + index * 20 - 8,
              thirdBoxInputWidth / 8,
              20
            ) // Adjusted X-coordinate and width for input fields
            .stroke();

          // Draw label for the second input field
          doc
            .fontSize(8)
            .fillColor("black")
            .text(
              "No:", // Your label text here
              thirdBoxInputX + 60, // Adjusted X-coordinate for the label
              thirdBoxInputY + index * 20
            );

          // Draw second input field
          doc
            .rect(
              thirdBoxInputX + 80,
              thirdBoxInputY + index * 20 - 8,
              thirdBoxInputWidth / 8,
              20
            ) // Adjusted X-coordinate and width for input fields
            .stroke();

          // Add input text inside the second rectangle
          doc
            .fontSize(8)
            .fillColor("black")
            .text(
              ThirdBoxInputs[index],
              thirdBoxInputX +
                thirdBoxInputWidth +
                thirdBoxInputTextXOffset +
                10,
              thirdBoxInputY + index * 20 + 5
            ); // Adjusted X-coordinate for input text
        } else {
          doc
            .rect(
              thirdBoxInputX,
              thirdBoxInputY + index * 20 - 8,
              thirdBoxInputWidth,
              20
            ) // Adjusted X-coordinate and width for input fields
            .stroke();

          // Add input text inside the rectangle
          doc
            .fontSize(8)
            .fillColor("black")
            .text(
              ThirdBoxInputs[index],
              thirdBoxInputX + thirdBoxInputTextXOffset,
              thirdBoxInputY + index * 20 + 5
            ); // Adjusted X-coordinate for input text
        }
      }

      // Print additional information after the "Whether the item/items requested" label
      if (index === 0) {
        doc
          .fontSize(10)
          .fillColor("black")
          .text(
            "If No, Vice Chancellor's Approval required", // Additional information

            thirdBoxInputX + 215, // X-coordinate
            thirdBoxLabelY + (index + 1) * 20 - 20 // Adjusted Y-coordinate for the second line
          );
      }

      if (index === 2) {
        doc
          .fontSize(10)
          .fillColor("black")

          .text(
            "Approved", // Additional information

            thirdBoxInputX + 215, // X-coordinate
            thirdBoxLabelY + (index + 1) * 20 - 30 // Adjusted Y-coordinate for the second line
          );
      }
      if (index === 2) {
        doc
          .fontSize(10)
          .fillColor("black")

          .text(
            "Approved", // Additional information

            thirdBoxInputX + 215, // X-coordinate
            thirdBoxLabelY + (index + 1) * 20 - 30 // Adjusted Y-coordinate for the second line
          );
      }
      if (index === 3) {
        doc
          .fontSize(10)
          .fillColor("black")

          .text(
            "Vice Chancellor", // Additional information

            thirdBoxInputX + 215, // X-coordinate
            thirdBoxLabelY + (index + 1) * 20 - 20 // Adjusted Y-coordinate for the second line
          );
      }

      if (index === 3) {
        doc
          .fontSize(10)
          .fillColor("black")

          .text(
            "Vice Chancellor", // Additional information

            thirdBoxInputX + 215, // X-coordinate
            thirdBoxLabelY + (index + 1) * 20 - 20 // Adjusted Y-coordinate for the second line
          );
      }
    });

    /////////////////////// third box
    const thirdBoxStartY = secondBoxStartY + secondBoxHeight + 5; // Adjusted Y-coordinate for the third box
    const thirdBoxWidth = 600;
    let thirdBoxHeight = 200; // Adjusted height to accommodate the table
    const thirdBoxStartX = secondBoxStartX; // Keep the same start X-coordinate for the third box

    doc
      .rect(thirdBoxStartX, thirdBoxStartY, thirdBoxWidth, thirdBoxHeight)
      .stroke();

    // First part - Displaying Object
    const objectX = thirdBoxStartX + 10; // Adjusted X-coordinate for object
    const objectY = thirdBoxStartY + 30; // Adjusted Y-coordinate for object
    const objectWidth = 40; // Adjust this value to your preference

    doc
      .fontSize(10)
      .fillColor("black")
      .text("Object", objectX, objectY, { width: objectWidth }) // Added width option
      .fontSize(8);

    // Draw a vertical line to separate sections
    doc
      .moveTo(objectX + objectWidth + 20, thirdBoxStartY) // Adjusted X-coordinate
      .lineTo(objectX + objectWidth + 20, thirdBoxStartY + thirdBoxHeight)
      .stroke();
    // Set up table parameters
    const tableStartX = objectX + objectWidth + 30; // Adjusted X-coordinate for the start of the table
    let tableStartY = thirdBoxStartY + 10; // Adjusted Y-coordinate for the start of the table
    const columnWidths = [120, 60, 60, 60, 60, 60, 60]; // Widths for each column

    // Draw table headers with borders
    doc.lineWidth(1);
    doc.font("Helvetica").fontSize(8);
    const tableHeaders = [
      "Description of the item/items\nindented to be purchased",
      "Cost",
      "Qty Required",
      "Qty Available",
      "Qty Supplied",
      "Rate",
      "Total value",
    ];

    // Draw table headers and rows
    doc.lineWidth(1);
    doc.font("Helvetica").fontSize(8);

    // Draw headers
    tableHeaders.forEach((header, index) => {
      doc
        .rect(
          tableStartX + columnWidths.slice(0, index).reduce((a, b) => a + b, 0),
          tableStartY,
          columnWidths[index],
          30 // Increase height to accommodate two lines
        )
        .stroke();
      doc.text(
        header,
        tableStartX +
          columnWidths.slice(0, index).reduce((a, b) => a + b, 0) +
          5,
        tableStartY + 5
      );
    });

    // Fetch items from the database
    const requestDataFromDB = await ProcRequest.findOne({
      requestId: requestData.requestId,
    }).select("items");

    // Populate table with item data
    requestDataFromDB.items.forEach((item, index) => {
      const rowData = [
        item.itemName, // Data fetched from the database
        item.cost, // Data fetched from the database
        item.qtyRequired, // Data fetched from the database
        item.qtyAvailable, // Data fetched from the database
        "", // Placeholder for Qty Supplied
        "", // Placeholder for Rate
        "", // Placeholder for Total value
      ];

      // Draw each row of the table
      rowData.forEach((data, i) => {
        const x =
          tableStartX + columnWidths.slice(0, i).reduce((a, b) => a + b, 0);

        const y = tableStartY + 30 + index * 15; // Increase y position for each row
        const width = columnWidths[i];
        const height = 15; // Row height

        doc.rect(x, y, width, height).stroke(); // Draw cell border
        doc.text(data, x, y + 5); // Draw cell content
      });
    });

    // Add "Specification is Attached" text and Yes/No inputs
    const specificationText = "Specification is Attached";
    const specificationX = tableStartX;
    const specificationY =
      tableStartY + 180; // Adjusted Y position

    doc.text(specificationText, specificationX, specificationY); // Draw specification text

    // Draw Yes/No labels and inputs
    const yesLabelX = specificationX +100; // Adjusted X position for Yes label
    const yesNoInputX = yesLabelX + 40; // Adjusted X position for Yes/No inputs
    const yesNoY = specificationY; // Same Y position as specification text
    const labellWidth = 30;
    const inputWidth = 15;

    doc.text("Yes", yesLabelX, yesNoY); // Draw Yes label
    doc.text("No", yesLabelX + labellWidth + 20, yesNoY); // Draw No label
    doc.lineWidth(1).rect(yesNoInputX-20, yesNoY , inputWidth, 10).stroke(); // Draw Yes input
doc.lineWidth(1).rect(yesNoInputX + labellWidth + 10, yesNoY , inputWidth, 10).stroke(); // Draw No input
    ///////////////////////// Fourth Box /////////////////////////
    const fourthBoxStartY = thirdBoxStartY + thirdBoxHeight + 5; // Adjusted Y-coordinate for the fourth box
    const fourthBoxWidth = 600;
    const fourthBoxHeight = 40; // Adjusted height to accommodate the table
    const fourthBoxStartX = secondBoxStartX; // Keep the same start X-coordinate for the fourth box

    doc
      .rect(fourthBoxStartX, fourthBoxStartY, fourthBoxWidth, fourthBoxHeight)
      .stroke();

    // First part - Displaying Purpose
    const purposeX = fourthBoxStartX + 10; // Adjusted X-coordinate for purpose
    const purposeY = fourthBoxStartY + 20; // Adjusted Y-coordinate for purpose
    const purposeWidth = 40; // Adjust this value to your preference

    doc
      .fontSize(10)
      .fillColor("black")
      .text("Purpose", purposeX, purposeY, {
        width: purposeWidth,
      }) // Added width option
      .fontSize(8);

    // Draw a vertical line to separate sections
    doc
      .moveTo(purposeX + purposeWidth + 20, fourthBoxStartY) // Adjusted X-coordinate
      .lineTo(purposeX + purposeWidth + 20, fourthBoxStartY + fourthBoxHeight)
      .stroke();
    // Second part - Labels with square input fields
    const labelStartX = fourthBoxStartX + 80; // Adjusted X-coordinate for labels
    const labelY = fourthBoxStartY + 10; // Adjusted Y-coordinate for labels
    const labelWidth = 60; // Adjusted width for labels
    const inputFieldSize = 10; // Size of the square input fields

    const labels = ["Normal", "Fast Track", "Urgent"];
    const inputStartX = labelStartX + 20; // Adjusted X-coordinate for input fields
    const purposeIndex = labels.indexOf(requestData.purpose);

    labels.forEach((label, index) => {
      const inputX = inputStartX + index * 100 + 30; // Adjusted X-coordinate for each input field
      doc
        .fontSize(10)
        .fillColor("black")
        .text(label, labelStartX + index * 100, labelY, { width: labelWidth });

      // Draw square input fields
      if (index === purposeIndex) {
        doc
          .rect(inputX, labelY - 3, inputFieldSize, inputFieldSize) // Adjusted Y-coordinate for input fields
          .fill("black");
      } else {
        // Otherwise, draw an empty square
        doc
          .rect(inputX, labelY - 3, inputFieldSize, inputFieldSize) // Adjusted Y-coordinate for input fields
          .stroke();
      }
    });

    // Print "If Urgent Provide The Justification" in the next line
    doc
      .fontSize(10)
      .fillColor("black")

      .text(
        "If Urgent Provide The Justification:",
        labelStartX,
        labelY + 10, // Adjusted Y-coordinate for the next line
        { width: 300 } // Adjusted width for the text
      );
    doc
      .fontSize(10)
      .fillColor("black")

      .text(
        "If Urgent Provide The Justification:",
        labelStartX,
        labelY + 10, // Adjusted Y-coordinate for the next line
        { width: 300 } // Adjusted width for the text
      );

    // Defining the dimensions for the fifth box
    const fifthBoxStartY = fourthBoxStartY + fourthBoxHeight + 5; // Adjusted Y-coordinate for the fifth box
    const fifthBoxWidth = 600;
    const fifthBoxHeight = 70; // Adjusted height to accommodate the table
    const fifthBoxStartX = secondBoxStartX; // Keep the same start X-coordinate for the fifth box

    doc
      .rect(fifthBoxStartX, fifthBoxStartY, fifthBoxWidth, fifthBoxHeight)
      .stroke();

    // First part - Displaying Approval
    const approvalX = fifthBoxStartX + 10; // Adjusted X-coordinate for approval
    const approvalY = fifthBoxStartY + 30; // Adjusted Y-coordinate for approval
    const approvalWidth = 40; // Adjust this value to your preference

    doc
      .fontSize(10)
      .fillColor("black")
      .text("Approval", approvalX, approvalY, {
        width: approvalWidth,
      }) // Added width option
      .fontSize(8);

    // Draw a vertical line to separate sections
    doc
      .moveTo(approvalX + approvalWidth + 20, fifthBoxStartY) // Adjusted X-coordinate
      .lineTo(approvalX + approvalWidth + 20, fifthBoxStartY + fifthBoxHeight)
      .stroke();

    // Define coordinates for labels
    const labelsX = approvalX + approvalWidth + 30; // Adjusted X-coordinate
    const labelsY = fifthBoxStartY + 8; // Adjusted Y-coordinate

    // Reset "Prepared By" label
    doc.fontSize(10).fillColor("black").text("Prepared By:", labelsX, labelsY);

    // Define space between labels and values
    const valueSpace = 100; // Adjust as needed

    // Reset "Head Of The Department" label
    doc.text(
      "Head Of The Department:",
      labelsX + valueSpace + valueSpace + valueSpace,
      labelsY
    );

    const recommendedApprovedY = labelsY + 12; // Adjusted Y-coordinate

    // Draw a horizontal line before "Recommended/Approved"
    doc
      .moveTo(fundsX + fundsWidth + 20, recommendedApprovedY - 2) // Adjusted starting point
      .lineTo(fifthBoxWidth + 6, recommendedApprovedY - 2) // Adjusted ending point
      .stroke();

    // Print "Recommended/Approved" below "Head Of The Department" label
    doc.text("Recommended/Approved", labelsX, recommendedApprovedY);
    doc.text("Recommended/Approved", labelsX, recommendedApprovedY);

    // Print "Date" below "Recommended/Approved" label
    const dateY = recommendedApprovedY + 12; // Adjusted Y-coordinate
    doc.text("Date", labelsX, dateY);

    doc.text(
      "Dean/Registrar/Bursar",
      labelsX + valueSpace + valueSpace + valueSpace,
      dateY
    );
    doc
      .moveTo(fundsX + fundsWidth + 20, recommendedApprovedY + 22) // Adjusted starting point
      .lineTo(fifthBoxWidth + 6, recommendedApprovedY + 22) // Adjusted ending point
      .stroke();

    // Print "Approved" after "Dean/Registrar/Bursar" label
    const approvedY = dateY + 12; // Adjusted Y-coordinate
    doc.text("Approved", labelsX, approvedY);
    doc.text("Approved", labelsX, approvedY);
    // Define space between sections
    const sectionSpace = 12; // Adjust as needed

    // Print "Date" below "Approved" label with space
    const date2Y = sectionSpace + approvedY;
    doc.text("Date", labelsX, date2Y);

    // Print "Registrar" below "Date" label with space
    doc.text("Registrar", labelsX + valueSpace, date2Y);
    const valueSpace1 = 50;
    // Print "Date" below "Registrar" label with space
    doc.text("Date", labelsX + valueSpace + valueSpace + valueSpace1, date2Y);
    // Print "Vice Chancellor" below "Date" label with space
    doc.text(
      "Vice Chancellor",
      labelsX + valueSpace + valueSpace + valueSpace + valueSpace1,
      date2Y
    );

    // Defining the dimensions for the sixth box
    const sixthBoxStartY = fifthBoxStartY + fifthBoxHeight + 5; // Adjusted Y-coordinate for the sixth box
    const sixthBoxWidth = 600; // Adjusted width for the sixth box
    const sixthBoxHeight = 35; // Adjusted height for the sixth box
    const sixthBoxStartX = secondBoxStartX; // Keep the same start X-coordinate for the sixth box

    doc
      .rect(sixthBoxStartX, sixthBoxStartY, sixthBoxWidth, sixthBoxHeight)
      .stroke();

    // First part - Displaying Office Use
    const officeUseX = sixthBoxStartX + 10; // Adjusted X-coordinate for office use
    const officeUseY = sixthBoxStartY + 10; // Adjusted Y-coordinate for office use
    const officeUseWidth = 40; // Adjust this value to your preference

    doc
      .fontSize(10)
      .fillColor("black")
      .text("Office Use", officeUseX, officeUseY, {
        width: officeUseWidth,
      }) // Added width option
      .fontSize(8);

    // Draw a vertical line to separate sections
    doc
      .moveTo(officeUseX + officeUseWidth + 20, sixthBoxStartY) // Adjusted X-coordinate
      .lineTo(officeUseX + officeUseWidth + 20, sixthBoxStartY + sixthBoxHeight)
      .stroke();

    doc
      .fontSize(10)
      .text("Please take action to Supply", labelsX, sixthBoxStartY + 8);

    doc
      .fontSize(10)
      .text("Please take action to Supply", labelsX, sixthBoxStartY + 8);

    // Print "Date" below "Recommended/Approved" label
    const date1Y = sixthBoxStartY + 20; // Adjusted Y-coordinate
    doc.fontSize(10).text("Date", labelsX, date1Y);

    // Print "Dean/Registrar/Bursar" below "Date" label
    doc
      .fontSize(10)
      .text(
        "Assistant Bursar (Supplies)",
        labelsX + valueSpace + valueSpace + valueSpace,
        date1Y
      );

    // Printing additional lines
    doc
      .fontSize(6)
      .fillColor("black")
      .font("Helvetica-Oblique")
      .text("• Incompleted forms will be rejected.", 50, sixthBoxStartY + 38); // Adjusted Y-coordinate for the additional lines

    doc
      .fontSize(6)
      .fillColor("black")
      .font("Helvetica-Oblique")
      .text(
        "• When Specifications are not provided University Specifications may be used without giving any notice.",
        50,
        sixthBoxStartY + 42
      ); // Adjusted Y-coordinate for the additional lines

    // Ending the document
    doc.end();

    // Closing the output stream after finishing writing the PDF
    outputStream.on("finish", async () => {
      console.log("PDF created successfully");
      // Save PDF to MongoDB
      await savePdfToMongoDB(pdfFileName, pdfFilePath);
    });
  } catch (error) {
    console.error("Error creating PDF:", error);
    res.status(500).send("An error occurred while creating the PDF.");
  }
};

async function savePdfToMongoDB(filename, filePath) {
  // Changed function signature
  try {
    const pdfData = fs.readFileSync(filePath); // Read PDF file
    const newPdf = new PdfModel({
      filename: filename,
      data: pdfData,
    });
    await newPdf.save();
    console.log("PDF saved successfully in MongoDB");
  } catch (error) {
    console.error("Error saving PDF to MongoDB:", error);
    throw new Error("An error occurred while storing the PDF in MongoDB");
  }
}

exports.fetchPdf = (req, res) => {
  const requestId = req.params.requestId;

  const pdfFileName = `Purchase_Requisition_${requestId}.pdf`;

  const pdfFilePath = path.join(__dirname, "..", "download", pdfFileName);

  res.sendFile(pdfFilePath);
};

exports.sendPdf = async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const sender = req.body.sender; // Corrected to req.body.sender
    const pdfFileName = `Purchase_Requisition_${requestId}.pdf`;
    const pathToAttachment = path.join(
      __dirname,
      "..",
      "download",
      pdfFileName
    );
    const attachment = fs.readFileSync(pathToAttachment);

    // Define recipients based on sender type
    let recipients;
    switch (sender) {
      case "dean":
        recipients = "piyumikavindyappk@gmail.com";
        break;
      case "registrar":
        recipients = "imashanaw1999@gmail.com";
        break;
      case "viceChancellor":
        recipients = "usertestoneapp@gmail.com";
        break;
      default:
        recipients = ""; // Provide a default email or handle this case accordingly
        break;
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "Gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
      tls: { rejectUnauthorized: false },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.RES,
      subject: "Request for Approval: Purchase Requisition",
      html: `
          <p>Dear Sir/Madam,</p>
          <p>We are submitting this purchase requisition form to request approval for the procurement of necessary items for the department. The items listed in the form are essential for continuing academic activities in the department. Your timely approval will enable us to proceed with the procurement process efficiently.</p>
          <p><strong>Thank you</strong> for your attention to this matter.</p>
          <p><strong>Best regards,</strong><br>department</p> `,
      attachments: [
        {
          filename: "Purchase_Requisition.pdf",
          content: attachment,
          contentType: "application/pdf",
        },
      ],
    });

    res.send("Mail has been sent to the appropriate recipient.");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("An error occurred while sending the email.");
  }
};

exports.viewPdf = (req, res) => {
  try {
    const requestId = req.params.requestId;
    const pdfFileName = `Purchase_Requisition_${requestId}.pdf`;
    const pdfFilePath = path.join(__dirname, "..", "download", pdfFileName);

    // Set the content type header
    res.setHeader("Content-Type", "application/pdf");

    // Stream the file to the response
    const stream = fs.createReadStream(pdfFilePath);
    stream.pipe(res);
  } catch (error) {
    console.error("Error viewing PDF:", error);
    res.status(500).send("An error occurred while viewing the PDF");
  }
};