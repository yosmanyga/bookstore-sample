import {Book, Prisma} from "@prisma/client";
import prisma from "../../prisma/client";
import {NotFoundError} from "../../error";

const updateBook = async (
  id: Book["id"],
  data: Prisma.BookCreateInput
) => {
  try {
    return await prisma.book.update({
      where: {
        id: id,
      },
      data: data,
    });
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError
      && e.code === 'P2025'
    ) {
      throw new NotFoundError("Book", id);
    }

    throw e;
  }
};

export default updateBook;
