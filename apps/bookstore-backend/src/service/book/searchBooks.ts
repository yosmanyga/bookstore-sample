import prisma from "../../prisma/client";

const searchBooks = async (
  text: string,
) => {
  return prisma.book.findMany({
    where: {
      OR: [
        {
          title: {
            contains: text,
          },
        },
        {
          description: {
            contains: text,
          },
        },
        {
          author: {
            contains: text,
          },
        }
      ],
    },
  });
};

export default searchBooks;
