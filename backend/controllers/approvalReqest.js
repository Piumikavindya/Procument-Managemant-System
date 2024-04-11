const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const ErrorHandler = require("../middlewares/errornew.js");
const procReqest = require('../Models/procReqest');

module.exports = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedRequest = await procReqest.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    if (!updatedRequest) {
      return next(new ErrorHandler("Request not found!", 404));
    }

    res.status(200).json({
      success: true,
      message: "Request Status is Updated!",
      data: updatedRequest, // Optionally, you can send the updated document back to the client
    });
  } catch (error) {
    // Forwarding error to error handling middleware
    return next(error);
  }
});
















