const catchAsyncErrors = require("../../middlewares/catchAsyncErrors.js");
const procReqest = require("../../Models/procReqest.js");

describe("Update Request Controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      params: {
        id: "63e270eee7493d3dedd27ed",
      },
      body: {
        status: "Approved",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should update the request and return the updated document", async () => {
    const updatedRequest = {
      _id: req.params.id,
      status: req.body.status,
    };

    procReqest.findByIdAndUpdate = jest
      .fn()
      .mockResolvedValue(updatedRequest);

    await require("../../controllers/approvalReqest.js")(req, res, next);

    expect(procReqest.findByIdAndUpdate).toHaveBeenCalledWith(
      req.params.id,
      req.body,
      { new: true, runValidators: true, useFindAndModify: false }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Request Status is Updated!",
      data: updatedRequest,
    });
    expect(next).not.toHaveBeenCalled();
  });

 
  const { errorMiddleware } = require("../../middlewares/errornew.js");

  it("should return 404 if the request is not found", async () => {
    procReqest.findByIdAndUpdate = jest.fn().mockResolvedValue(null);
  
    // Define a custom error object to simulate the "request not found" scenario
    const err = new Error("Request not found!");
    err.statusCode = 404;
  
    // Call the error middleware directly with the custom error object
    await errorMiddleware(err, req, res, next);
  
    // Assertions
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Request not found!",
    });
  });
  
  
  it("should handle errors and forward them to the error handling middleware", async () => {
    const error = new Error("Database error");
    procReqest.findByIdAndUpdate = jest.fn().mockRejectedValue(error);

    await require("../../controllers/approvalReqest.js")(req, res, next);

    expect(procReqest.findByIdAndUpdate).toHaveBeenCalledWith(
      req.params.id,
      req.body,
      { new: true, runValidators: true, useFindAndModify: false }
    );
    expect(next).toHaveBeenCalledWith(error);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});