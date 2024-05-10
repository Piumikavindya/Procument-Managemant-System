
// const {create} = require('../../controllers/user');
// const User = require('../../Models/user');
// // Mocking Express Request and Response objects
// jest.mock('../../Models/user');
// const req ={
//   body:{
//     username: 'testuser',
//     firstname: 'John',
//     lastname: 'Doe',
//     email: 'test@example.com',
//     password: '123456', // Include the password field
//     role: 'admin',
//     department: 'DEIE',
//     employeeNumber: '12345'
//   }
// }


//   const res = {
//   status: jest.fn((x) => x),
//   json: jest.fn((x) => x),

// }

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
