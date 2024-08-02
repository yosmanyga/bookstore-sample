import express from "express";
import {Prisma} from "@prisma/client";

import {allErrorsMiddleware} from "../middleware/";
import {processLogin, processRegistration} from "../service/auth";

/**
 * This router is responsible for handling authentication and registration
 */

const router = express.Router();

router.post(
  "/login",
  async (req, res, next) => {
    try {
      const {username, password} = req.body;

      const token = await processLogin(username, password);

      if (!token) {
        return res.status(401).json({
          message: "Invalid username or password",
        });
      }

      res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  },
  // Error handling
  allErrorsMiddleware
);

router.post(
  '/registration',
  async (req, res, next) => {
    try {
      const data: Prisma.UserCreateInput = req.body;

      const token = await processRegistration(data);

      res.status(201).json(token);
    } catch (error) {
      next(error);
    }
  },
  // Error handling
  allErrorsMiddleware
)

export default router;
