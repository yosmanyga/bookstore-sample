import {Book} from "@prisma/client";
import prisma from "../../prisma/client";
import {NotFoundError} from "../../error";

const getBook = async (
  id: Book["id"]
) => {
  const book = await prisma.book.findUnique({
    where: {
      id: id,
    },
  });

  if (!book) {
    throw new NotFoundError("Book", id);
  }

  return book;
};

export default getBook;
