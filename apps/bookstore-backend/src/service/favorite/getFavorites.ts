import {Prisma} from "@prisma/client";
import prisma from "../../prisma/client";

const getFavorites = async (
  userId: Prisma.FavoriteUserIdBookIdCompoundUniqueInput["userId"],
) => {
  return prisma.favorite.findMany({
    where: {
      userId: userId,
    },
    include: {
      book: true,
    }
  });
};

export default getFavorites;
