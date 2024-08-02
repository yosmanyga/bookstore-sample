import {Prisma} from "@prisma/client";
import prisma from "../../prisma/client";
import {NotFoundError} from "../../error";

const getFavorite = async (
  userId: Prisma.FavoriteUserIdBookIdCompoundUniqueInput["userId"],
  bookId: Prisma.FavoriteUserIdBookIdCompoundUniqueInput["bookId"]
) => {
  const favorite = await prisma.favorite.findUnique({
    where: {
      userId_bookId: {
        userId,
        bookId,
      },
    },
  });

  if (!favorite) {
    throw new NotFoundError("Favorite", {userId, bookId});
  }

  return favorite;
}

export default getFavorite;
