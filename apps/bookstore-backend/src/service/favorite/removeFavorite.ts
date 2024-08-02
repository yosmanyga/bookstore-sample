import {Prisma} from "@prisma/client";
import prisma from "../../prisma/client";
import {NotFoundError} from "../../error";

const removeFavorite = async (
  userId: Prisma.FavoriteUserIdBookIdCompoundUniqueInput["userId"],
  bookId: Prisma.FavoriteUserIdBookIdCompoundUniqueInput["bookId"]
): Promise<void> => {
  try {
    await prisma.favorite.delete({
      where: {
        userId_bookId: {
          userId: userId,
          bookId: bookId,
        },
      },
    });
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError
      && e.code === "P2025"
    ) {
      throw new NotFoundError("Favorite", {userId, bookId});
    }

    throw e;
  }
};

export default removeFavorite;
