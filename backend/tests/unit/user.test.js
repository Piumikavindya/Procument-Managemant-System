const request = require('supertest');
const express = require('express');
const {create, previewUser,updateUser,deleterUser ,changePassword, signIn} = require('../../controllers/user');
const User = require('../../Models/user');
const userRouter = require('../../routes/user');
const { generateRandomByte, sendError } = require('../../Utils/helper');

const app = express();
app.use(express.json());
app.use('/user', userRouter);
// Mocking Express Request and Response objects
jest.mock('../../Models/user');
const req ={
  body:{
    username: 'testuser',
    firstname: 'John',
    lastname: 'Doe',
    email: 'test@example.com',
    password: '123456', 
    role: 'admin',
    department: 'DEIE',
    employeeNumber: '12345'
  }
}


  const res = {
  status: jest.fn((x) => x),
  json: jest.fn((x) => x),

}

  
describe('User Veiw function tests', () => {
  it('should return all users', async () => {
    // Mock the behavior of Supplyer.find() to return a predefined list of supplyers
    const mockedUsers = [
     {  username: 'testuser',
     firstname: 'John',
     lastname: 'Doe',
     email: 'test@example.com',
     password: '123456', 
     role: 'admin',
     department: 'DEIE',
     employeeNumber: '12345'},
      
      { username: 'user2', firstname: 'Perera' }
    ];
    User.find.mockResolvedValue(mockedUsers);

    // Send a request to the endpoint
    const response = await request(app).get('/user/view-users');

    // Verify that the response contains the expected list of supplyers
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockedUsers);
  });
});



describe('User PreView function tests', () => {
  it('should return details of a specific User', async () => {
    // Mock the behavior of Supplyer.findById() to return a predefined supplyer
    const mockedUsers = {
      username: 'testuser',
     firstname: 'John',
     lastname: 'Doe',
     email: 'test@example.com',
     password: '123456', // Include the password field
     role: 'admin',
     department: 'DEIE',
     employeeNumber: '12345'
    };
    User.findById.mockResolvedValue(mockedUsers);

    // Mock request and response objects
    const req = { params: { id: 'userId123' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the previewSupplyer function
    await previewUser(req, res);

    // Verify that Supplyer.findById() was called with the correct ID
    expect(User.findById).toHaveBeenCalledWith('userId123');

    // Verify that the response status is 200 and the supplyer details are returned
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockedUsers);
  });


  it('should return 404 if user is not found', async () => {
    
    User.findById.mockResolvedValue(null);

    // Mock request and response objects
    const req = { params: { id: 'nonExistentId' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the previewSupplyer function
    await previewUser(req, res);

    // Verify that Supplyer.findById() was called with the correct ID
    expect(User.findById).toHaveBeenCalledWith('nonExistentId');

    // Verify that the response status is 404 and the appropriate message is returned
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ status: "user not found" });
  });

  it('should handle errors properly', async () => {
    // Mock Supplyer.findById() to throw an error
    User.findById.mockRejectedValue(new Error('Database error'));

    // Mock request and response objects
    const req = { params: { id: 'userId123' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    
    await previewUser(req, res);

    // Verify that Supplyer.findById() was called with the correct ID
    expect(User.findById).toHaveBeenCalledWith('userId123');

    // Verify that the response status is 500 and the appropriate error message is returned
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ status: "Error with getting user", error: "Database error" });
  });


});




describe('User Update function tests', () => {
  it('should update details of a specific User', async () => {
    // Mock the behavior of Supplyer.findByIdAndUpdate() to return the updated supplyer
    const mockedUpdatedUser = {
      _id: 'userId123',
      username: 'Utestuser',
      firstname: 'UJohn',
      lastname: 'UDoe',
      email: 'utest@example.com',
      password: '123456', // Include the password field
      role: 'admin',
      department: 'DEIE',
      employeeNumber: '12345'
    };
    User.findByIdAndUpdate.mockResolvedValue(mockedUpdatedUser);

    // Mock request and response objects
    const req = {
      params: { id: 'userId123' },
      body: {
        username: 'Utestuser',
      firstname: 'UJohn',
      lastname: 'UDoe',
      email: 'utest@example.com',
      password: '123456', // Include the password field
      role: 'admin',
      department: 'DEIE',
      employeeNumber: '12345'
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the updateSupplyer function
    await updateUser(req, res);

    // Verify that Supplyer.findByIdAndUpdate() was called with the correct parameters
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith('userId123', req.body, { new: true });

    // Verify that the response status is 200 and the updated supplyer details are returned
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ status: "User updated", user: mockedUpdatedUser });
  });


  it('should handle errors properly', async () => {
    // Mock Supplyer.findByIdAndUpdate() to throw an error
    User.findByIdAndUpdate.mockRejectedValue(new Error('Database error'));

    // Mock request and response objects
    const req = {
      params: { id: 'userId123' },
      body: {   username: 'Utestuser',
      firstname: 'UJohn',
      lastname: 'UDoe',
      email: 'utest@example.com',
      password: '123456', // Include the password field
      role: 'admin',
      department: 'DEIE',
      employeeNumber: '12345' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the updateSupplyer function
    await updateUser(req, res);

    // Verify that Supplyer.findByIdAndUpdate() was called with the correct parameters
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith('userId123', req.body, { new: true });

    // Verify that the response status is 500 and the appropriate error message is returned
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ status: "Error with updating User", error: "Database error" });
  });

});



describe('User Delete function tests', () => {
  it('should delete a user by ID', async () => {
    // Mock Supplyer.findByIdAndDelete() to return a resolved promise
    User.findByIdAndDelete.mockResolvedValue({});

    // Mock request and response objects
    const req = { params: { id: '663f2c8e7127aae38779fcbe' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Call the deleteUser function
    await deleterUser(req, res);

    
    expect(User.findByIdAndDelete).toHaveBeenCalledWith('663f2c8e7127aae38779fcbe');

  
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ status: 'User deleted' });
  });

  it('should handle errors properly', async () => {
    
    User.findByIdAndDelete.mockRejectedValue(new Error('Database error'));

    // Mock request and response objects
    const req = { params: { id: '663f2c8e7127aae38779fcbe' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Call the deleteUser function
    await deleterUser(req, res);

    // Verify that Supplyer.findByIdAndDelete() was called with the correct ID
    expect(User.findByIdAndDelete).toHaveBeenCalledWith('663f2c8e7127aae38779fcbe');

    // Verify that the response status is 500 and the appropriate error message is returned
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ status: 'Error with delete user', error: 'Database error' });
  });
});


describe('User Sign In function tests', () => {
  it('should return user data for valid credentials when user is not equal to department ', async () => {
    // Mock User.findOne() to return a valid user
    const mockedUser = {
      _id: '663f2c8e7127aae38779fcbe',
      lastname: 'Doe',
      role: 'admin',
      department: null,
      comparePassword: jest.fn().mockResolvedValue(true),
    };
    User.findOne.mockResolvedValue(mockedUser);

    // Mock request and response objects
    const req = { body: { email: 'test@example.com', password: 'password123', role: 'admin' } };
    const res = { json: jest.fn() };

    // Call the signIn function
    await signIn(req, res);

    // Verify that User.findOne() was called with the correct email
    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });

    // Verify that the user's comparePassword() method was called with the correct password
    expect(mockedUser.comparePassword).toHaveBeenCalledWith('password123');

    // Verify that the response contains the expected user data
    expect(res.json).toHaveBeenCalledWith({
      user: { id: '663f2c8e7127aae38779fcbe', lastname: 'Doe', role: 'admin', department: null },
    });
  });

  it('should return user data for valid credentials when user is equal to department', async () => {
    // Mock User.findOne() to return a valid user
    const mockedUser = {
      _id: '663f2c8e7127aae38779fcde',
      lastname: 'Doe',
      role: 'department',
      department: 'DEIE',
      comparePassword: jest.fn().mockResolvedValue(true),
    };
    User.findOne.mockResolvedValue(mockedUser);

    // Mock request and response objects
    const req = { body: { email: 'test1@example.com', password: 'password123', role: 'department' } };
    const res = { json: jest.fn() };

    // Call the signIn function
    await signIn(req, res);

    // Verify that User.findOne() was called with the correct email
    expect(User.findOne).toHaveBeenCalledWith({ email: 'test1@example.com' });

    // Verify that the user's comparePassword() method was called with the correct password
    expect(mockedUser.comparePassword).toHaveBeenCalledWith('password123');

    // Verify that the response contains the expected user data
    expect(res.json).toHaveBeenCalledWith({
      user: { id: '663f2c8e7127aae38779fcde', lastname: 'Doe', role: 'department', department: 'DEIE' },
    });
  });


  it('should return 401 for invalid email or password', async () => {
    // Mock User.findOne() to return null (user not found)
    User.findOne.mockResolvedValue(null);

    // Mock request and response objects
    const req = { body: { email: 'test@example.com', password: 'password123', role: 'admin' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    // Call the signIn function
    await signIn(req, res);

    // Verify that the response status is 401 and the appropriate message is returned
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Invalid email or password' });
  });

  // Add more test cases for different scenarios (e.g., password mismatch, internal server error, etc.)
});


// describe('User Controller Tests', () => {
 
//     it('should create a new user', async () => {
        

//       await create(req, res);

 
//       expect(res.json).toHaveBeenCalledWith({ newUser: req.body });
//     });

//     it('should return 500 status code on error', async () => {
    

//       await create(req, res);

//       expect(res.status).toHaveBeenCalledWith(500);
//       expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
//     });
//   });

  // Add tests for other functions like viewUsers, previewUser, updateUser, deleteUser, changePassword, signIn, etc.;

