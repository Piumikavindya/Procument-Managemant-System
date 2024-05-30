const generateTable2 = (doc) => {
  // Define constants for table dimensions and positions
  const tableTop = 70;
  const tableLeft = 50;
  const tableWidth = 515;
  const row2Height = 120;
  const row3Height = 40; // Height for the currency row
  const row4Height = 280; // Height for the documents row
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
  drawTableBorder(tableTop, row2Height); // Border
  drawColumnDivider(tableLeft + secondColumnWidth, tableTop, row2Height); // Column divider

  addText(
    "5.3",
    tableLeft + secondColumnWidth + 10,
    tableTop + 5,
    "Helvetica",
    12
  );
  addText(
    "The applicable VAT shall be indicated separately.",
    tableLeft + secondColumnWidth + 30,
    tableTop + 5,
    "Helvetica",
    12
  );

  addText(
    "5.4",
    tableLeft + secondColumnWidth + 10,
    tableTop + 40,
    "Helvetica",
    12
  );
  addText(
    "Prices quoted by the vendor shall be fixed during the vendor’s performance of the Contract and not subject to variation on any account. A Quotation submitted with an adjustable price shall be treated as non-responsive and may be rejected.",
    tableLeft + secondColumnWidth + 30,
    tableTop + 40,
    "Helvetica",
    12
  );

  // Second Table
  const table2Top = tableTop + row2Height; // Adjust spacing

  drawTableBorder(table2Top, row3Height); // Border
  drawRowDivider(tableLeft, table2Top, tableWidth); // Row divider
  drawColumnDivider(tableLeft + secondColumnWidth, table2Top, row3Height); // Column divider

  addText("6. Currency", tableLeft + 10, table2Top + 5, "Helvetica-Bold", 12);
  addText(
    "6.1",
    tableLeft + secondColumnWidth + 10,
    table2Top + 5,
    "Helvetica",
    12
  );
  addText(
    "The vendors shall quote only in Sri Lanka Rupees.",
    tableLeft + secondColumnWidth + 30,
    table2Top + 5,
    "Helvetica",
    12
  );

  // Third Table
  const table3Top = table2Top + row3Height; // Adjust spacing

  drawTableBorder(table3Top, row4Height); // Border
  drawRowDivider(tableLeft, table3Top, tableWidth); // Row divider
  drawColumnDivider(tableLeft + secondColumnWidth, table3Top, row4Height); // Column divider

  addText(
    "7. Documents to\nEstablish\nthe Conformity\nof the Goods",
    tableLeft + 10,
    table3Top + 5,
    "Helvetica-Bold",
    12
  );

  addText(
    "7.1",
    tableLeft + secondColumnWidth + 10,
    table3Top + 12,
    "Helvetica",
    12
  );
  addText(
    "The vendor shall furnish as part of its quotation the documentary evidence that the Goods conform to the technical specifications and standards specified in Section IV, “Technical Specifications & Compliance with Specifications”.",
    tableLeft + secondColumnWidth + 30,
    table3Top + 12,
    "Helvetica",
    12
  );

  addText(
    "7.2",
    tableLeft + secondColumnWidth + 10,
    table3Top + 80,
    "Helvetica",
    12
  );
  addText(
    "The documentary evidence may be in the form of literature, drawings or data, and shall consist of a detailed item by item description of the essential technical and performance characteristics of the Goods, demonstrating substantial responsiveness of the Goods to the technical specifications, and if applicable, a statement of deviations and exceptions to the provisions of the Technical Specifications given.",
    tableLeft + secondColumnWidth + 30,
    table3Top + 80,
    "Helvetica",
    12
  );

  addText(
    "7.3",
    tableLeft + secondColumnWidth + 10,
    table3Top + 200,
    "Helvetica",
    12
  );
  addText(
    "If stated in the Data Sheet the vendor shall submit a certificate from the manufacturer to demonstrate that it has been duly authorized by the manufacturer or producer of the Goods to supply these Goods in Sri Lanka.",
    tableLeft + secondColumnWidth + 30,
    table3Top + 200,
    "Helvetica",
    12
  );

  // Fourth Table
  const table4Top = table3Top + row4Height; // Adjust spacing

  drawTableBorder(table4Top, row3Height); // Border
  drawRowDivider(tableLeft, table4Top, tableWidth); // Row divider
  drawColumnDivider(tableLeft + secondColumnWidth, table4Top, row3Height); // Column divider

  addText(
    "8. Period of\nValidity of Quotation",
    tableLeft + 10,
    table4Top + 5,
    "Helvetica-Bold",
    12
  );

  addText(
    "8.1",
    tableLeft + secondColumnWidth + 10,
    table4Top + 12,
    "Helvetica",
    12
  );
  addText(
    "Quotations shall remain valid for the period of sixty (60) days after the quotation submission deadline date.",
    tableLeft + secondColumnWidth + 30,
    table4Top + 12,
    "Helvetica",
    12
  );

  // Fifth Table
  const table5Top = table4Top + row3Height; // Adjust spacing

  drawTableBorder(table5Top, row3Height); // Border
  drawRowDivider(tableLeft, table5Top, tableWidth); // Row divider
  drawColumnDivider(tableLeft + secondColumnWidth, table5Top, row3Height); // Column divider

  addText(
    "9. Format and\nSigning of Quotation",
    tableLeft + 10,
    table5Top + 5,
    "Helvetica-Bold",
    12
  );

  addText(
    "9.1",
    tableLeft + secondColumnWidth + 10,
    table5Top + 12,
    "Helvetica",
    12
  );
  addText(
    "The quotation shall be typed or written in indelible ink and shall be signed by a person duly authorized to sign on behalf of the vendor.",
    tableLeft + secondColumnWidth + 30,
    table5Top + 12,
    "Helvetica",
    12
  );

  // Sixth Table - Submission of Quotation
  const table6Top = table5Top + row3Height; // Adjust spacing
  const row5Height = 25;
  const row6Height = 100;
  const row7Height = 25;

  drawTableBorder(table6Top, row5Height + row6Height); // Border
  drawRowDivider(tableLeft, table6Top + row5Height, tableWidth); // Row divider
  drawColumnDivider(
    tableLeft + secondColumnWidth,
    table6Top + row5Height,
    row6Height
  ); // Column divider
  addText(
    "D: Submission and Opening of Quotation ",
    tableLeft + 180,
    table6Top + 5,
    "Helvetica-Bold",
    12
  ); // Text

  addText(
    "10. Submission of\nQuotation",
    tableLeft + 10,
    table6Top + row5Height + 15,
    "Helvetica-Bold",
    12
  );

  addText(
    "10.1 ",
    tableLeft + secondColumnWidth + 4,
    table6Top + row5Height + 5,
    "Helvetica",
    12
  );
  addText(
    "Vendors may submit their quotations by mail or by hand in sealed envelopes addressed to the Purchaser bearing the specific identification of the contract number.",
    tableLeft + secondColumnWidth + 30,
    table6Top + row5Height + 5,
    "Helvetica",
    12
  );

  addText(
    "10.2 ",
    tableLeft + secondColumnWidth + 4,
    table6Top + row5Height + 50,
    "Helvetica",
    12
  );
  addText(
    "If the quotation is not sealed and marked as required, the Purchaser will assume no responsibility for the misplacement or premature opening of the quotation.",
    tableLeft + secondColumnWidth + 30,
    table6Top + row5Height + 50,
    "Helvetica",
    12
  );

  const table7Top = table6Top + row5Height+row6Height; // Adjust spacing

  drawTableBorder(table7Top, row3Height+20); // Border
  drawRowDivider(tableLeft, table7Top, tableWidth); // Row divider
  drawColumnDivider(tableLeft + secondColumnWidth, table7Top, row5Height+60); // Column divider

  addText(
    "11. Deadline for\nSubmission of\nQuotation",
    tableLeft + 10,
    table7Top + 5,
    "Helvetica-Bold",
    12
  );

  addText(
    "11.1 ",
    tableLeft + secondColumnWidth + 6,
    table7Top + 12,
    "Helvetica",
    12
  );
  addText(
    "Quotations must be received by the Purchaser at the address set out in Section II, “Data Sheet”, and no later than the date and time as specified in the Data Sheet.",
    tableLeft + secondColumnWidth + 30,
    table7Top + 12,
    "Helvetica",
    12
  );


  const table8Top = table7Top +60; // Adjust spacing

  drawTableBorder(table8Top, row7Height); // Border
  drawRowDivider(tableLeft, table8Top+row7Height, tableWidth); // Row divider

  addText(
    "12. Late",
    tableLeft + 10,
    table8Top + 5,
    "Helvetica-Bold",
    12
  );

  addText(
    "12.1 ",
    tableLeft + secondColumnWidth + 6,
    table8Top + 12,
    "Helvetica",
    12
  );
  addText(
    "The Purchaser shall reject any quotation that arrives after the",
    tableLeft + secondColumnWidth + 30,
    table8Top + 12,
    "Helvetica",
    12
  ); 
};

module.exports = generateTable2;
