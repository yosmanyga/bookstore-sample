import {Favorite} from "@prisma/client";
import prisma from "../../prisma/client";

const addFavorite = async (
  userId: Favorite["userId"],
  bookId: Favorite["bookId"]
) => {
  return prisma.favorite.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      book: {
        connect: {
          id: bookId,
        }
      }
    }
  });
};

export default addFavorite;
