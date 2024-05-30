const generateTable1 = (doc) => {
  // Define constants for table dimensions and positions
  const tableTop = 100;
  const tableLeft = 50;
  const tableWidth = 515;
  const row1Height = 25;
  const row2Height = 120;
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

  addText("A: General", tableLeft + 200, tableTop + 5, "Helvetica-Bold", 12); // Text
  addText(
    "1. Scope of Bid",
    tableLeft + 10,
    tableTop + row1Height + 15,
    "Helvetica-Bold",
    12
  ); // Text
  addText(
    "1.1",
    tableLeft + secondColumnWidth + 10,
    tableTop + row1Height + 5,
    "Helvetica",
    12
  );
  addText(
    "The Purchaser named in the Data Sheet invites you to submit a quotation for the supply of Goods as specified in Section III Schedule of Requirements. Upon receipt of this invitation you are requested to acknowledge the receipt of this invitation and your intention to submit a quotation. The Purchaser may not consider you for inviting quotations in the future, if you failed to acknowledge the receipt of this invitation or not submitting a quotation after expressing the intention as above.",
    tableLeft + secondColumnWidth + 30,
    tableTop + row1Height + 5,
    "Helvetica",
    12
  ); // Text

  // Second Table
  const table2Top = tableTop + row1Height + row2Height ; // Adjust spacing
  const row3Height = 25;
  const row4Height = 160;

  drawTableBorder(table2Top, row3Height + row4Height); // Border
  drawRowDivider(tableLeft, table2Top + row3Height, tableWidth); // Row divider
  drawColumnDivider(
    tableLeft + secondColumnWidth,
    table2Top + row3Height,
    row4Height
  ); // Column divider

  addText(
    "B: Contents of Documents",
    tableLeft + 180,
    table2Top + 5,
    "Helvetica-Bold",
    12
  ); // Text
  addText(
    "2. Contents of\nDocuments",
    tableLeft + 10,
    table2Top + row3Height + 15,
    "Helvetica-Bold",
    12
  ); // Text

  addText(
    "2.1",
    tableLeft + secondColumnWidth + 10,
    table2Top + row3Height + 5,
    "Helvetica",
    12
  );
  const lines = [
    "The documents consist of the Sections indicated below:",
  
    "• Section I. Instructions to Vendors (ITV)",
    "• Section II. Data Sheet",
    "• Section III. Schedule of Requirements",
    "• Section IV. Technical Specifications & Compliance with",
    "  Specifications",
    "• Section V. Quotation submission Form"
  ];
  
  const lineHeight = 20; // Adjust the line height as needed
  let currentPosition = table2Top + row3Height + 5;
  
  lines.forEach((line) => {
    addText(
      line,
      tableLeft + secondColumnWidth + 30,
      currentPosition,
      "Helvetica",
      12
    );
    currentPosition += lineHeight;
  });
  
  // Third Table
  const table3Top = table2Top + row3Height + row4Height ; // Adjust spacing
  const row5Height = 25;
  const row6Height = 100;
  const row7Height = 190;

  drawTableBorder(table3Top, row5Height + row6Height + row7Height); // Border
  drawRowDivider(tableLeft, table3Top + row5Height, tableWidth); // Row divider
  drawColumnDivider(
    tableLeft + secondColumnWidth,
    table3Top + row5Height,
    row6Height + row7Height
  ); // Column divider

  addText(
    "C: Preparation of Quotation",
    tableLeft + 170,
    table3Top + 5,
    "Helvetica-Bold",
    12
  ); // Text
  addText(
    "3. Documents\nComprising\nyour Quotation ",
    tableLeft + 10,
    table3Top + row5Height + 15,
    "Helvetica-Bold",
    12
  ); // Text

  addText(
    "3.1",
    tableLeft + secondColumnWidth + 10,
    table3Top + row5Height + 5,
    "Helvetica",
    12
  );
  addText(
    "The Quotation shall comprise the following: \n\n" +
      "(a) Quotation Submission Form and the Price Schedules; \n\n" +
      "(b) Technical Specifications & Compliance with Specifications",
    tableLeft + secondColumnWidth + 30,
    table3Top + row5Height + 5,
    "Helvetica",
    12
  ); // Text

  // Additional Rows for Third Table
  const additionalRowTop = table3Top + row5Height + row6Height + 2;

  drawRowDivider(tableLeft, additionalRowTop, tableWidth); // Row divider

  addText(
    "4.Quotation\nSubmission\nForm and\nPrice\nSchedules",
    tableLeft + 10,
    additionalRowTop + 15,
    "Helvetica-Bold",
    12
  ); // Text
  addText(
    "4.1",
    tableLeft + secondColumnWidth + 10,
    additionalRowTop + 5,
    "Helvetica",
    12
  );
  addText(
    "The vendor shall submit the Quotation Submission Form using the form furnished in Section V. This form must be completed without any alterations to its format, and no substitutes shall be accepted. All blank spaces shall be filled in with the information requested.",
    tableLeft + secondColumnWidth + 30,
    additionalRowTop + 5,
    "Helvetica",
    12
  ); // Text
  addText(
    "4.2",
    tableLeft + secondColumnWidth + 10,
    additionalRowTop + 70,
    "Helvetica",
    12
  );
  addText(
    "Alternative offers shall not be considered. The vendors are advised not to quote different options for the same item but furnish the most competitive among the options available to the bidder.",
    tableLeft + secondColumnWidth + 30,
    additionalRowTop + 70,
    "Helvetica",
    12
  ); // Text

  drawRowDivider(tableLeft, additionalRowTop + row5Height + 90, tableWidth); // Row divider

  addText(
    "5. Prices and\nDiscounts",
    tableLeft + 10,
    additionalRowTop + row5Height + 130,
    "Helvetica-Bold",
    12
  ); // Text
  addText(
    "5.1",
    tableLeft + secondColumnWidth + 10,
    additionalRowTop + row5Height + 100,
    "Helvetica",
    12
  );
  addText(
    "Unless specifically stated in Data Sheet, all items must be priced separately in the Price Schedules.",
    tableLeft + secondColumnWidth + 30,
    additionalRowTop + row5Height + 100,
    "Helvetica",
    12
  ); // Text
  addText(
    "5.2",
    tableLeft + secondColumnWidth + 10,
    additionalRowTop + row5Height + 140,

    "Helvetica",
    12
  );
  addText(
    "The price to be quoted in the Quotation Submission Form shall be the total price of the Quotation, including any discounts offered",
    tableLeft + secondColumnWidth + 30,
    additionalRowTop + row5Height + 140,
    "Helvetica",
    12
  ); // Text
};




module.exports = generateTable1;
