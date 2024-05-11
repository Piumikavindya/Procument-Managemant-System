const fs = require('fs');
const path = require('path');
const { createPdf, savePdfToMongoDB  } = require('../../controllers/pdfController');
const pdfTemplate = require('../../documents/document');
const pdfController = require('../../controllers/pdfController');
const PdfModel = require('../../Models/pdfDetails');
jest.mock('../../Models/pdfDetails');
jest.mock('html-pdf', () => ({
  create: jest.fn(),
}));

jest.mock('fs', () => ({
  readFileSync: jest.fn(),
}));

describe('createPdf function tests', () => {
  it('should generate and save the PDF successfully', async () => {
    // Mock request object
    const req = {
      body: {
        requestId: 'REQ001',
        // Add any other necessary data for the pdfTemplate function
      },
    };

    // Mock response object
    const res = {
      send: jest.fn(), // Mock the send function
      status: jest.fn(() => res), // Mock the status function to return the response object itself
    };

    // Mock html-pdf create method
    const createMock = jest.fn();
    createMock.toFile = jest.fn((pdfFilePath, callback) => {
      // Simulate successful PDF creation
      callback(null);
    });
    require('html-pdf').create.mockReturnValue(createMock);

    // Mock fs.readFileSync to return a dummy PDF file content
    fs.readFileSync.mockReturnValueOnce('Dummy PDF content');

    // Call the createPdf function
    await createPdf(req, res);

    // Assert that the HTML-pdf create method was called with the correct arguments
    expect(require('html-pdf').create).toHaveBeenCalledWith(expect.any(Function), { format: 'A4' });

    // Assert that fs.readFileSync was called with the correct file path
    expect(fs.readFileSync).toHaveBeenCalledWith(expect.stringContaining('Purchase_Requisition_REQ001.pdf'));

    // Assert that the response was sent with the success message
    expect(res.send).toHaveBeenCalledWith('PDF generated, stored in MongoDB, and uploaded successfully');
  });
});



describe('savePdfToMongoDB function tests', () => {
    it('should save PDF data to MongoDB successfully', async () => {
      // Mock PdfModel's save method to resolve successfully
      PdfModel.mockImplementationOnce(() => ({
        save: jest.fn().mockResolvedValueOnce(),
      }));
  
      // Dummy PDF data and filename
      const pdfData = 'Dummy PDF data';
      const filename = 'test.pdf';
  
      // Call savePdfToMongoDB function
      await expect(savePdfToMongoDB(pdfData, filename)).resolves.not.toThrow();
  
      // Expect PdfModel's constructor to have been called with the correct arguments
      expect(PdfModel).toHaveBeenCalledWith({
        filename: filename,
        data: pdfData,
      });
  
      // Expect PdfModel's save method to have been called
      expect(PdfModel().save).toHaveBeenCalled();
  
      // Expect success message to be logged
      expect(console.log).toHaveBeenCalledWith('PDF saved successfully in MongoDB');
    });
  
    it('should throw an error if there is an error while saving to MongoDB', async () => {
      // Mock PdfModel's save method to reject with an error
      const errorMessage = 'MongoDB save error';
      PdfModel.mockImplementationOnce(() => ({
        save: jest.fn().mockRejectedValueOnce(new Error(errorMessage)),
      }));
  
      // Dummy PDF data and filename
      const pdfData = 'Dummy PDF data';
      const filename = 'test.pdf';
  
      // Call savePdfToMongoDB function and expect it to throw an error
      await expect(savePdfToMongoDB(pdfData, filename)).rejects.toThrowError(
        "An error occurred while storing the PDF in MongoDB"
      );
  
      // Expect PdfModel's constructor to have been called with the correct arguments
      expect(PdfModel).toHaveBeenCalledWith({
        filename: filename,
        data: pdfData,
      });
  
      // Expect PdfModel's save method to have been called
      expect(PdfModel().save).toHaveBeenCalled();
  
      // Expect error message to be logged
      expect(console.error).toHaveBeenCalledWith('Error saving PDF to MongoDB:', expect.any(Error));
    });
  });