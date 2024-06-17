const PDFDocument = require('pdfkit');

const generateTable4 = (doc) => {
  try {
    // Define constants for table dimensions and positions
    const tableTop = 100;
    const tableLeft = 50;
    const tableWidth = 515;
    const row1Height = 25;
    const row2Height = 60;
    const secondColumnWidth = tableWidth / 4;

    // Function to draw a table border
    const drawTableBorder = (top, height) => {
      doc.rect(tableLeft, top, tableWidth, height).stroke();
    };

    // Function to draw a row divider
    const drawRowDivider = (left, top, width) => {
      doc
        .moveTo(left, top)
        .lineTo(left + width, top)
        .stroke();
    };

    // Function to draw a column divider
    const drawColumnDivider = (left, top, height) => {
      doc
        .moveTo(left, top)
        .lineTo(left, top + height)
        .stroke();
    };

    // Function to add text to the table
    const addText = (text, left, top, font, size) => {
      doc.font(font).fontSize(size).text(text, left, top);
    };

    // First Table
    drawTableBorder(tableTop, row1Height + row2Height); // Border
    drawRowDivider(tableLeft, tableTop + row1Height, tableWidth); // Row divider
    drawColumnDivider(
      tableLeft + secondColumnWidth,
      tableTop + row1Height,
      row2Height
    ); // Column divider

    addText(
      "F: Award of Contract",
      tableLeft + 200,
      tableTop + 5,
      "Helvetica-Bold",
      12
    ); // Text
    addText(
      "18. Acceptance\nof the\nQuotation ",
      tableLeft + 10,
      tableTop + row1Height + 15,
      "Helvetica-Bold",
      12
    ); // Text
    addText(
      "18.1",
      tableLeft + secondColumnWidth + 4,
      tableTop + row1Height + 5,
      "Helvetica",
      12
    );
    addText(
      "The Purchaser will accept the quotation of the vendor whose offer " +
        "has been determined to be the lowest evaluated bid and is " +
        "substantially responsive to the documents issued.",
      tableLeft + secondColumnWidth + 30,
      tableTop + row1Height + 5,
      "Helvetica",
      12
    ); // Text

    // Second Table (continuation)
    const table2Top = tableTop + row1Height + row2Height; // Adjust the top position for the second table

    drawTableBorder(table2Top, row2Height); // Border
    drawRowDivider(tableLeft, table2Top, tableWidth); // Row divider
    drawColumnDivider(tableLeft + secondColumnWidth, table2Top, row2Height); // Column divider
    addText(
      "19. Notification\nof acceptance ",
      tableLeft + 10,
      table2Top + 5,
      "Helvetica-Bold",
      12
    ); // Text
    addText(
      "19.1",
      tableLeft + secondColumnWidth + 4,
      table2Top + 5,
      "Helvetica",
      12
    );
    addText(
      "Prior to the expiration of the period of validity of quotation, the " +
        "Purchaser will notify the successful vendor, in writing, that its " +
        "quotation has been accepted.",
      tableLeft + secondColumnWidth + 30,
      table2Top + 5,
      "Helvetica",
      12
    ); // Text
    addText(
      "Section II: Data Sheet",
      tableLeft + 180,
      table2Top + 120,
      "Helvetica-Bold",
      18
    ); // Text
    // New Table
    const newTableTop = table2Top + row2Height + 100; // Adjust the position below the second table
    const newRowHeight = 60;
    const newSecondColumnWidth = tableWidth / 4;

    // Draw the new table borders and dividers
    const newTableHeight = newRowHeight * 7;
    drawTableBorder(newTableTop, newTableHeight); // Border
    drawRowDivider(tableLeft, newTableTop + newRowHeight, tableWidth); // Row divider
    drawRowDivider(tableLeft, newTableTop + newRowHeight * 2, tableWidth); // Row divider
    drawRowDivider(tableLeft, newTableTop + newRowHeight * 3, tableWidth); // Row divider
    drawRowDivider(tableLeft, newTableTop + newRowHeight * 4, tableWidth); // Row divider
    drawRowDivider(tableLeft, newTableTop + newRowHeight * 5, tableWidth); // Row divider
    drawRowDivider(tableLeft, newTableTop + newRowHeight * 6, tableWidth); // Row divider

    drawColumnDivider(tableLeft + newSecondColumnWidth, newTableTop, newTableHeight); // Column divider

    // Add text to the new table
    addText(" ITV\nClause\nReference", tableLeft + 30, newTableTop + 5, "Helvetica-Bold", 12); // Title

    addText("1.1", tableLeft + 30,  newTableTop + newRowHeight + 10, "Helvetica", 12);
    addText("The Purchaser is:", tableLeft + newSecondColumnWidth + 10, newTableTop + newRowHeight + 10, "Helvetica", 12);
    addText("Address:", tableLeft + newSecondColumnWidth + 10, newTableTop + newRowHeight + 30, "Helvetica", 12);

    addText("5.1", tableLeft + 30, newTableTop + newRowHeight * 2 + 10, "Helvetica", 12);
    addText("If the bidder is allowed to quote for less than all the items specified, indicate the details.", tableLeft + newSecondColumnWidth + 10, newTableTop + newRowHeight * 2 + 10, "Helvetica", 12);

    addText("7.3", tableLeft + 30, newTableTop + newRowHeight * 3 + 10, "Helvetica", 12);
    addText("Manufacturer’s Authorisation is/is not required.", tableLeft + newSecondColumnWidth + 10, newTableTop + newRowHeight * 3 + 10, "Helvetica", 12);

    addText("11.1", tableLeft + 30, newTableTop + newRowHeight * 4 + 10, "Helvetica", 12);
    addText("Deadline for submission of quotations is:", tableLeft + newSecondColumnWidth + 10, newTableTop + newRowHeight * 4 + 10, "Helvetica", 12);

    addText("13", tableLeft + 30, newTableTop + newRowHeight * 5 + 10, "Helvetica", 12);
    addText("The quotations shall be opened at the following address:", tableLeft + newSecondColumnWidth + 10, newTableTop + newRowHeight * 5 + 10, "Helvetica", 12);

    const addTextWithSuperscript = (doc, text, supText, left, top, font, size, supSize, supOffset) => {
      doc.font(font).fontSize(size).text(text, left, top);
      const textWidth = doc.widthOfString(text);
      doc.font(font).fontSize(supSize).text(supText, left + textWidth + 2, top - supOffset);
    };
    
    addTextWithSuperscript(doc, "16", "1", tableLeft + 30, newTableTop + newRowHeight * 6 + 10, "Helvetica", 12, 9, 5);
    addText("Other factors that will be considered for evaluation are (List and describe the methodology):", tableLeft + newSecondColumnWidth + 10, newTableTop + newRowHeight * 6 + 10, "Helvetica", 12);

    addTextWithSuperscript(doc, "", "1", tableLeft + 10, newTableTop + newRowHeight * 6 + 90, "Helvetica",9 , 9, 5);
    addText("Insert only if additional factors other than price is considered for evaluation.", tableLeft + 25, newTableTop + newRowHeight * 6 + 90, "Helvetica", 12);

  } catch (error) {
    console.error("Error generating PDF:", error.message);
  }
};

module.exports = generateTable4;
