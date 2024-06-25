const generateTable8 = (doc) => {
    // Define constants for table dimensions and positions
    const tableTop = 80;
    const tableLeft = 50;
    const tableWidth = 750; // Width for the table in landscape orientation
    const numberOfRows = 14; // Total number of rows in the table
    const rowHeight = [30, 60, 60, 20, ...Array(numberOfRows - 4).fill(20)]; // Increased height for the first row, standard height for the rest
  
    // Adjusted column widths for landscape mode with the new column added
    const columnWidths = [
      40, //1
      190, //2
      70, //3
      40, //4
      40, //5
      40, //6
      90, //7
      90, //8
      90, //9
      60, //10
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
      "Price Schedule",
      ((tableLeft + tableWidth) * 2) / 5 + 40,
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
    drawRowDivider(tableLeft, tableTop + rowHeight[0], tableWidth);
  
    // Draw column dividers
    let columnPosition = tableLeft;
    for (let width of columnWidths) {
      drawColumnDivider(columnPosition + width, tableTop, tableHeight - 18);
      columnPosition += width;
    }
  
    drawColumnDivider(
      tableLeft + columnWidths.slice(0, 8).reduce((acc, curr) => acc + curr, 0),
      tableTop + tableHeight - 18,
      19
    );
    drawColumnDivider(
      tableLeft + columnWidths.slice(0, 9).reduce((acc, curr) => acc + curr, 0),
      tableTop + tableHeight - 18,
      19
    );
  
    // Add header text
    const counts = [
      { text: "1", width: columnWidths[0] },
      { text: "2", width: columnWidths[1] },
      { text: "3", width: columnWidths[2] },
      { text: "4", width: columnWidths[3] },
      { text: "5", width: columnWidths[4] },
      { text: "6", width: columnWidths[5] },
      { text: "7", width: columnWidths[6] },
      { text: "8", width: columnWidths[7] },
      { text: "9", width: columnWidths[8] },
      { text: "10", width: columnWidths[9] },
    ];
  
    let CountPosition = tableLeft;
    for (let count of counts) {
      addText(count.text, CountPosition + 5, tableTop + 10, "Helvetica-Bold", 12);
      CountPosition += count.width;
    }
  
    const headers = [
      { text: "Line\nItem\nNo", width: columnWidths[0] },
      { text: "    Description of Goods", width: columnWidths[1] },
      { text: "Country of\n Origin", width: columnWidths[2] },
      { text: "Quan\n-tity", width: columnWidths[3] },
      { text: "Unit", width: columnWidths[4] },
      {
        text: "Unit\nprice",
        width: columnWidths[5],
      }, // New column header
      { text: "Sub Total", width: columnWidths[6] },
      {
        text: "Inland trans\n-portation and\nother services",
        width: columnWidths[7],
      },
      { text: "Total Price for\nItem", width: columnWidths[8] },
      { text: "VAT", width: columnWidths[9] },
    ];
    let headerPosition = tableLeft;
    for (let header of headers) {
      addText(
        header.text,
        headerPosition + 5,
        tableTop + rowHeight[0] + 10,
        "Helvetica-Bold",
        12
      );
      headerPosition += header.width;
    }
  
    const instructions = [
      { text: "[insert\nnumber\nof item]", width: columnWidths[0] },
      { text: "[insert name of Goods]", width: columnWidths[1] },
      {
        text: "[insert\ncountry of\norigin of the\nGood]",
        width: columnWidths[2],
      },
      { text: "[insert\nno of\nunits\nto be\nsupplied]", width: columnWidths[3] },
      { text: "[insert\nunit]", width: columnWidths[4] },
      {
        text: "[insert\nprice\nper unit]",
        width: columnWidths[5],
      },
      {
        text: "[(7) = (4) x (6)]",
        width: columnWidths[6],
      },
      {
        text: "[insert total cost of\nline item for\ninland transportation\nand other services\nrequired]",
        width: columnWidths[7],
      },
      {
        text: "[(9) = (7) x (8)]",
        width: columnWidths[8],
      },
      {
        text: "[insert total\nVAT of\nline item]",
        width: columnWidths[9],
      },
    ];
  
    let instructionPosition = tableLeft;
    for (let ins of instructions) {
      addText(
        ins.text,
        instructionPosition + 3,
        tableTop + rowHeight[0] * 2 + 38,
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
  
    addText(
      "Total",
      tableLeft +
        columnWidths.slice(0, 8).reduce((acc, curr) => acc + curr, 0) -
        columnWidths[7] / 2,
      tableTop + tableHeight - 18 + 5,
      "Helvetica",
      12
    );
  
    addText(
      "Name of Bidder",
      tableLeft + 30,
      tableTop + tableHeight + 10,
      "Helvetica",
      10
    );
    addText(
      "[insert complete name of Bidder]",
      tableLeft + 100,
      tableTop + tableHeight + 10,
      "Helvetica-Oblique",
      10
    );
    addText(
      "Signature of Bidder",
      tableLeft + 250,
      tableTop + tableHeight + 10,
      "Helvetica",
      10
    );
    addText(
      "[signature of person signing the Bid]",
      tableLeft + 340,
      tableTop + tableHeight + 10,
      "Helvetica-Oblique",
      10
    );
  
    addText(
      "Date",
      tableLeft + 505,
      tableTop + tableHeight + 10,
      "Helvetica",
      10
    );
  
    addText(
      "[insert date]",
      tableLeft + 530,
      tableTop + tableHeight + 10,
      "Helvetica-Oblique",
      10
    );
  };
  
  module.exports = generateTable8;