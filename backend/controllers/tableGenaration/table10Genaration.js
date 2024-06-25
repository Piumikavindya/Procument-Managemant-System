const generateTable10 = (doc) => {
    // Define constants for table dimensions and positions
    const tableTop = 80;
    const tableLeft = 50;
    const tableWidth = 750; // Width for the table in landscape orientation
    const numberOfRows1 = 3; // Total number of rows in the table
  
    const rowHeight = 20;
    // Adjusted column widths for landscape mode with the new column added
  
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
  
    addText(
      "Sample Purchase Order",
      ((tableLeft + tableWidth) * 2) / 5 + 40,
      tableTop - 50,
      "Helvetica-Bold",
      14
    );
    addText(
      "(Purchaser may modify this form to suit the requirements)",
      (tableLeft + tableWidth) / 4 + 60,
      tableTop - 30,
      "Helvetica",
      14
    );
  
    //Table1
  
    // Calculate total table height and leave space at the bottom of the page
    const total1TableHeight = rowHeight * 3;
    const pageHeight = 595; // A4 page height in points (landscape orientation)
    const bottomMargin = 40; // Space to leave at the bottom of the page
  
    // Ensure the table fits within the page height with the bottom margin
    const table1Height = Math.min(
      total1TableHeight,
      pageHeight - tableTop - bottomMargin
    );
  
    // Draw table border
    drawTableBorder(tableTop, table1Height);
  
    drawColumnDivider(tableLeft + (tableWidth * 2) / 5, tableTop, 2 * rowHeight);
    row1_row4 = rowHeight * 3 + 60;
    drawRowDivider(tableLeft, tableTop + rowHeight, tableWidth);
    drawRowDivider(tableLeft, tableTop + rowHeight * 2, tableWidth);
    drawRowDivider(tableLeft, tableTop + row1_row4, tableWidth);
  
    addText(
      "Title of Procurement:",
      tableLeft + 5,
      tableTop + 5,
      "Helvetica-Bold",
      10
    );
  
    addText(
      ".. (Name of Procurement) …..",
      tableLeft + 110,
      tableTop + 5,
      "Helvetica",
      10
    );
  
    addText(
      "Date:",
      tableLeft + 5 + (tableWidth * 2) / 5,
      tableTop + 5,
      "Helvetica-Bold",
      10
    );
  
    addText(
      "….. (Date of this purchase Order) …….",
      tableLeft + 35 + (tableWidth * 2) / 5,
      tableTop + 5,
      "Helvetica",
      10
    );
  
    //2nd row
    addText(
      "Our Reference: …….. (Quotation Number) ……",
      tableLeft + 5,
      tableTop + rowHeight + 5,
      "Helvetica",
      10
    );
  
    addText(
      "Your Reference: ……. (Quotation submitted by you with your cover letter dated ….)",
      tableLeft + 5 + (tableWidth * 2) / 5,
      tableTop + rowHeight + 5,
      "Helvetica",
      10
    );
  
    //3rd row
    addText(
      "We are pleased to inform you that we have accepted your quotation for the supply of following goods as detailed below:",
      tableLeft + 5,
      tableTop + rowHeight * 2 + 5,
      "Helvetica",
      10
    );
  
    ////////////////////////////////////////////////////////////////
    //Table 2
    table2_rows = 5;
    row2_height = [60, 20];
    const total2TableHeight = row2_height[0] + row2_height[1] * (table2_rows - 1);
    const table2Height = Math.min(
      total2TableHeight,
      pageHeight - table1Height - bottomMargin
    );
  
    table2Top = tableTop + rowHeight * 3;
    drawTableBorder(table2Top, table2Height);
  
    const columnWidths = [
      40, //1
      190, //2
      73, //3
      37, //4
      40, //5
      40, //6
      90, //7
      90, //8
      90, //9
      60, //10
    ];
    //Draw column dividers
    columnPosition = tableLeft;
    for (let width of columnWidths) {
      drawColumnDivider(columnPosition + width, table2Top, table2Height);
      columnPosition += width;
    }
  
    drawRowDivider(
      tableLeft,
      table2Top + row2_height[0] + row2_height[1],
      tableWidth
    );
    drawRowDivider(
      tableLeft,
      table2Top + row2_height[0] + row2_height[1] * 2,
      tableWidth
    );
    drawRowDivider(
      tableLeft,
      table2Top + row2_height[0] + row2_height[1] * 3,
      tableWidth
    );
  
    const headers = [
      { text: "Item\n#", width: columnWidths[0] },
      { text: "    Description", width: columnWidths[1] },
      {
        text: "Model Number\n& Specification\nreference",
        width: columnWidths[2],
      },
      { text: "Unit", width: columnWidths[3] },
      { text: "Qty", width: columnWidths[4] },
      {
        text: "Unit\nprice",
        width: columnWidths[5],
      }, // New column header
      { text: "Amount", width: columnWidths[6] },
      {
        text: "Delivery\nDate",
        width: columnWidths[7],
      },
      { text: "Delivery\nLocation", width: columnWidths[8] },
      { text: "Remarks", width: columnWidths[9] },
    ];
    let headerPosition = tableLeft;
    for (let header of headers) {
      addText(
        header.text,
        headerPosition + 5,
        tableTop + table1Height + 10,
        "Helvetica",
        10
      );
      headerPosition += header.width;
    }
    ///////////////////////////////////////////////////////////////////////////
    //Table 3 for conditions
    table3Top = table2Top + table2Height;
    total3TableHeight = 200;
  
    const table3Height = Math.min(
      total3TableHeight,
      pageHeight - table1Height - table2Height - bottomMargin
    );
    drawTableBorder(table3Top, table3Height);
  
    addText(
      "Other Conditions of this supply are as follows:",
      tableLeft + 5,
      table3Top + 10,
      "Helvetica",
      10
    );
  
    addText(
      "1. The Goods supplied under this Contract shall conform to the technical specifications and standards mentioned above;",
      tableLeft + 15,
      table3Top + 30,
      "Helvetica",
      10
    );
  
    addText(
      "2. The Supplier warrants that all the Goods are new, unused, and of the most recent or current models, free from defects and that they incorporate all recent improvements in design and materials;",
      tableLeft + 15,
      table3Top + 30 * 2 - 10,
      "Helvetica",
      10
    );
  
    addText(
      "3. The warranty shall remain valid for the period given above, aft er the Goods, or any portion thereof as the case may be, have been delivered to and accepted at the final destination indicated;",
      tableLeft + 15,
      table3Top + 30 * 3 - 10,
      "Helvetica",
      10
    );
  
    addText(
      "4. If the Supplier fails to deliver any or all of the Goods by the Date(s) specified above, the Purchaser may without prejudice to all its other remedies, deduct from the payments due to the Supplier, as liquidated damages, a sum equivalent to the …. % per each day, of the delivered price of the delayed Goods;",
      tableLeft + 15,
      table3Top + 30 * 4 - 10,
      "Helvetica",
      10
    );
  
    addText(
      "5. Upon the Supplier’s ful fillment of all the obligations stipulated above and making a request for payment to the Purchaser in writing, accompanied by invoices describing, as appropriate, the Goods delivered payments shall be made by the Purchaser.",
      tableLeft + 15,
      table3Top + 30 * 5 - 10,
      "Helvetica",
      10
    );
  
    addText(
      "Signature Name and Address of Purchaser:",
      tableLeft + 5,
      table3Top + 30 * 6,
      "Helvetica",
      10
    );
  
    drawRowDivider(tableLeft, table3Top + 30 * 7 + 10, 120);
  
    addText(
      "Attach specifications",
      tableLeft + 15,
      table3Top + 30 * 7 + 20,
      "Helvetica",
      10
    );
  };
  
  module.exports = generateTable10;