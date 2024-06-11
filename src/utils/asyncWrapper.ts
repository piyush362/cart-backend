import type { Request, Response, RequestHandler, NextFunction } from "express";

// catchAsync is a wrapper function that catches any errors that occur in the async function and passes them to the next middleware function.
// it work as a try catch block for async functions
// it takes a function as an argument and returns a new function that takes three arguments: req, res, and next.

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

export default catchAsync;

/* 
  const asyncHandler = (fn: RequestHandler) => {
    async (req: Request, res: Response, next: NextFunction) => {
      try {
      } catch (error) {
        res.status(error.code || 500).json({
          success: false,
          message: error.message,
        });
      }
    };
  };
  export default asyncHandler;
*/
