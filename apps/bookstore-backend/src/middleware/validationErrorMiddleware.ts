import {NextFunction, Request, Response} from "express";
import {ValidationError} from "../error";

/**
 * Middleware to handle validation errors, usually from input data.
 */
const validationErrorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ValidationError) {
    return res.status(400).json({message: err.message});
  }

  next(err);
};

export {
  validationErrorMiddleware
};

