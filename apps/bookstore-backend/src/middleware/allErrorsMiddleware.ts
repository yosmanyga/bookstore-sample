import {NextFunction, Request, Response} from "express";

import {validationErrorMiddleware} from './validationErrorMiddleware'
import {notFoundErrorMiddleware} from './notFoundErrorMiddleware'
import {knownErrorMiddleware} from './knownErrorMiddleware'
import {unknownErrorMiddleware} from './unknownErrorMiddleware'

/**
 * Middleware to handle all errors
 */
const allErrorsMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validationErrorMiddleware(err, req, res, () => {
    notFoundErrorMiddleware(err, req, res, () => {
      knownErrorMiddleware(err, req, res, () => {
        unknownErrorMiddleware(err, req, res, () => {
          next(err);
        });
      });
    });
  });
}

export {
  allErrorsMiddleware
};
