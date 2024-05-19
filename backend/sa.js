// Requires
const fs = require("fs");
const PDFDocument = require("pdfkit-table");
const ProcRequest = require("./Models/procReqest"); // Assuming this is your Mongoose model

// Assume this is your function to fetch data from the database
async function fetchDataFromDatabase() {
    try {
        // Implementation to fetch data from the database
        // Return mock data for testing purposes
        const options = { 
            // Adjust timeout (in milliseconds) as needed
            maxTimeMS: 30000 // Example: 30 seconds 
        };

        const requestData = await ProcRequest.findOne({}).select("items").maxTimeMS(30000);
        return requestData.items; // Return items array
    } catch (error) {
        console.error("Error fetching data from database:", error);
        throw error; // Throw error to handle it in the main function
    }
}

// Initialize document
let doc = new PDFDocument({ margin: 30, size: 'A4' });

// Pipe document to a writable stream
doc.pipe(fs.createWriteStream("./document.pdf"));

(async function(){
    try {
        // Fetch data from database
        const items = await fetchDataFromDatabase();

        // Define the table structure
        const table = {
            headers: [
                { label: "Description of materials", property: 'itemName', width: 150 },
                { label: "Quantity", property: 'qtyRequired', width: 50 },
                { label: "Price per unit in Figures & Words", property: 'price1', width: 100 },
                { label: "Trade Mark", property: 'price2', width: 50 },
                { label: "Date By which delivery can be completed", property: 'price3', width: 50 },
                { label: "Substitutes", property: 'price4', width: 50 },
                { label: "Remarks", property: 'remarks', width: 50 },
            ],
            datas: items.map(item => ({
                itemName: item.itemName,
                qtyRequired: item.qtyRequired,
                price1: "", // Placeholder for price
                price2: "", // Placeholder for trademark
                price3: "", // Placeholder for delivery date
                price4: "", // Placeholder for substitutes
                remarks: "", // Placeholder for remarks
            })),
        };

        // Generate the table in PDF
        doc.table(table, {
            prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
            prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
                doc.font("Helvetica").fontSize(8);
                if (indexRow % 2 === 0) {
                    doc.fillColor('lightblue'); // Alternate row color
                    doc.rect(rectRow.x, rectRow.y, rectRow.width, rectRow.height).fill();
                }
            },
        });

        // Finalize and save the document
        doc.end();

        console.log("PDF document generated successfully.");
    } catch (error) {
        console.error("Error generating PDF document:", error);
    }
})();
