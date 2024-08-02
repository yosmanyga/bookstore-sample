import {NextFunction, Request, Response} from "express";
import {KnownError} from "../error";

/**
 * Middleware to handle any other known errors without specific error handling
 */
const knownErrorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof KnownError) {
    return res.status(500).json({message: err.message});
  }

  next(err);
};

export {
  knownErrorMiddleware
};
