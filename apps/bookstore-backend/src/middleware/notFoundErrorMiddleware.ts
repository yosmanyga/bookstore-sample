import {NextFunction, Request, Response} from "express";
import {NotFoundError} from "../error";

/**
 * Middleware to handle not found errors, usually from database queries.
 */
const notFoundErrorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof NotFoundError) {
    return res.status(404).json({message: err.message});
  }

  next(err);
};

export {
  notFoundErrorMiddleware
};
