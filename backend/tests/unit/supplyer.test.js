// supplyer.test.js

const request = require('supertest');
const express = require('express');
const supplyerRouter = require('../../routes/supplyer');
const app = express();
app.use(express.json());
app.use('/supplyer', supplyerRouter);

describe('Supplyer API Tests', () => {
  it('should create a new supplyer', async () => {
    const response = await request(app)
      .post('/supplyer/create')
      .send({
        username: 'testuser',
        supplierId: 'ggh',
        supplierName: 'Test Supplier',
        email: 'test@example.com',
        address: '123 Test Street',
        contactOfficer: 'John Doe',
        contactNumber: ['1234567890'],
        faxNumber1: '123456789',
        faxNumber2: '987654321',
        typeofBusiness: 'Type of Business',
        classOfAssets: 'Class of Assets'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('supplyer');
    // Add more assertions as needed
  },100000);
});

// supplyerController.test.js

const supplyerController = require('../../controllers/supplyer');
const Supplyer = require('../../Models/supplyer');
const { ObjectId } = require('mongoose').Types;
describe('Supplyer Controller Tests', () => {
    it('should create a new supplyer', async () => {
      const req = {
        body: {
          username: 'test',
          supplierId: 'ghgv',
          supplierName: 'Test Supplier',
          email: ['test@example.com'],
          address: '123 Main St',
          contactOfficer: 'John Doe',
          contactNumber: ['+1234567890'],
          faxNumber1: '123-456-7890',
          faxNumber2: '',
          typeofBusiness: 'SoleImporter',
          classOfAssets: 'SoleImporter',
          _id: expect.any(ObjectId), // Adjust expectation for _id
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
  
      // Mock the Supplyer save method
      const mockSave = jest.spyOn(Supplyer.prototype, 'save').mockResolvedValue({
        _id: '663b21d81892f335cc3c6bd2', // Mocked ObjectId value
        ...req.body, // Include other properties from req.body
      });
  
      await supplyerController.create(req, res);
  
      expect(mockSave).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ supplyer: req.body });
      // Add more assertions as needed
  
      // Clean up the mock after the test
      mockSave.mockRestore();
    }, 10000);
  });