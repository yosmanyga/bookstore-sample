import express, {NextFunction, Request, Response} from "express";
import {param} from "express-validator";
import {Prisma} from "@prisma/client";

import {allErrorsMiddleware} from "../middleware/";
import {createBook, deleteBook, getBook, getBooks, searchBooks, updateBook} from "../service/book";
import {ValidationError} from "../error";

const router = express.Router();

router.get(
  "/",
  async (req, res, next) => {
    try {
      const books = await getBooks();

      res.status(200).json(books);
    } catch (error) {
      next(error);
    }
  },
  // Error handling
  allErrorsMiddleware
);

router.get(
  "/search",
  async (req, res, next) => {
    try {
      const {text}: { text: string } = req.query as { text: string };

      const books = await searchBooks(text);

      res.status(200).json(books);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  // Parameter validation
  param('id').toInt(),
  // Logic processing
  async (
    req: Request<Prisma.BookWhereUniqueInput>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {id} = req.params;

      const book = await getBook(id);

      res.status(200).json(book);
    } catch (error) {
      next(error);
    }
  },
  // Error handling
  allErrorsMiddleware
);

router.post(
  "/",
  async (
    req: Request<unknown, unknown, Prisma.BookCreateInput>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data: Prisma.BookCreateInput = req.body;

      const book = await createBook(data);

      res.status(201).json(book);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        next(new ValidationError('Book data is invalid')); // TODO: Improve error message

        return;
      }

      next(error);
    }
  },
  // Error handling
  allErrorsMiddleware
);

router.put(
  "/:id",
  // Parameter validation
  param('id').toInt(),
  // Logic processing
  async (
    req: Request<Prisma.BookWhereUniqueInput>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {id} = req.params;

      const data: Prisma.BookCreateInput = req.body;

      const book = await updateBook(
        id,
        data
      );

      res.status(200).json(book);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        next(new ValidationError('Invalid data')); // TODO: Improve error message

        return;
      }

      next(error);
    }
  },
  // Error handling
  allErrorsMiddleware
);

router.delete(
  "/:id",
  // Parameter validation
  param('id').toInt(),
  // Logic processing
  async (
    req: Request<Prisma.BookWhereUniqueInput>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {id} = req.params;

      await deleteBook(id);

      res.status(200).json(id);
    } catch (error) {
      next(error);
    }
  },
  // Error handling
  allErrorsMiddleware
);

export default router;
