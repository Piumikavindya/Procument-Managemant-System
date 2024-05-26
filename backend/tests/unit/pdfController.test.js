const fs = require("fs");
const pdf = require("html-pdf");
const { createPdf } = require("../../controllers/pdfController");

jest.mock("fs");
jest.mock("html-pdf");

describe("createPdf function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should generate and save PDF to MongoDB", async () => {
    const req = {
      body: { requestId: "REQ001" },
    };
    const res = {
      send: jest.fn(),
      status: jest.fn(() => res),
    };

    const pdfData = "mocked PDF data";
    const pdfFileName = "mocked_Purchase_Requisition_REQ001.pdf"; // Corrected file name format
    const pdfFilePath = "../../download/mock_Purchase_Requisition_REQ001.pdf";

    // Mock fs.readFileSync
    fs.readFileSync.mockReturnValue(pdfData);

    // Mock pdf.create().toFile() callback
    pdf.create.mockImplementation((_, __, callback) => {
      callback(null);
      return { toFile: jest.fn() };
    });

    // Mock MongoDB savePdfToMongoDB function
    const savePdfToMongoDB = jest.fn();

    // Inject the mock function into the module
    const module = require("../../Models/pdfDetails");
    module.savePdfToMongoDB = savePdfToMongoDB;

    // Call the function under test
    await createPdf(req, res);

    // Check if the PDF is saved to MongoDB and response is sent
    expect(savePdfToMongoDB).toHaveBeenCalledWith(pdfData, pdfFileName);
    expect(res.send).toHaveBeenCalledWith("PDF generated, stored in MongoDB, and uploaded successfully");
  });

  it("should handle PDF generation error", async () => {
    const req = {
      body: { requestId: "REQ001" },
    };
    const res = {
      send: jest.fn(),
      status: jest.fn(() => res),
    };

    // Mock pdf.create().toFile() to simulate an error
    pdf.create.mockImplementation((_, __, callback) => {
      callback(new Error("PDF generation error"));
      return { toFile: jest.fn() };
    });

    // Call the function under test
    await createPdf(req, res);

    // Check if the error response is sent
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("An error occurred while generating PDF");
  });

  it("should handle general error", async () => {
    const req = {
      body: { requestId: "REQ001" },
    };
    const res = {
      send: jest.fn(),
      status: jest.fn(() => res),
    };

    // Mock fs.readFileSync to simulate a general error
    fs.readFileSync.mockImplementation(() => {
      throw new Error("General error");
    });

    // Call the function under test
    await createPdf(req, res);

    // Check if the error response is sent
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("An error occurred while generating PDF");
  });
});
