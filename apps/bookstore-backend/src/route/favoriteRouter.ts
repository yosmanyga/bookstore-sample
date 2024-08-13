import express, {NextFunction, Request, Response} from "express";
import {param} from "express-validator";
import {Prisma} from "@prisma/client";

import {allErrorsMiddleware, clientAuthMiddleware} from "../middleware";
import {addFavorite, getFavorite, getFavorites, removeFavorite} from "../service/favorite";

const router = express.Router();

router.get(
  "/user/:user",
  // Authorization handling
  clientAuthMiddleware,
  // Parameter validation
  param('user').toInt(),
  // Logic processing
  async (req, res, next) => {
    try {
      const {user} = req.params;

      const favorites = await getFavorites(user);

      res.status(200).json(favorites);
    } catch (error) {
      next(error);
    }
  },
  // Error handling
  allErrorsMiddleware
);

router.get(
  "/user/:userId/book/:bookId",
  // Authorization handling
  clientAuthMiddleware,
  // Parameter validation
  param('userId').toInt(),
  param('bookId').toInt(),
  // Logic processing
  async (
    req: Request<Prisma.FavoriteUserIdBookIdCompoundUniqueInput>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {userId, bookId} = req.params;

      const favorite = await getFavorite(userId, bookId);

      res.status(200).json(favorite);
    } catch (error) {
      next(error);
    }
  },
  // Error handling
  allErrorsMiddleware
);

router.post(
  "/",
  // Authorization handling
  clientAuthMiddleware,
  // Logic processing
  async (
    req,
    res,
    next
  ) => {
    try {
      const {userId, bookId}: Prisma.FavoriteUserIdBookIdCompoundUniqueInput = req.body;

      const favorite = await addFavorite(
        userId,
        bookId
      );

      res.status(201).json(favorite);
    } catch (error) {
      next(error);
    }
  },
  // Error handling
  allErrorsMiddleware
);

router.delete(
  "/user/:userId/book/:bookId",
  // Authorization handling
  clientAuthMiddleware,
  // Parameter validation
  param('userId').toInt(),
  param('bookId').toInt(),
  // Logic processing
  async (
    req: Request<Prisma.FavoriteUserIdBookIdCompoundUniqueInput>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {userId, bookId} = req.params;

      await removeFavorite(userId, bookId);

      res.status(200).json();
    } catch (error) {
      next(error);
    }
  },
  // Error handling
  allErrorsMiddleware
);

export default router;
