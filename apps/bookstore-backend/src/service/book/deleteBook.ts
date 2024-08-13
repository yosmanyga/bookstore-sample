import {Book, Prisma} from "@prisma/client";
import prisma from "../../prisma/client";

import {NotFoundError} from "../../error";

const deleteBook = async (
  id: Book["id"]
): Promise<void> => {
  try {
    await prisma.book.delete({
      where: {
        id: id,
      },
    });
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError
      && e.code === "P2025"
    ) {
      throw new NotFoundError("Book", id);
    }

    throw e;
  }
};

export default deleteBook;
