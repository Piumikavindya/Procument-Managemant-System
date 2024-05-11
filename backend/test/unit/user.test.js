const request = require('supertest');
const express = require('express');
const {create, previewUser,updateUser,deleterUser } = require('../../controllers/user');
const User = require('../../Models/user');
const userRouter = require('../../routes/user');
const PasswordResetToken = require("../../Models/PasswordResetToken");
const { changePassword, signIn } = require('../../controllers/user'); // Import changePassword function
const { generateRandomByte, sendError } = require('../../Utils/helper');

const app = express();
app.use(express.json());
app.use('/user', userRouter);
// Mocking Express Request and Response objects
jest.mock('../../Models/user');
// Mock User and PasswordResetToken models
jest.mock("../../Models/PasswordResetToken");
const req ={
  body:{
    username: 'testuser',
    firstname: 'John',
    lastname: 'Doe',
    email: 'test@example.com',
    password: '123456', // Include the password field
    role: 'admin',
    department: 'DEIE',
    employeeNumber: '12345'
  }
}


  const res = {
  status: jest.fn((x) => x),
  json: jest.fn((x) => x),

}


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

    // Verify that Supplyer.findByIdAndDelete() was called with the correct ID
    expect(User.findByIdAndDelete).toHaveBeenCalledWith('663f2c8e7127aae38779fcbe');

    // Verify that the response status is 200 and the appropriate message is returned
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ status: 'User deleted' });
  });

  it('should handle errors properly', async () => {
    // Mock Supplyer.findByIdAndDelete() to throw an error
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

/* describe('User Change Password function tests', () => {
  it('should send a reset password link to the user', async () => {
    // Mock User.findOne() and PasswordResetToken.findOne() to return valid data
    const mockedUser = { _id: '663f2c8e7127aae38779fcbe', email: 'test@example.com' };
    User.findOne.mockResolvedValue(mockedUser);
    PasswordResetToken.findOne.mockResolvedValue(null);

    // Mock generateRandomByte() to return a token
    const mockedToken = 'randomToken';
   jest.mock('../../Utils/helper', () => ({
  generateRandomByte: jest.fn().mockResolvedValue(mockedToken),
  sendError: jest.fn(),
}));


    // Mock request and response objects
    const req = { body: { email: 'test@example.com' } };
    const res = { json: jest.fn() };

    // Mock generateMailTransporter() and transport.sendMail() functions
    const mockedTransport = { sendMail: jest.fn() };
    jest.mock('../../Utils/mail', () => ({
      generateMailTransporter: jest.fn().mockReturnValue(mockedTransport),
    }));

    // Call the changePassword function
    await changePassword(req, res);

    // Verify that User.findOne() and PasswordResetToken.findOne() were called with the correct parameters
    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(PasswordResetToken.findOne).toHaveBeenCalledWith({ owner: '663f2c8e7127aae38779fcbe' });

    // Verify that generateRandomByte() was called
    expect(generateRandomByte).toHaveBeenCalled();

    // Verify that a new PasswordResetToken was created and saved
    expect(PasswordResetToken).toHaveBeenCalledWith({ owner: '663f2c8e7127aae38779fcbe', token: mockedToken });
    expect(mockedTransport.sendMail).toHaveBeenCalledWith({
      from: 'security@procurementapp.com',
      to: 'test@example.com',
      subject: 'Reset Password Link',
      html: expect.stringContaining(`token=${mockedToken}&id=663f2c8e7127aae38779fcbe`),
    });

    // Verify that the response contains the appropriate message
    expect(res.json).toHaveBeenCalledWith({ message: 'Link sent to your email' });
  });

  // Add more test cases for different scenarios (e.g., user not found, token already exists, etc.)
}); */

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


