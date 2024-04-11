const catchAsyncErrors = (theFunction) => {
    return (req, res, next) => {
      try {
        Promise.resolve(theFunction(req, res, next)).catch(next);
      } catch (error) {
        next(error);
      }
    };
  };
  
  module.exports = catchAsyncErrors;
  