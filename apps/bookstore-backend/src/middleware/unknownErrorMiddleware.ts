import {NextFunction, Request, Response} from "express";

/**
 * Middleware to handle unknown errors
 */
const unknownErrorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    // TODO: Report error using Sentry

    console.error('---------------------- UnknownError: ', err);

    return res.status(500).json({message: 'Internal Server Error. Our team is working on it.'});
  }

  next(err);
};

export {
  unknownErrorMiddleware
};
