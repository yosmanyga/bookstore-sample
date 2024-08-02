import {Prisma} from "@prisma/client";
import prisma from "../../prisma/client";

const createBook = async (
  data: Prisma.BookCreateInput
) => {
  return prisma.book.create({
    data: data,
  });
};

export default createBook;
