import prisma from "../../prisma/client";

const getBooks = async () => {
  return prisma.book.findMany({
    orderBy: {
      id: "desc",
    },
  });
};

export default getBooks;
