const { generateRequestId, viewAllRequests,viewRequestById,deleteRequest ,addProcItem   } = require('../../controllers/procReqest'); 
const express = require('express');
const request = require('supertest');
const procReqest = require('../../Models/procReqest'); 
const procReqestRouter = require('../../routes/procReqest');
const app = express();
app.use(express.json());
app.use('/procReqest', procReqestRouter);
// Mock the ProcRequest model method
jest.mock('../../Models/procReqest');

describe('Request ID Generation function tests', () => {
    it('should generate a new request ID and save it to the database', async () => {
      // Mock the behavior of ProcRequest.findOne() to return the latest request
      const latestRequest = { requestId: 'REQ001' };
      procReqest.findOne.mockResolvedValueOnce(latestRequest);
  
      // Mock the behavior of ProcRequest.save() to save the new request instance
      const savedRequest = { requestId: 'REQ002' };
      procReqest.prototype.save.mockResolvedValueOnce(savedRequest);
  
      // Call the generateRequestId function
      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      await generateRequestId(req, res);
  
      // Verify that ProcRequest.findOne() was called
      expect(procReqest.findOne).toHaveBeenCalled();
  
      // Verify that ProcRequest.save() was called with the correct data
      expect(procReqest.prototype.save).toHaveBeenCalledWith();
  
      // Verify that the response contains the generated request ID
      expect(res.json).toHaveBeenCalledWith({ requestId: 'REQ002', savedRequest });
    });


  it('should handle errors properly', async () => {
    // Mock ProcRequest.findOne() to throw an error
    procReqest.findOne.mockRejectedValueOnce(new Error('Database error'));

    // Mock request and response objects
    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    // Call the generateRequestId function
    await generateRequestId(req, res);

    // Verify that ProcRequest.findOne() was called
    expect(procReqest.findOne).toHaveBeenCalled();

    // Verify that the response status is 500 and the appropriate error message is sent
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
  });
});



describe('View All Requests function tests', () => {
    it('should fetch all requests from the database and send them as a response', async () => {
      // Mock the behavior of procReqest.find() to return a predefined list of requests
      const mockedRequests = [
        { requestId: 'REQ001', /* other properties */ },
        { requestId: 'REQ002', /* other properties */ },
        // Add more mocked requests as needed
      ];
      procReqest.find.mockResolvedValueOnce(mockedRequests);
  
      // Mock request and response objects
      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
  
      // Call the viewAllRequests function
      await viewAllRequests(req, res);
  
      // Verify that procReqest.find() was called
      expect(procReqest.find).toHaveBeenCalled();
  
      // Verify that the response contains the list of requests
      expect(res.json).toHaveBeenCalledWith(mockedRequests);
    });
  
    it('should handle errors properly', async () => {
      // Mock procReqest.find() to throw an error
      const errorMessage = 'Database error';
      procReqest.find.mockRejectedValueOnce(new Error(errorMessage));
  
      // Mock request and response objects
      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
  
      // Call the viewAllRequests function
      await viewAllRequests(req, res);
  
      // Verify that procReqest.find() was called
      expect(procReqest.find).toHaveBeenCalled();
  
      // Verify that the response status is 500 and the appropriate error message is sent
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });



  describe('View Request By ID function tests', () => {
   
    it('should fetch a request by ID from the database and send it as a response', async () => {
      // Mock the behavior of procReqest.findOne() to return a predefined request
      const mockedRequest = {
        requestId: 'REQ001',
        // other properties
      };
      procReqest.findOne.mockResolvedValueOnce(mockedRequest);
  
      // Mock request and response objects
      const req = {
        params: { requestId: 'REQ001' }, // Valid request ID
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
  
      // Call the viewRequestById function
      await viewRequestById(req, res);
  
      // Verify that procReqest.findOne() was called with the correct request ID
      expect(procReqest.findOne).toHaveBeenCalledWith({ requestId: 'REQ001' });
  
      // Verify that the response contains the expected request
      expect(res.json).toHaveBeenCalledWith(mockedRequest);
    });
  
    it('should handle request not found scenario properly', async () => {
      // Mock procReqest.findOne() to return null, indicating request not found
      procReqest.findOne.mockResolvedValueOnce(null);
  
      // Mock request and response objects
      const req = {
        params: { requestId: 'REQ002' }, // Non-existent request ID
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
  
      // Call the viewRequestById function
      await viewRequestById(req, res);
  
      // Verify that procReqest.findOne() was called with the correct request ID
      expect(procReqest.findOne).toHaveBeenCalledWith({ requestId: 'REQ002' });
  
      // Verify that the response status is 404 and the appropriate error message is sent
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Request not found" });
    });
  
    it('should handle errors properly', async () => {
      // Mock procReqest.findOne() to throw an error
      const errorMessage = 'Database error';
      procReqest.findOne.mockRejectedValueOnce(new Error(errorMessage));
  
      // Mock request and response objects
      const req = {
        params: { requestId: 'REQ003' }, // Valid request ID
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
  
      // Call the viewRequestById function
      await viewRequestById(req, res);
  
      // Verify that procReqest.findOne() was called with the correct request ID
      expect(procReqest.findOne).toHaveBeenCalledWith({ requestId: 'REQ003' });
  
      // Verify that the response status is 500 and the appropriate error message is sent
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
  });



  describe('Delete Request function tests', () => {

    it('should delete a request from the database and send a success response', async () => {
      // Mock procReqest.findByIdAndDelete() to simulate successful deletion
      procReqest.findByIdAndDelete.mockResolvedValueOnce();
  
      // Mock request and response objects
      const req = {
        params: { id: 'REQ001' }, // Valid request ID
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
  
      // Call the deleteRequest function
      await deleteRequest(req, res);
  
      // Verify that procReqest.findByIdAndDelete() was called with the correct request ID
      expect(procReqest.findByIdAndDelete).toHaveBeenCalledWith('REQ001');
  
      // Verify that the response status is 200 and the success message is sent
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ status: "Request is deleted" });
    });
  
    it('should handle errors properly', async () => {
      // Mock procReqest.findByIdAndDelete() to throw an error
      const errorMessage = 'Database error';
      procReqest.findByIdAndDelete.mockRejectedValueOnce(new Error(errorMessage));
  
      // Mock request and response objects
      const req = {
        params: { id: 'REQ002' }, // Valid request ID
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
  
      // Call the deleteRequest function
      await deleteRequest(req, res);
  
      // Verify that procReqest.findByIdAndDelete() was called with the correct request ID
      expect(procReqest.findByIdAndDelete).toHaveBeenCalledWith('REQ002');
  
      // Verify that the response status is 500 and the appropriate error message is sent
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ status: "Error with delete request" });
    });
  });



  describe('Add Procurement Item function tests', () => {
    it('should add a procurement item to the request and send a success response', async () => {
      // Mock procReqest.findOneAndUpdate() to simulate successful update
      const updatedRequest = { /* mock updated request */ };
      procReqest.findOneAndUpdate.mockResolvedValueOnce(updatedRequest);
  
      // Mock request and response objects
      const req = {
        params: { requestId: 'REQ001' },
        body: {
          itemName: 'Item 1',
          cost: 100,
          qtyRequired: 5,
          qtyAvailable: 10,
        },
      };
      const res = {
        json: jest.fn(),
      };
  
      // Call the addProcItem function
      await addProcItem(req, res);
  
      // Verify that procReqest.findOneAndUpdate() was called with the correct parameters
      expect(procReqest.findOneAndUpdate).toHaveBeenCalledWith(
        { requestId: 'REQ001' },
        {
          $push: {
            items: {
              itemName: 'Item 1',
              cost: 100,
              qtyRequired: 5,
              qtyAvailable: 10,
            },
          },
        },
        { new: true }
      );
  
      // Verify that the response contains the success message and the updated request
      expect(res.json).toHaveBeenCalledWith({ message: 'Item added successfully', updatedRequest });
    });
  
    it('should handle errors properly', async () => {
      // Mock procReqest.findOneAndUpdate() to throw an error
      const errorMessage = 'Database error';
      procReqest.findOneAndUpdate.mockRejectedValueOnce(new Error(errorMessage));
  
      // Mock request and response objects
      const req = {
        params: { requestId: 'REQ002' },
        body: {
          itemName: 'Item 2',
          cost: 200,
          qtyRequired: 3,
          qtyAvailable: 8,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Call the addProcItem function
      await addProcItem(req, res);
  
      // Verify that procReqest.findOneAndUpdate() was called with the correct parameters
      expect(procReqest.findOneAndUpdate).toHaveBeenCalledWith(
        { requestId: 'REQ002' },
        {
          $push: {
            items: {
              itemName: 'Item 2',
              cost: 200,
              qtyRequired: 3,
              qtyAvailable: 8,
            },
          },
        },
        { new: true }
      );
  
      // Verify that the response status is 500 and the appropriate error message is sent
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });