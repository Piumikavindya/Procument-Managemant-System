const procProject = require("../Models/ProcProject");
const path = require("path");
const procRequest = require("../Models/procReqest");

const fs = require("fs");
const mongoose = require("mongoose");
const PDFDocument = require("pdfkit-table");

exports.generateProjectId = async (req, res) => {
  try {
    // Determine the latest project
    const latestProject = await procProject.findOne(
      {},
      {},
      { sort: { projectId: -1 } }
    );

    // Generate a new project ID based on the latest project ID or start with 001 if no projects exist
    const newProjectId = latestProject
      ? getNextProjectId(latestProject.projectId)
      : "RUH_ENG_NCB_C_2024_001";

    // Create a new instance of the model
    const newProjectInstance = new procProject({
      projectId: newProjectId,
      // Add other relevant fields here
    });

    // Save the instance to the database
    const savedProject = await newProjectInstance.save();

    // Respond with the generated ID and the saved document
    res.json({ projectId: savedProject.projectId, savedProject });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to get the next project ID
function getNextProjectId(previousProjectId) {
  const parts = previousProjectId.split("/");
  const lastPart = parseInt(
    parts
      .pop()
      .split(/[^0-9]/)
      .pop(),
    10
  );
  const incrementedPart = (lastPart + 1).toString().padStart(3, "0");
  const yearPart = new Date().getFullYear();
  return `RUH_ENG_NCB_C_${yearPart}_${incrementedPart}`;
}

// Function to fetch data from the database based on request IDs
async function fetchDataFromDatabase(requestIds) {
  try {
    // Fetch data from the database based on the provided request IDs
    const requestData = await procRequest.find({
      requestId: { $in: requestIds },
    });

    // Update the status of the fetched requests to "Buid Opening"
    await procRequest.updateMany(
      { requestId: { $in: requestIds }, status: "Approved" },
      { $set: { status: "Bid Opening" } }
    );

    return requestData;
  } catch (error) {
    // Handle any errors
    console.error("Error fetching data from database:", error);
    throw error;
  }
}

// Controller function to add request data to the Procurement Project
exports.addRequestsData = async (req, res) => {
  try {
    const { requestIds } = req.body;
    const { projectId } = req.params;

    // Fetch data related to the selected request IDs from the database
    const requestData = await fetchDataFromDatabase(requestIds);

    // Find the Procurement Project by projectId
    const project = await procProject.findOne({ projectId });

    // If project not found, handle error
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Push the fetched data into the procurementRequests field of the project
    project.procurementRequests.push(...requestData);

    // Save the updated project to the database
    await project.save();

    res.status(200).json({ message: "Request data added successfully", newRequest: requestData });
  } catch (error) {
    console.error("Error adding request data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.viewAddedRequests = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Find the Procurement Project by projectId
    const project = await procProject
      .findOne({ projectId })
      .select("procurementRequests");

    // If project not found, handle error
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project.procurementRequests);
  } catch (error) {
    console.error("Error fetching added requests:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to create a new Procurement Project
exports.createProject = async (req, res) => {
  const projectId = req.params.projectId;

  try {
    const {
      projectTitle,
      biddingType,
      closingDate,
      closingTime,
      appointTEC,
      appointBOCommite,
      quauotationRequirement 
    } = req.body;

    // Check if a project with the same project ID already exists
    const existingProject = await procProject.findOne({ projectId });

    if (existingProject) {
      // Update the existing project with the new data
      existingProject.projectTitle = projectTitle;
      existingProject.biddingType = biddingType;
      existingProject.closingDate = closingDate;
      existingProject.closingTime = closingTime;
      existingProject.appointTEC = appointTEC;
      existingProject.appointBOCommite = appointBOCommite;
     existingProject.quauotationRequirement = quauotationRequirement ;
      // Save the updated project to the database
      const updatedProject = await existingProject.save();

      // Send the updated project as a response
      res.status(200).json(updatedProject);
    } else {
      // Create a new project instance
      const newProject = new procProject({
        projectId, // Use the provided projectId
        projectTitle,
        biddingType,
        closingDate,
        closingTime,
        appointTEC,
        appointBOCommite,
        quauotationRequirement 
      });

      // Save the new project to the database
      const createdProject = await newProject.save();

      // Send the created project as a response
      res.status(201).json(createdProject);
    }
  } catch (error) {
    console.error("Error creating project:", error);
    // Handle errors and send an appropriate response
    res
      .status(500)
      .json({ error: "Error creating project", message: error.message });
  }
};


exports.viewAllProjects = async (req, res) => {
  try {
    // Fetch all requests from the database
    const allProjects = await procProject.find();

    // Send the list of requests as a response
    res.json(allProjects);
  } catch (error) {
    console.error("Error fetching all projects:", error);
    // Handle errors and send an appropriate response
    res.status(500).json({ error: error.message });
  }
};



exports.viewProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Find the request by ID
    const project = await procProject.findOne({ projectId });

    if (!project) {
      return res.status(404).json({ error: "project not found" });
    }

    // Send the request as a response
    res.json(project);
  } catch (error) {
    console.error("Error fetching request by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteProject = async (req, res) => {
  let projectId = req.params.id;

  try {
    await procProject.findByIdAndDelete(projectId);
    res.status(200).send({ status: "Project is deleted" });
  } catch (err) {
    res.status(500).send({ status: "Error with delete request" });
  }
};


// Function to create PDF for "Shipping Method" bidding type

exports.viewSmallProcurementPdf = (req, res) => {
  try {
    const projectId = req.params.projectId;

    const pdfFileName = `Direct_Purchasing_${projectId}.pdf`; // Corrected variable name

    const pdfDirPath = path.join(__dirname, "..", "projects", pdfFileName);

    // Set the content type header
    res.setHeader("Content-Type", "application/pdf");

    // Stream the file to the response
    const stream = fs.createReadStream(pdfDirPath);
    stream.pipe(res);
  } catch (error) {
    console.error("Error viewing PDF:", error);
    res.status(500).send("An error occurred while viewing the PDF");
  }
};

// Function to create PDF for "Direct Purchasing Method" bidding type
exports.createSmallProcurementPdf = async (req, res) => {
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

    const pdfFileName = `Direct_Purchasing_${requestData.projectId}.pdf`;
    const pdfDirPath = path.join(
      __dirname,
      "..",
      "projects",
      pdfFileName
    );


    const doc = new PDFDocument({ margin: 30, size: "A4" });
    const outputStream = fs.createWriteStream(pdfDirPath);
    doc.pipe(outputStream);

    const fontPath = path.join(__dirname, "..", "fonts", "Iskoola Pota Regular.ttf");
    const fontPathTamil = path.join(__dirname, "..", "fonts", "VANAVIL-Avvaiyar Regular.otf");
    const fontPathBold = path.join(__dirname, "..", "fonts", "iskpotab.ttf");


    // Add front page content
    const logoPath = path.join(__dirname, "..", "images", "logo.jpg");
   
    doc.image(logoPath, 50, 25, { width: 80 });

    doc.font(fontPathBold);
    doc.fontSize(25).text("රුහුණ විශ්වවිද්‍යාලය", 150, 20);
    doc.moveDown();

    doc.font(fontPathTamil);
    doc.fontSize(18).text("WA&z gy¦fiyf¦fHfk¦", 150, 46);
    doc.moveDown();

    doc.font("Helvetica");
    doc.fontSize(14).text("UNIVERSITY OF RUHUNA", 150, 65);
    doc.moveDown();

    doc.font(fontPathBold);
    doc.fontSize(14).text("මගේ අංකය", 400, 24);
    doc.moveDown();

    doc.font(fontPathTamil);
    doc.fontSize(14).text("vdJ vz¦", 400, 36);
    doc.moveDown();

    doc.font("Helvetica");
    doc.fontSize(12).text("My No.", 400, 48);
    doc.moveDown();
    doc.font("Helvetica");
    doc.fontSize(38).text("}", 485, 24);
    doc.moveDown();
    doc.font(fontPathBold);
    doc.fontSize(14).text("ඔබේ අංකය", 400, 64);
    doc.moveDown();

    doc.font(fontPathTamil);
    doc.fontSize(14).text("c§fsJ vz¦", 400, 76);
    doc.moveDown();

    doc.font("Helvetica");
    doc.fontSize(12).text("Your No.", 400, 88);
    doc.moveDown();

    doc.font("Helvetica");
    doc.fontSize(38).text("}", 485, 64);
    doc.moveDown();
    doc.font(fontPathBold);
    doc.fontSize(18).text("ඉංජිනේරු පීඨය", 150, 80);
    doc.moveDown();
    doc.font(fontPathTamil);
    doc.fontSize(12).text("bghw¨a¨ay¦ g¬lk¦", 150, 100);
    doc.moveDown();
    doc.font("Helvetica");
    doc.fontSize(12).text("Faculty of Engineering", 150, 115);
    doc.moveDown();
    doc.font(fontPath);
    doc.fontSize(10).text("හපුගල,ගාල්ල,80000 ශ්‍රී ලංකාව", 150, 130);
    doc.moveDown();
    doc.font(fontPathTamil);
    doc.fontSize(10).text("Ag¦òAy¦y fhy¨ 80000 Ïy§if", 275, 130);
    doc.moveDown();

    doc.font("Helvetica");
    doc.fontSize(10).text("Hapugala Galle 80000 Sri Lanka", 420, 130);
    doc.moveDown();
    // Draw a horizontal line
    doc
      .moveTo(10, 160) // Starting point (x, y)
      .lineTo(580, 160) // Ending point (x, y)
      .stroke(); // Draw the line

    doc.moveDown(1); // Add some space after the line
    doc.font(fontPath);
    doc.fontSize(14).text("දිනය", 440, 164); // Adjust the coordinates as needed
    doc.moveDown();
    doc.font("Helvetica");
    doc.fontSize(12).text("Date : 24.05.2024", 440, 180);
    doc.moveDown();

    // Add QUOTATION in both Sinhala and English
    doc.font(fontPathBold);
    doc.fontSize(20).text("මිල ගණන් කැදවීම", 220, 200); // Adjust the coordinates as needed
    doc.moveDown();
    doc.font("Helvetica");
    doc.fontSize(16).text("QUOTATION", 240, 230);
    doc.moveDown();

    doc.font(fontPath);
    doc
      .fontSize(10)
      .text(
        "1. මෙහි අනෙක් පැත්තේ සදහන්කර ඇති ද්‍රව්‍ය/සේවාව සදහා දැනට පවත්නා අඩුම මිල ගනණ් පිටපත් දෙකකින් යුතුව දක්වනු මැනවි. ",
        10,
        250
      ); // Adjust the coordinates as needed
    doc.moveDown();
    doc.font("Helvetica");
    doc
      .fontSize(10)
      .text(
        "Please quote your present lowest price in duplicate for the articles/services enumerated overlear",
        10,
        265
      );
    doc.moveDown();

    doc.font(fontPath);
    doc
      .fontSize(10)
      .text(
        "2. මෙම මිල ගනණ් පියවීම් කළ දිනයේ සිට මාස තුනක්/හයක් ඉදිරියට බල පැවැත්විය යුතුය.",
        10,
        280
      ); // Adjust the coordinates as needed
    doc.moveDown();
    doc.font("Helvetica");
    doc
      .fontSize(10)
      .text(
        "The quotation will be binding for three/six months from the date of closing.",
        10,
        295
      );
    doc.moveDown();

    doc.font(fontPath);
    doc
      .fontSize(10)
      .text(
        "3. ඔබ මිල ගනණ් ඉදිරිපත් කරන ද්‍රව්‍යයන්හි සාම්පල් ද එවිය යුතු යැයි නියම කර ඇති විට ඒ සමග ඒවාද එවිය යුතුය. ",
        10,
        310
      ); // Adjust the coordinates as needed
    doc.moveDown();
    doc.font("Helvetica");
    doc
      .fontSize(10)
      .text(
        "Samples of your offers when required. should be forwarded along with your quotation.",
        10,
        325
      );
    doc.moveDown();

    doc.font(fontPath);
    doc
      .fontSize(10)
      .text(
        "4. මිල ගණන් සමග එවන ලද සාම්පල් යමක් වෙත‌ෙ‍ාත් මිල ගණන් කැදවීම් පිය වු දින සිට දින 10 ක් ඇතුළත එම සාම්පල් මෙම කාර්යාලයෙන් ඉවත්කරගෙන යා යූතුය.",
        10,
        340
      ); // Adjust the coordinates as needed
    doc.moveDown();
    doc.font("Helvetica");
    doc
      .fontSize(10)
      .text(
        "Samples (if any) submitted with the quotation should be removed from this office within 10 days from dosing date of the quolalion.",
        10,
        365
      );

    doc.font(fontPath);
    doc
      .fontSize(10)
      .text(
        "5. මෙහි සදහන් උපදෙස් නිසි ලෙස නොපිලිපැද්දහොත් ඔබගේ මිල ගණන් ප්‍රතික්ෂේප කිරීමට ඉඩ තිබේ.",
        10,
        390
      ); // Adjust the coordinates as needed
    doc.moveDown();
    doc.font("Helvetica");
    doc
      .fontSize(10)
      .text(
        "Non-compliance of instructions stated herein wi11 result in your offers being rejected.",
        10,
        405
      );
    doc.moveDown();

    doc.font(fontPath);
    doc
      .fontSize(10)
      .text(
        "6. මිල ගණන් ඉදිරිපත් කිරීමට නොහැකි වුවද මෙම ආකෘති පත්‍රය ආපසු එවිය යුතුය.",
        10,
        420
      ); // Adjust the coordinates as needed
    doc.moveDown();
    doc.font("Helvetica");
    doc
      .fontSize(10)
      .text(
        "This form should be duly returned even if you are unable to quote.",
        10,
        435
      );
    doc.moveDown();

    doc.font(fontPath);
    doc
      .fontSize(10)
      .text(
        "7. ඔබ එකතු කළ අගය මත බදු කාර්යාර්ථය පිණිස ලියාපදිංචි වී ඇති නම් ඔබගේ එකතු කළ අගය මත බද්ද සදහා අංකය මිළ ගණන් කැදවීම් ප‌තේ සදහන් කල යුතුය. එලෙස එකතු කළ අගය මත බද්ද සදහා ලියාපදිංචි වී නොමැති නම් ඔබගේ මිළ ගණන් බදු රහිතව සදහන් කල යුතුය. ඒ සමග වැට් සදහා ලියාපදිංචි වී නොමැති බවට දේශීය ආදායම් කොමසාරිස් ජෙනරාල්ගෙන් සහතිකයක් ලබාගෙන එහි ඡායා පිටපතක් මිළ ගණන් කැදවුම් පත්‍රයට අමුණා එවිය යුතුය. එසේ නොවන මිළ ගණන් ප්‍රතික්ෂේප කරණු ලැබේ.      ",
        10,
        450
      ); // Adjust the coordinates as needed
    doc.moveDown();
    doc.font("Helvetica");
    doc
      .fontSize(10)
      .text(
        "If you are registered for the purpose of VAT. the VAT registration number should be indicated on the quotation. If you are 1101 registered for VAT. the prices should be indicated only in NET value. If so you are kindly requested tn attach a copy 01· the certificate issued by the commissioner or Inland Revenue. certifying that you have not been registered f()r V /T. Ir not your quotation will be rejected.",
        10,
        497
      );
    doc.moveDown();

    doc.font(fontPath);
    doc
      .fontSize(10)
      .text(
        "8. මිළ ගණන් බහා එවන කවරයේ උඩ වම් කෙලවර                          යනුවෙන් සදහන් කර සිල් තබා ලේඛනගත තෑපැලෙන් සහාකාර මුල්‍යාධිකාරි,ඉංජිනේරු පීඨය,රුහුණ විශ්වවිද්‍යාලය,හපුගල,ගාල්ල යන ලිපිනයට 2023.11.30 දින පෙ.ව. 10.00 ට පෙර එවිය යුතුය. ",
        10,
        550
      ); // Adjust the coordinates as needed
    doc.moveDown();
    doc.font("Helvetica");
    doc.fontSize(10).text('"Stationery"', 210, 552);
    doc.moveDown();
    doc.font("Helvetica");
    doc
      .fontSize(10)
      .text(
        'Quotation should be marked "Stationery" on the left hand top corner of the envelope and should be sent under sealed registered cover to Assistant Bursar, Faculty of Engineering, University of Ruhuna, Hapugala, Galle. JO. t 1.2023 URGENT',
        10,
        575
      );
    doc.moveDown();

    doc.font(fontPath);
    doc
      .fontSize(10)
      .text(
        "9. භාණ්ඩ ඇණවුම් කිරිමේදි අත්තිකාරම් මුදල් ගෙවනු නොලැබේ. ඇණවුම් කරන ලද භාණ්ඩ අප ශාඛාවට ගෙනවුත් භාරදීමෙන් පසුව පමණක් ගෙවී්ම් කරනු ලැබේ. ",
        10,
        600
      ); // Adjust the coordinates as needed
    doc.moveDown();
    doc.font("Helvetica");
    doc
      .fontSize(10)
      .text(
        "Advance payments will not be made when placing order. Payment will be made only atler the goods are received at our stores.",
        10,
        625
      );
    doc.moveDown();

    doc.font(fontPath);
    doc.fontSize(10).text("ටෙන්ඩර්කරු විසින් සැලකිය යුතුයි. ", 10, 650); // Adjust the coordinates as needed
    doc.moveDown();

    doc.font("Helvetica");
    doc.fontSize(10).text("/ Note to tenderer.", 170, 652);
    doc.moveDown();

    doc.font(fontPath);
    doc
      .fontSize(10)
      .text(
        "මෙම ආකෘති පත්‍රයේ ඇති සෑම තීරයක්ම තීන්තයෙන් පිරවිය යුතුයි. ලියූ යමක් වෙනස් කරන්නේ නම් ඒවාට කෙටි අත්සනක් යෙදිය යුතුයි.",
        10,
        670
      ); // Adjust the coordinates as needed
    doc.moveDown();

    doc.font("Helvetica");
    doc
      .fontSize(10)
      .text(
        "All columns on this form must be filled in ink. Any alterations should be initialled by the tender.",
        10,
        685
      );
    doc.moveDown();
    doc.font(fontPath);
    doc.fontSize(10).text("සහාකාර මූල්‍යධිකාරි/ඉංජිනේරු", 10, 770); // Adjust the coordinates as needed
    doc.moveDown();
    doc.font("Helvetica");
    doc.fontSize(10).text("/Assistant Bursar/ Engineering", 138, 772);
    doc.moveDown();

    // Draw a horizontal line
    doc
      .moveTo(10, 785) // Starting point (x, y)
      .lineTo(580, 785) // Ending point (x, y)
      .stroke(); // Draw the line

    doc.font(fontPath);
    doc.fontSize(8).text("දුරකථනය", 10, 790);
    doc.moveDown();
    doc.font(fontPathTamil);
    doc.fontSize(8).text("bjhiyngr¨", 45, 792);
    doc.moveDown();

    doc.font("Helvetica");
    doc.fontSize(8).text("Telephone", 90, 792);
    doc.moveDown();

    doc.font(fontPath);
    doc.fontSize(8).text("ෆැක්ස්", 150, 792);
    doc.moveDown();
    doc.font(fontPathTamil);
    doc.fontSize(8).text("~gf¦°", 175, 792);
    doc.moveDown();

    doc.font("Helvetica");
    doc.fontSize(8).text("Fax", 210, 792);
    doc.moveDown();

    doc.font(fontPath);
    doc.fontSize(8).text("ඊ මේල්", 250, 790);
    doc.moveDown();
    doc.font(fontPathTamil);
    doc.fontSize(8).text("k¨d¦dŠry¦", 275, 792);
    doc.moveDown();
    doc.font("Helvetica");
    doc.fontSize(8).text("E-mail", 320, 792);
    doc.moveDown();

    doc.font(fontPath);
    doc.fontSize(8).text("වෙබ් අඩවිය", 370, 790);
    doc.moveDown();
    doc.font(fontPathTamil);
    doc.fontSize(8).text("Ïiza¤jsk¦", 410, 792);
    doc.moveDown();
    doc.font("Helvetica");
    doc.fontSize(8).text("Web", 460, 792);
    doc.moveDown();

    doc.font("Helvetica");
    doc.fontSize(8).text("(+94)91-2245763", 15, 800);
    doc.moveDown();

    doc.font("Helvetica");
    doc.fontSize(8).text("(+94)91-2245762", 155, 800);
    doc.moveDown();

    doc.font("Helvetica");
    doc.fontSize(8).text("bursar@eng.ruh.ac.lk", 255, 800);
    doc.moveDown();

    doc.font("Helvetica");
    doc.fontSize(8).text("www.ruh.ac.lk", 375, 800);
    doc.moveDown();

    // Move to the next page
    doc.addPage();

    // Prepare table headers and data
    const headers = [
      { label: "Description of materials", property: "itemName", width: 150 },
      { label: "Quantity", property: "qtyRequired", width: 50 },
      {
        label: "Price per unit in Figures & Words",
        property: "price1",
        width: 100,
      },
      { label: "Trade Mark", property: "price2", width: 50 },
      {
        label: "Date By which delivery can be completed",
        property: "price3",
        width: 80,
      },
      { label: "Substitutes", property: "price4", width: 50 },
      { label: "Remarks", property: "remarks", width: 50 },
    ];

    const rows = [];

    project.procurementRequests.forEach((request) => {
      request.items.forEach((item) => {
        rows.push([item.itemName, item.qtyRequired.toString(), "", "", "", ""]);
      });
    });

    const itemsPerPage = 20;
    const totalPages = Math.ceil(rows.length / itemsPerPage);

    for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
      if (pageIndex > 0) doc.addPage();

      const start = pageIndex * itemsPerPage;
      const end = start + itemsPerPage;
      const rowsForPage = rows.slice(start, end);

      doc.table({
        headers: headers,
        rows: rowsForPage,
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
        prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
          doc.font("Helvetica").fontSize(8);
        },
      });

      doc.font("Helvetica");
      doc.fontSize(10).text("...........................", 100, 750);
      doc.moveDown();
      doc.font(fontPath);
      doc.fontSize(10).text("වෙළද සාමාගමේ නම", 100, 755);
      doc.moveDown();
      doc.font("Helvetica");
      doc.fontSize(10).text("Name of the Firm", 100, 770);
      doc.moveDown();

      doc.font(fontPath);
      doc.fontSize(10).text("රබර් මුද්‍රාව", 250, 755);
      doc.moveDown();
      doc.font("Helvetica");
      doc.fontSize(10).text("Rubber Stamp", 250, 770);
      doc.moveDown();

      doc.font("Helvetica");
      doc.fontSize(10).text("......................", 370, 750);
      doc.moveDown();
      doc.font(fontPath);
      doc.fontSize(10).text("අත්සන", 370, 755);
      doc.moveDown();
      doc.font("Helvetica");
      doc.fontSize(10).text("Signature", 370, 770);
      doc.moveDown();

      doc.font("Helvetica");
      doc.fontSize(10).text("..............", 500, 750);
      doc.moveDown();
      doc.font(fontPath);
      doc.fontSize(10).text("දිනය", 500, 755);
      doc.moveDown();
      doc.font("Helvetica");
      doc.fontSize(10).text("Date", 500, 770);
      doc.moveDown();

      doc.font("Helvetica");
      doc.fontSize(10).text("VAT Precentage %", 50, 790);
      doc.moveDown();
      doc.font("Helvetica");
      doc.fontSize(10).text("VAT No:-", 50, 800);
      doc.moveDown();
      doc.font("Helvetica");
      doc
        .fontSize(10)
        .text("Contact Telephone No:-......................", 300, 790);
      doc.moveDown();
      doc.font("Helvetica");
      doc
        .fontSize(10)
        .text("Email Address, if any:-......................", 300, 800);
      doc.moveDown();
    }

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

// Function to create PDF for "Shipping Method" bidding type

const generateTable1 = require("../controllers/tableGenaration/table1Genaration.js");
const generateTable2 = require("../controllers/tableGenaration/table2Genaration.js");
const generateTable3 = require("../controllers/tableGenaration/table3Genaration.js");
const generateTable4 = require("../controllers/tableGenaration/table4Genaration.js");
const generateTable5 = require("../controllers/tableGenaration/table5Genaration.js");
const generateTable6 = require("../controllers/tableGenaration/table6Genaration.js");
const generateTable8 = require("../controllers/tableGenaration/table8Genaration.js");
const generateTable10 = require("../controllers/tableGenaration/table10Genaration.js");

exports.createNationalShoppingPdf = async (req, res) => {
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

    const pdfFileName = `National_Shopping_${requestData.projectId}.pdf`;
    const pdfDirPath = path.join(
      __dirname,
      "..",
      "projects",
      pdfFileName
    );

    const doc = new PDFDocument({ margin: 30, size: "A4" });
    const outputStream = fs.createWriteStream(pdfDirPath);
    doc.pipe(outputStream);

    // Add front page content
    const logoPath = path.join(__dirname, '..', 'images', 'download.jpg');
    doc.image(logoPath, 260, 100, { width: 80 });
    

    doc.font("Helvetica-Bold");
    doc.fontSize(24).text("Procurement of Goods", 180, 220);
    doc.moveDown();

    doc.font("Helvetica-Bold");
    doc.fontSize(24).text("Under ", 270, 260);
    doc.moveDown();
    doc.font("Helvetica-Bold");
    doc.fontSize(24).text("National Shopping Procedures", 140, 300);
    doc.moveDown();

    doc.font("Helvetica-Bold");
    doc.fontSize(18).text("Invitation of Quotations For", 180, 400);
    doc.moveDown();
    doc.font("Helvetica-Bold");
    doc
      .fontSize(18)
      .text(
        requestData.projectTitle,
      { alignment: "center" }
    );
        doc.moveDown();
    doc.font("Helvetica-Bold");
    doc.fontSize(18).text(`Invitation No:  ${requestData.projectId}`, 130, 480);
    doc.moveDown();
    

    const logoPathUni = path.join(__dirname, '..', 'images', 'unilogoc.jpg');
    doc.image(logoPathUni, 285, 550, { width: 60 });

    doc.font("Helvetica-Bold");
    doc.fontSize(14).text("University of Ruhuna ", 240, 670);
    doc.moveDown();

    doc.font("Helvetica-Bold");
    doc.fontSize(14).text("Faculty of Engineering, ", 230, 700);
    doc.moveDown();
    doc.font("Helvetica-Bold");
    doc.fontSize(14).text("Hapugala , Galle , Sri Lanka.", 220, 730);
    doc.moveDown();

    // Move to the next page
    doc.addPage();

    doc.font("Helvetica-Bold");
    doc.fontSize(18).text("Section I. Instructions to Vendors (ITV)", 180, 70);
    doc.moveDown();

    // Call the table generation function
    generateTable1(doc);
    doc.addPage();
    generateTable2(doc);
    doc.addPage();
 
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
    
      // Additional row without dividing columns
      const additionalRowTop = table2Top + rowHeightMedium;
      drawTableBorder(additionalRowTop, rowHeightShort);
      addText(
        "E: Evaluation and Comparison of Quotation ",
        tableLeft + 180,
        additionalRowTop + 5,
        "Helvetica-Bold",
        12
      );
    
      // Third Table - Clarifications
      const table3Top = additionalRowTop + rowHeightShort;
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
        "(a) Business Registraion",
        tableLeft + columnWidth + 40,
        table5Top + 50,
        "Helvetica",
        12
      );
      addText(
        "(b) the Price as quoted;",
        tableLeft + columnWidth + 40,
        table5Top + 65,
        "Helvetica",
        12
      );
      addText(
        "(c) Price adjustment for correction of arithmetical errors;",
        tableLeft + columnWidth + 40,
        table5Top + 95,
        "Helvetica",
        12
      );
      addText(
        "(d) Price adjustment due to discounts offered.",
        tableLeft + columnWidth + 40,
        table5Top + 125,
        "Helvetica",
        12
      );
      addText(
        `(e) ${requestData.quauotationRequirement }`,
        tableLeft + columnWidth + 40,
        table5Top + 140,
        "Helvetica",
        12
      );
      addText(
        "16.3",
        tableLeft + columnWidth + 4,
        table5Top + 160,
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
    
    doc.addPage();
    generateTable4(doc);
    doc.addPage({ size: [842, 595] }); // Landscape A4 dimensions
    generateTable5(doc);
    doc.addPage({ size: [842, 595] }); // Landscape A4 dimensions
    generateTable6(doc);
    doc.addPage({ size: [842, 595] }); // Landscape A4 dimensions
    generateTable8(doc);
    doc.addPage({ size: [842, 595] }); // Landscape A4 dimensions
    generateTable10(doc);
    doc.end();
    outputStream.on("finish", () => {
      console.log(
        `Shopping Method PDF document ${pdfDirPath} generated successfully.`
      );
      res.download(pdfDirPath);
    });
  } catch (error) {
    console.error("Error generating Shopping Method PDF:", error.message);
    res.status(500).send("Error generating Shopping Method PDF");
  }
};

exports.viewNationalShoppingPdf = (req, res) => {
  try {
    const projectId = req.params.projectId;

   
    const pdfFileName = `National_Shopping_${projectId}.pdf`;
    const pdfDirPath = path.join(
      __dirname,
      "..",
      "projects",
      pdfFileName
    );

    // Set the content type header
    res.setHeader("Content-Type", "application/pdf");

    // Stream the file to the response
    const stream = fs.createReadStream(pdfDirPath);
    stream.pipe(res);
  } catch (error) {
    console.error("Error viewing PDF:", error);
    res.status(500).send("An error occurred while viewing the PDF");
  }
};



// exports.downloadBidPdf = async (req, res) => {
//   const projectId = req.params.projectId;

//   try {
//     // Generate PDF bytes
//     const pdfBytes = await exports.generatePdf(projectId);

//     // Set response headers for PDF download
//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader(
//       "Content-Disposition",
//       `attachment; filename="request_${projectId}.pdf"`
//     );

//     // Send the PDF as a downloadable file
//     res.send(pdfBytes);
//   } catch (error) {
//     if (error.message === "Request not found") {
//       return res.status(404).json({ error: "Request not found" });
//     }
//     console.error("Error downloading PDF:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };



exports.downloadBidPdf = (req, res) => {
  const projectId = req.params.projectId;
  const biddingType = req.params.biddingType; // Get the type from the query parameter

  // Define the possible filenames
  const pdfFileName = `Direct_Purchasing_${projectId}.pdf`;
  const pdfFileName1 = `National_Shopping_${projectId}.pdf`;

  // Determine the file to send based on the type
  let pdfFilePath;
  if (biddingType === 'Direct Purchasing') {
    pdfFilePath = path.join(__dirname, "..", "projects", pdfFileName);
  } else if (biddingType === 'Shopping Method') {
    pdfFilePath = path.join(__dirname, "..", "projects", pdfFileName1);
  } else {
    // Default logic if type is not provided or does not match expected values
    pdfFilePath = path.join(__dirname, "..", "projects", pdfFileName);
  }

  // Check if the file exists
  fs.access(pdfFilePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('File not found');
    }
    res.sendFile(pdfFilePath);
  });
};