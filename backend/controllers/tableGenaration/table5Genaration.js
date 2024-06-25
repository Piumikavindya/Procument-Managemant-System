const generateTable5 = (doc) => {
    // Define constants for table dimensions and positions
    const tableTop = 80;
    const tableLeft = 50;
    const tableWidth = 750; // Width for the table in landscape orientation
    const numberOfRows = 10; // Total number of rows in the table
    const rowHeight = [60, 60, 40, ...Array(numberOfRows - 3).fill(40)]; // Increased height for the first row, standard height for the rest
  
    // Adjusted column widths for landscape mode with the new column added
    const columnWidths = [
      40,
      200,
      70,
      50,
      100,
      100,
      190, // Widths for each column in the first row
    ];
  
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
      "Section III: Schedule of Requirements",
      tableLeft + tableWidth / 3,
      tableTop - 20,
      "Helvetica-Bold",
      14
    );
  
    // Calculate total table height and leave space at the bottom of the page
    const totalTableHeight = rowHeight.reduce((acc, curr) => acc + curr, 0);
    const pageHeight = 595; // A4 page height in points (landscape orientation)
    const bottomMargin = 50; // Space to leave at the bottom of the page
  
    // Ensure the table fits within the page height with the bottom margin
    const tableHeight = Math.min(
      totalTableHeight,
      pageHeight - tableTop - bottomMargin
    );
  
    // Draw table border
    drawTableBorder(tableTop, tableHeight);
  
    // Draw row dividers for the first and second rows
    drawRowDivider(tableLeft, tableTop + rowHeight[0]+30, tableWidth);
    //drawRowDivider(tableLeft, tableTop + rowHeight[0] + rowHeight[1], tableWidth);
  
    // Draw additional row divider for the last column's cell in the first row
    drawRowDivider(
      tableLeft + columnWidths.slice(0, 6).reduce((acc, curr) => acc + curr, 0),
      tableTop + rowHeight[0] / 2, // rowHeight[0] / 2 is Delivery date cell height
      columnWidths[6]
    );
  
    drawColumnDivider(
      tableLeft +
        columnWidths.slice(0, 6).reduce((acc, curr) => acc + curr, 0) +
        (columnWidths[6] * 1) / 3,
      tableTop + rowHeight[0] / 2,
      tableHeight - rowHeight[0] / 2
    );
  
    // Draw column dividers
    let columnPosition = tableLeft;
    for (let width of columnWidths) {
      drawColumnDivider(columnPosition + width, tableTop, tableHeight);
      columnPosition += width;
    }
  
    // Add header text
    const headers = [
      { text: "Line\nItem\nNo", width: columnWidths[0] },
      { text: "    Description of Goods", width: columnWidths[1] },
      { text: " Quantity", width: columnWidths[2] },
      { text: "  Unit", width: columnWidths[3] },
      { text: "      Final\n  Destination", width: columnWidths[4] },
      {
        text: "Transportation\n    and any\nother services",
        width: columnWidths[5],
      }, // New column header
      { text: "         Delivery Date", width: columnWidths[6] },
    ];
  
    let headerPosition = tableLeft;
    for (let header of headers) {
      addText(
        header.text,
        headerPosition + 5,
        tableTop + 10,
        "Helvetica-Bold",
        12
      );
      headerPosition += header.width;
    }
  
    // Sub headers section
    addText(
      "Latest\nDelivery\nDate",
      tableLeft +
        15 +
        columnWidths.slice(0, 6).reduce((acc, curr) => acc + curr, 0),
      tableTop + 15 + rowHeight[0] / 2,
      "Helvetica",
      10
    );
    addText(
      "Bidder's offered\nDelivery date\n[to be provided\nby the bidder]",
      tableLeft +
        3 +
        columnWidths.slice(0, 6).reduce((acc, curr) => acc + curr, 0) +
        (columnWidths[6] * 1) / 3,
      tableTop + 10 + rowHeight[0] / 2,
      "Helvetica",
      9.5
    );
  
    const instructions = [
      { text: "[insert\nItem\nNo]", width: columnWidths[0] },
      { text: "[insert description of Goods]", width: columnWidths[1] },
      {
        text: "[insert\nquantity of\nitem to be\nsupplied]",
        width: columnWidths[2],
      },
      { text: "[insert\nunit]", width: columnWidths[3] },
      { text: "[insert place of\nDelivery]", width: columnWidths[4] },
      {
        text: "",
        width: columnWidths[5],
      },
      {
        text: "[insert the no\nof days\nfollowing the\ndate of issuing\nPurchase\nOrder]",
        width: columnWidths[6] / 3,
      },
      {
        text: "[insert the number of\ndays following the\ndate of issuing\nPurchase Order]",
        width: (columnWidths[6] * 2) / 3,
      },
    ];
  
    let instructionPosition = tableLeft;
    for (let ins of instructions) {
      addText(
        ins.text,
        instructionPosition + 3,
        tableTop + rowHeight[0] + 33,
        "Helvetica-Oblique",
        9
      ); // Bold font and adjusted position
      instructionPosition += ins.width;
    }
    drawRowDivider(tableLeft, tableTop + rowHeight[0] * 2 + 33, tableWidth);
  
    // Draw row dividers after the 2nd row
    let currentTop = tableTop + rowHeight[0] * 2 + 33;
    for (let i = 2; i < numberOfRows; i++) {
      currentTop += rowHeight[i]; // Use rowHeight[i] to account for varying row heights
      if (currentTop > tableTop + tableHeight) break; // Stop if exceeding table height
      drawRowDivider(tableLeft, currentTop, tableWidth);
    }
  };
  
  module.exports = generateTable5;