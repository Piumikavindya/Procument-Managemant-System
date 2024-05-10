const User = require('../../Models/user');
const userController = require('../../controllers/user');

// Mocking Express Request and Response objects
const mockRequest = (body) => {
  return {
    body,
  };
};

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('User Controller Tests', () => {
  let req, res;

  beforeEach(() => {
    // Creating new request and response objects for each test
    req = mockRequest();
    res = mockResponse();
  });

  describe('create', () => {
    it('should create a new user', async () => {
        req.body = { 
            username: 'testuser',
            firstname: 'John',
            lastname: 'Doe',
            email: 'test@example.com',
            password: '123456', // Include the password field
            role: 'admin',
            department: 'DEIE',
            employeeNumber: '12345'
          };

      await userController.create(req, res);

 
      expect(res.json).toHaveBeenCalledWith({ newUser: expect.any(Object) });
    });

    it('should return 500 status code on error', async () => {
      req.body = { /* Invalid user data */ };

      await userController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });

  // Add tests for other functions like viewUsers, previewUser, updateUser, deleteUser, changePassword, signIn, etc.
});