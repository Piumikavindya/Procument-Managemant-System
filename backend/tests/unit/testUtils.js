// Mocking Express Request and Response objects
const mockRequest = (body, params = {}) => {
    return {
      body,
      params,
    };
  };
  

  
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  
  module.exports = {
    mockRequest,
    mockResponse,
  };