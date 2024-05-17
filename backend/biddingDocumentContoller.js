// require dependencies
const fs = require("fs");
const PDFDocument = require("pdfkit-table");

// export function to create PDF
exports.createPdf = async (req, res) => {
  // initialize PDFDocument
  let doc = new PDFDocument({ margin: 30, size: 'A4' });

  // set the content type for response (if using Express or similar)
  res.setHeader('Content-Type', 'application/pdf');
  // set the content disposition for attachment
  res.setHeader('Content-Disposition', 'attachment; filename="document.pdf"');

  // pipe the PDF document to the response stream
  doc.pipe(res);

  // define the table structure and data
  const table = {
    title: "Title",
    subtitle: "Subtitle",
    headers: [
      { label: "Name", property: 'name', width: 60 },
      { label: "Description", property: 'description', width: 150 },
      { label: "Price 1", property: 'price1', width: 100 },
      { label: "Price 2", property: 'price2', width: 100 },
      { label: "Price 3", property: 'price3', width: 80 },
      { label: "Price 4", property: 'price4', width: 43,
        renderer: (value, indexColumn, indexRow, row, rectRow, rectCell) => {
          return `U$ ${Number(value).toFixed(2)}`;
        }
      },
    ],
    // complex data
    datas: [
      { 
        name: 'Name 1', 
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis ante in laoreet egestas.', 
        price1: '$1', 
        price3: '$ 3', 
        price2: '$2', 
        price4: '4', 
      },
      { 
        name: 'Name 2', 
        description: 'Lorem ipsum dolor.', 
        price1: '$1', 
        price3: { label: 'PRICE $3' }, // Example of using label option
        price2: '$2', 
        price4: '4', 
      },
      // Add more data objects as needed
    ],
    // simple data (alternative structure)
    rows: [
      ["Apple", "Nullam ut facilisis mi. Nunc dignissim ex ac vulputate facilisis.", "$ 105,99", "$ 105,99", "$ 105,99", "105.99"],
      // Add more rows as needed
    ],
  };

  // draw the table
  doc.table(table, {
    prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
    prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
      doc.font("Helvetica").fontSize(8);
      if (indexColumn === 0) {
        doc.addBackground(rectRow, 'blue', 0.15);
      }
    },
  });

  // finalize the PDF document
  doc.end();
};
