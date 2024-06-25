const generateTable6 = (doc) => {
    // Define constants for table dimensions and positions
    const tableTop = 80;
    const tableLeft = 50;
    const tableWidth = 750; // Reduced width for the table
    const numberOfRows = 16; // Total number of rows in the table
    const rowHeight = [50, 30]; // Increased height for the first row, standard height for the rest
  
    // Adjusted column widths for landscape mode with the new column added
    const columnWidths = [
      100,
      170,
      280,
      70,
      130
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
      "Section IV: Technical Specification & Compliance",
      tableLeft + tableWidth / 4,
      tableTop - 20,
      "Helvetica-Bold",
      14
    );
    // Draw table border
    drawTableBorder(
      tableTop,
      rowHeight[0] + rowHeight[1] * (numberOfRows - 1)
    );
  
    // Draw row dividers
    for (let i = 1; i < numberOfRows; i++) {
      // Loop through only up to numberOfRows - 1
      drawRowDivider(
        tableLeft,
        tableTop + rowHeight[0] + i * rowHeight[1],
        tableWidth
      );
    }
  
    // Draw column dividers
    let columnPosition = tableLeft;
    for (let width of columnWidths) {
      drawColumnDivider(
        columnPosition + width,
        tableTop,
        rowHeight[0] + rowHeight[1] * (numberOfRows - 1)
      );
      columnPosition += width;
    }
  
    // Add header text
    const headers = [
      { text: "Item # and\nName", width: columnWidths[0] },
      { text: "Component Description", width: columnWidths[1] },
      { text: "Minimum Specifications", width: columnWidths[2] },
      { text: "Bidder's\nResponse\n(Yes/No)", width: columnWidths[3] },
      { text: "If “No” comment/s on the offer", width: columnWidths[4] }
    ];
  
    let headerPosition = tableLeft;
    for (let header of headers) {
      addText(
        header.text,
        headerPosition + 5,
        tableTop + 10,
        "Helvetica-Bold",
        12
      ); // Bold font and adjusted position
      headerPosition += header.width;
    }
  };
  
  module.exports = generateTable6;