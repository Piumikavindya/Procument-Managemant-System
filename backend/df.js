const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const procProject = require('./procProject'); // Adjust the path as needed
const PDFTable = require('pdfkit-table');

exports.createShoppingPdf = async (req, res) => {
  const requestData = req.body;

  if (!requestData.projectId) {
    return res.status(400).send("ProjectId is required");
  }

  try {
    const project = await procProject
      .findOne({ projectId: requestData.projectId })
      .select("procurementRequests");

    if (!project) {
      return res.status(404).send("Project not found");
    }

    const pdfFileName = `Project_Shopping${requestData.projectId}.pdf`;
    const pdfDirPath = path.join(
      __dirname,
      "..",
      "projects",
      "shopping",
      pdfFileName
    );

    const doc = new PDFDocument({ margin: 30, size: "A4" });
    const outputStream = fs.createWriteStream(pdfDirPath);
    doc.pipe(outputStream);

    // Add front page content
    const logoPath =
      "E:\\5sem\\Procument-Managemant-System\\backend\\images\\download.jpg";
    doc.image(logoPath, 200, 100, { width: 80 });

    doc.font("Helvetica-Bold");
    doc.fontSize(24).text("Procurement of Goods", 150, 220);
    doc.moveDown();

    doc.font("Helvetica-Bold");
    doc.fontSize(24).text("Under ", 220, 260);
    doc.moveDown();
    doc.font("Helvetica-Bold");
    doc.fontSize(24).text("National Shopping Procedures", 100, 300);
    doc.moveDown();

    doc.font("Helvetica-Bold");
    doc.fontSize(18).text("Invitation of Quotations For", 150, 400);
    doc.moveDown();
    doc.font("Helvetica-Bold");
    doc
      .fontSize(18)
      .text("Supply, Delivery & Installation of Air Conditioners ", 50, 440);
    doc.moveDown();
    doc.font("Helvetica-Bold");
    doc.fontSize(18).text("Invitation No: RUH/SUP/FLQ/2020/06", 100, 480);
    doc.moveDown();

    const logoPathUni =
      "E:\\5sem\\Procument-Managemant-System\\backend\\images\\unilogoc.jpg";
    doc.image(logoPathUni, 200, 550, { width: 60 });

    doc.font("Helvetica");
    doc.fontSize(14).text("     University of Ruhuna ", 150, 670);
    doc.moveDown();

    doc.font("Helvetica");
    doc.fontSize(14).text("   Faculty of Engineering, ", 150, 700);
    doc.moveDown();
    doc.font("Helvetica");
    doc.fontSize(14).text(" Hapugala , Galle , Sri Lanka.", 150, 730);
    doc.moveDown();

    // Move to the next page
    doc.addPage();

    // Define table content
    const table = {
      headers: [
        { label: "A: General", headerRenderer: " ", colspan: 2, align: "center", padding: 5 },
      ],
      rows: [
        [{ label: "1. Scope of Bid", padding: 5 }, "1.1 The Purchaser named in the Data Sheet invites you to submit a quotation for the supply of Goods as specified in Section III Schedule of Requirements. Upon receipt of this invitation, you are requested to acknowledge the receipt of the invitation and your intention to submit a quotation. The Purchaser may not consider you for inviting quotations in future, if you fail to acknowledge this invitation and/or if you withdraw from the bidding after acknowledging the invitation or failure."],
        [{ label: "B: Contents of Documents", headerRenderer: " ", colspan: 2, align: "center", padding: 5 }],
        [{ label: "2. Contents of Documents", padding: 5 }, "2.1 The Documents consist of the Sections indicated below.\nSection I: Instructions to Vendors (ITV)\nSection II: Data Sheet\nSection III: Schedule of Requirements\nSection IV: Technical Specifications & Compliance\nSection V: Quotation Submission Form(s)\nSection VI: Price Schedule"],
        [{ label: "C: Preparation of Quotations", headerRenderer: " ", colspan: 2, align: "center", padding: 5 }],
        [{ label: "3. Documents Comprising Your Quotation", padding: 5 }, "3.1 The Quotation shall comprise the following:\n(a) Quotation Submission Form and the Price Schedule(s);\n(b) Technical Specifications and Compliance Form;"],
        [{ label: "4. Quotation Submission Form and Price Schedules", padding: 5 }, "4.1 The Quotation shall be prepared using the attached Submission Forms. The Forms must be completed without any alterations to the text, and no substitutes shall be accepted. All blank spaces shall be filled in with the information requested."],
        [{ label: "5. Prices and Discounts", padding: 5 }, "5.1 The Price to be quoted in the Price Schedule shall be the unit price of the Goods, and the total price based on the estimated quantity and delivery terms indicated."],
        [{ label: "6. Currency", padding: 5 }, "6.1 The unit rates and prices shall be quoted by the Bidder in the same currency as the invitation to bid."],
        [{ label: "7. Evaluation of Quotations", padding: 5 }, "7.1 The Purchaser shall evaluate each quotation that has been determined, up to this stage of the evaluation, to be substantially responsive."],
        [{ label: "8. Conformity of the Goods", padding: 5 }, "8.1 The Purchaser shall evaluate the technical aspects of the quotation submitted in accordance with Section IV, Technical Specifications & Compliance Form, to confirm that all requirements specified in the Schedule of Requirements of the bidding document and in the Section IV, Technical Specifications & Compliance Form have been met without any material deviation or reservation."],
      ],
    };

    // Render the table
    doc.table(table, {
      prepareHeader: () => doc.font("Helvetica-Bold").fontSize(10),
      prepareRow: (row, i) => doc.font("Helvetica").fontSize(8),
    });

    doc.end();
    outputStream.on("finish", () => {
      console.log(
        `Shipping Method PDF document ${pdfDirPath} generated successfully.`
      );
      res.download(pdfDirPath);
    });
  } catch (error) {
    console.error("Error generating Shipping Method PDF:", error.message);
    res.status(500).send("Error generating Shipping Method PDF");
  }
};
