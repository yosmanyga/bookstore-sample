import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";

import isUserAdmin from "../service/user/isUserAdmin";

const clientAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await resolveId(req);
  } catch (e) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  next();
}

const adminAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = await resolveId(req);

    const isAdmin = await isUserAdmin(id);

    if (!isAdmin) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }
  } catch (e) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  next();
}

const resolveId = async (req: Request) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new Error("Authorization header not found");
  }

  // Verify token using jsonwebtoken
  const token = authorization.replace('Bearer ', '');
  const secretKey = process.env.AUTH_SECRET;

  if (!secretKey) {
    throw new Error("Secret key not found");
  }

  try {
    const decoded = jwt.verify(token, secretKey);

    return decoded['id'];
  } catch (e) {
    throw new Error("Invalid token");
  }
}

export {
  clientAuthMiddleware,
  adminAuthMiddleware
};
