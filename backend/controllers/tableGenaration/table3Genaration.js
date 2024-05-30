const generateTable3 = (doc) => {
  // Define constants for table dimensions and positions
  const tableTop = 70;
  const tableLeft = 50;
  const tableWidth = 515;
  const rowHeightShort = 40; // Short rows
  const rowHeightMedium = 80; // Medium rows
  const rowHeightTall = 125; // Tall rows
  const columnWidth = tableWidth / 4;

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

  // First Table - Quotation deadline
  drawTableBorder(tableTop, rowHeightShort);
  drawColumnDivider(tableLeft + columnWidth, tableTop, rowHeightShort);
  addText("Quotation", tableLeft + 10, tableTop + 5, "Helvetica-Bold", 12);
  addText(
    "deadline for submission of quotations, in accordance with ITV Clause 11.1 above.",
    tableLeft + columnWidth + 30,
    tableTop + 5,
    "Helvetica",
    12
  );

  // Second Table - Opening of Quotations
  const table2Top = tableTop + rowHeightShort;
  drawTableBorder(table2Top, rowHeightMedium);
  drawColumnDivider(tableLeft + columnWidth, table2Top, rowHeightMedium);

  addText(
    "13. Opening of\nQuotations",
    tableLeft + 10,
    table2Top + 5,
    "Helvetica-Bold",
    12
  );
  addText("13.1", tableLeft + columnWidth + 4, table2Top + 5, "Helvetica", 12);
  addText(
    "The Purchaser shall conduct the opening of quotation in public at the address, date and time specified in the Data Sheet.",
    tableLeft + columnWidth + 30,
    table2Top + 5,
    "Helvetica",
    12
  );
  addText("13.2", tableLeft + columnWidth + 4, table2Top + 45, "Helvetica", 12);
  addText(
    "A representative of the bidders may be present and mark its attendance.",
    tableLeft + columnWidth + 30,
    table2Top + 45,
    "Helvetica",
    12
  );

  // Third Table - Clarifications
  const table3Top = table2Top + rowHeightMedium;
  drawTableBorder(table3Top, rowHeightTall);
  drawColumnDivider(tableLeft + columnWidth, table3Top, rowHeightTall);

  addText(
    "14. Clarifications",
    tableLeft + 10,
    table3Top + 5,
    "Helvetica-Bold",
    12
  );
  addText("14.1", tableLeft + columnWidth + 4, table3Top + 5, "Helvetica", 12);
  addText(
    "To assist in the examination, evaluation and comparison of the quotations, the Purchaser may, at its discretion, ask any vendor for a clarification of its quotation. Any clarification submitted by a vendor in respect to its quotation which is not in response to a request by the Purchaser shall not be considered.",
    tableLeft + columnWidth + 30,
    table3Top + 5,
    "Helvetica",
    12
  );
  addText(
    "14.2 ",
    tableLeft + columnWidth + 4,
    table3Top + 90,
    "Helvetica",
    12
  );

  addText(
    "The Purchaser’s request for clarification and the response shall be in writing.",
    tableLeft + columnWidth + 30,
    table3Top + 90,
    "Helvetica",
    12
  );

  // Fourth Table - Responsiveness of Quotations
  const table4Top = table3Top + rowHeightTall;
  drawTableBorder(table4Top, rowHeightShort + 40);
  drawColumnDivider(tableLeft + columnWidth, table4Top, rowHeightShort + 40);

  addText(
    "15. Responsiveness\nof Quotations",
    tableLeft + 10,
    table4Top + 5,
    "Helvetica-Bold",
    12
  );
  addText("15.1", tableLeft + columnWidth + 4, table4Top + 5, "Helvetica", 12);
  addText(
    "The Purchaser will determine the responsiveness of the quotation to the documents based on the contents of the quotation received.",
    tableLeft + columnWidth + 30,
    table4Top + 5,
    "Helvetica",
    12
  );
  addText("15.2", tableLeft + columnWidth + 4, table4Top + 45, "Helvetica", 12);
  addText(
    "If a quotation is evaluated as not substantially responsive to the documents issued, it may be rejected by the Purchaser.",
    tableLeft + columnWidth + 30,
    table4Top + 45,
    "Helvetica",
    12
  );

  // Fifth Table - Evaluation of Quotation
  const table5Top = table4Top + rowHeightShort + 40;
  drawTableBorder(table5Top, rowHeightMedium + 170);
  drawColumnDivider(tableLeft + columnWidth, table5Top, rowHeightMedium + 170);

  addText(
    "16. Evaluation of\nQuotation",
    tableLeft + 10,
    table5Top + 5,
    "Helvetica-Bold",
    12
  );
  addText("16.1", tableLeft + columnWidth + 4, table5Top + 5, "Helvetica", 12);
  addText(
    "The Purchaser shall evaluate each quotation that has been determined to be substantially responsive.",
    tableLeft + columnWidth + 30,
    table5Top + 5,
    "Helvetica",
    12
  );
  addText("16.2", tableLeft + columnWidth + 4, table5Top + 35, "Helvetica", 12);
  addText(
    "To evaluate a quotation, the Purchaser may consider the following:",
    tableLeft + columnWidth + 30,
    table5Top + 35,
    "Helvetica",
    12
  );
  addText(
    "(a) the Price as quoted;",
    tableLeft + columnWidth + 40,
    table5Top + 65,
    "Helvetica",
    12
  );
  addText(
    "(b) price adjustment for correction of arithmetical errors;",
    tableLeft + columnWidth + 40,
    table5Top + 95,
    "Helvetica",
    12
  );
  addText(
    "(c) price adjustment due to discounts offered.",
    tableLeft + columnWidth + 40,
    table5Top + 125,
    "Helvetica",
    12
  );
  addText(
    "16.3",
    tableLeft + columnWidth + 4,
    table5Top + 150,
    "Helvetica",
    12
  );
  addText(
    "The Purchaser’s evaluation of a quotation may require the consideration of other factors, in addition to the Price quoted if stated in Section II, Data Sheet. These factors may be related to the characteristics, performance, and terms and conditions of purchase of the Goods.",
    tableLeft + columnWidth + 30,
    table5Top + 150,
    "Helvetica",
    12
  );

  // Sixth Table - Purchaser’s Right to Accept or Reject Quotations
  const table6Top = table5Top + rowHeightMedium + 170;
  drawTableBorder(table6Top, rowHeightMedium + 40);
  drawColumnDivider(tableLeft + columnWidth, table6Top, rowHeightMedium + 40);

  addText(
    "17. Purchaser’s\nRight to\nAccept any\nQuotation,\nand to Reject\nany or all\nQuotations",
    tableLeft + 10,
    table6Top + 5,
    "Helvetica-Bold",
    12
  );
  addText("17.1", tableLeft + columnWidth + 4, table6Top + 5, "Helvetica", 12);
  addText(
    "The Purchaser reserves the right to accept or reject any quotation, and to annul the process and reject all quotations at any time prior to acceptance, without thereby incurring any liability to bidders.",
    tableLeft + columnWidth + 30,
    table6Top + 5,
    "Helvetica",
    12
  );
};

module.exports = generateTable3;
