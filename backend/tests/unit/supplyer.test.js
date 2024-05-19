const request = require('supertest');
const express = require('express');
const supplyerRouter = require('../../routes/supplyer');
const app = express();
app.use(express.json());
app.use('/supplyer', supplyerRouter);

const { create,previewSupplyer,updateSupplyer,deleterSupplyer   } = require('../../controllers/supplyer');
const Supplyer = require('../../Models/supplyer');

jest.mock('../../Models/supplyer');

const req = {
  body: {
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
    classOfAssets: 'Class of Assets',
  }
};

const res = {
  json: jest.fn((x) => x),
};

// describe('Supplyer API Tests', () => {
//   it('should create a new supplyer', async () => {
//     // Mock the create function to resolve with the req.body
//     Supplyer.create.mockResolvedValue(req.body);
    
//     // Call the create function with mocked request and response objects
//     await create(req, res);
    
//     // Send a request to the endpoint
//     const response = await request(app).post('/supplyer/create');

//     // Check the status code
//     expect(response.status).toBe(200);

//     // Check the response body
//     expect(response.body).toEqual({ supplyer: req.body });
//   }, 100000);
// });

// 
describe('Supplyer Veiw function tests', () => {
  it('should return all supplyers', async () => {
    // Mock the behavior of Supplyer.find() to return a predefined list of supplyers
    const mockedSupplyers = [
     { username: 'testuser',
        supplierId: 'ggh',
        supplierName: 'Test Supplier',
        email: 'test@example.com',
        address: '123 Test Street',
        contactOfficer: 'John Doe',
        contactNumber: ['1234567890'],
        faxNumber1: '123456789',
        faxNumber2: '987654321',
        typeofBusiness: 'Type of Business',
        classOfAssets: 'Class of Assets',},
      
      { username: 'user2', supplierName: 'Supplier 2' }
    ];
    Supplyer.find.mockResolvedValue(mockedSupplyers);

    // Send a request to the endpoint
    const response = await request(app).get('/supplyer/view-supplyers');

    // Verify that the response contains the expected list of supplyers
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockedSupplyers);
  });
});


describe('Supplyer PreView function tests', () => {
  it('should return details of a specific supplyer', async () => {
    // Mock the behavior of Supplyer.findById() to return a predefined supplyer
    const mockedSupplyer = {
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
      classOfAssets: 'Class of Assets',
    };
    Supplyer.findById.mockResolvedValue(mockedSupplyer);

    // Mock request and response objects
    const req = { params: { id: 'supplyerId123' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the previewSupplyer function
    await previewSupplyer(req, res);

    // Verify that Supplyer.findById() was called with the correct ID
    expect(Supplyer.findById).toHaveBeenCalledWith('supplyerId123');

    // Verify that the response status is 200 and the supplyer details are returned
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockedSupplyer);
  });


  it('should return 404 if supplyer is not found', async () => {
    // Mock Supplyer.findById() to return null, indicating that the supplyer is not found
    Supplyer.findById.mockResolvedValue(null);

    // Mock request and response objects
    const req = { params: { id: 'nonExistentId' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the previewSupplyer function
    await previewSupplyer(req, res);

    // Verify that Supplyer.findById() was called with the correct ID
    expect(Supplyer.findById).toHaveBeenCalledWith('nonExistentId');

    // Verify that the response status is 404 and the appropriate message is returned
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ status: "suppler not found" });
  });

  it('should handle errors properly', async () => {
    // Mock Supplyer.findById() to throw an error
    Supplyer.findById.mockRejectedValue(new Error('Database error'));

    // Mock request and response objects
    const req = { params: { id: 'supplyerId123' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the previewSupplyer function
    await previewSupplyer(req, res);

    // Verify that Supplyer.findById() was called with the correct ID
    expect(Supplyer.findById).toHaveBeenCalledWith('supplyerId123');

    // Verify that the response status is 500 and the appropriate error message is returned
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ status: "Error with getting supplyer", error: "Database error" });
  });

});



describe('Supplyer Update function tests', () => {
  it('should update details of a specific supplyer', async () => {
    // Mock the behavior of Supplyer.findByIdAndUpdate() to return the updated supplyer
    const mockedUpdatedSupplyer = {
      _id: 'supplyerId123',
      username: 'updatedUser',
      supplierName: 'Updated Supplier',
      supplierId: 'updatedId',
      email: 'updated@example.com',
      address: 'Updated Address',
      contactOfficer: 'Updated Officer',
      contactNumber: ['9876543210'],
      faxNumber1: '987654321',
      faxNumber2: '123456789',
      typeofBusiness: 'Updated Business Type',
      classOfAssets: 'Updated Assets Class',
    };
    Supplyer.findByIdAndUpdate.mockResolvedValue(mockedUpdatedSupplyer);

    // Mock request and response objects
    const req = {
      params: { id: 'supplyerId123' },
      body: {
        username: 'updatedUser',
        supplierName: 'Updated Supplier',
        supplierId: 'updatedId',
        email: 'updated@example.com',
        address: 'Updated Address',
        contactOfficer: 'Updated Officer',
        contactNumber: ['9876543210'],
        faxNumber1: '987654321',
        faxNumber2: '123456789',
        typeofBusiness: 'Updated Business Type',
        classOfAssets: 'Updated Assets Class',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the updateSupplyer function
    await updateSupplyer(req, res);

    // Verify that Supplyer.findByIdAndUpdate() was called with the correct parameters
    expect(Supplyer.findByIdAndUpdate).toHaveBeenCalledWith('supplyerId123', req.body, { new: true });

    // Verify that the response status is 200 and the updated supplyer details are returned
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ status: "supplyer updated", supplyer: mockedUpdatedSupplyer });
  });


  it('should handle errors properly', async () => {
    // Mock Supplyer.findByIdAndUpdate() to throw an error
    Supplyer.findByIdAndUpdate.mockRejectedValue(new Error('Database error'));

    // Mock request and response objects
    const req = {
      params: { id: 'supplyerId123' },
      body: { /* Updated supplyer details */ },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the updateSupplyer function
    await updateSupplyer(req, res);

    // Verify that Supplyer.findByIdAndUpdate() was called with the correct parameters
    expect(Supplyer.findByIdAndUpdate).toHaveBeenCalledWith('supplyerId123', req.body, { new: true });

    // Verify that the response status is 500 and the appropriate error message is returned
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ status: "Error with updating User", error: "Database error" });
  });

});



describe('Supplyer Deletion function tests', () => {
  it('should delete a specific supplyer', async () => {
    // Mock the behavior of Supplyer.findByIdAndDelete() to simulate successful deletion
    Supplyer.findByIdAndDelete.mockResolvedValueOnce();

    // Mock request and response objects
    const req = {
      params: { id: 'supplyerId123' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Call the deleterSupplyer function
    await deleterSupplyer(req, res);

    // Verify that Supplyer.findByIdAndDelete() was called with the correct parameter
    expect(Supplyer.findByIdAndDelete).toHaveBeenCalledWith('supplyerId123');

    // Verify that the response status is 200 and the "User deleted" message is sent
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ status: "User deleted" });
  });

  it('should handle errors properly', async () => {
    // Mock Supplyer.findByIdAndDelete() to throw an error
    Supplyer.findByIdAndDelete.mockRejectedValueOnce(new Error('Database error'));

    // Mock request and response objects
    const req = {
      params: { id: 'supplyerId123' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Call the deleterSupplyer function
    await deleterSupplyer(req, res);

    // Verify that Supplyer.findByIdAndDelete() was called with the correct parameter
    expect(Supplyer.findByIdAndDelete).toHaveBeenCalledWith('supplyerId123');

    // Verify that the response status is 500 and the appropriate error message is sent
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ status: "Error with delete user", error: "Database error" });
  });
});

// supplyerController.test.js

// const supplyerController = require('../../controllers/supplyer');

// const { ObjectId } = require('mongoose').Types;
// describe('Supplyer Controller Tests', () => {
//     it('should create a new supplyer', async () => {
//       const req = {
//         body: {
//           username: 'test',
//           supplierId: 'ghgv',
//           supplierName: 'Test Supplier',
//           email: ['test@example.com'],
//           address: '123 Main St',
//           contactOfficer: 'John Doe',
//           contactNumber: ['+1234567890'],
//           faxNumber1: '123-456-7890',
//           faxNumber2: '',
//           typeofBusiness: 'SoleImporter',
//           classOfAssets: 'SoleImporter',
        
//         },
//       };
//       const res = {
//         json: jest.fn(),
//         status: jest.fn().mockReturnThis(),
//       };
  
     
  
//       await supplyerController.create(req, res);
  
     
//       expect(res.json).toHaveBeenCalledWith({ supplyer: req.body });
//       // Add more assertions as needed
  
//       // Clean up the mock after the test
//       mockSave.mockRestore();
//     }, 10000);
//   });