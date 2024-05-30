const generateTable4 = (doc) => {
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
    tableLeft + secondColumnWidth +4,
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
};

module.exports = generateTable4;
