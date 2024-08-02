import {prismaMock} from '../../singleton'
import {Prisma} from "@prisma/client";

import {removeFavorite} from '../../../src/service/favorite'

test('should remove favorite ', async () => {
  const userId = 1;
  const bookId = 1;

  const favorite = {
    userId: userId,
    bookId: bookId,
  }

  prismaMock.favorite.delete.mockResolvedValue(favorite);

  await expect(removeFavorite(userId, bookId)).resolves.toBeUndefined();

  expect(prismaMock.favorite.delete).toHaveBeenCalledWith({
    where: {
      userId_bookId: {
        userId: userId,
        bookId: bookId,
      },
    },
  });
});

test('should throw not found error when favorite not found', async () => {
  const userId = 1;
  const bookId = 1;

  prismaMock.favorite.delete.mockRejectedValueOnce(new Prisma.PrismaClientKnownRequestError('Record to remove does not exist.', {
    code: 'P2025',
    clientVersion: '',
    meta: {},
    batchRequestIdx: 0
  }));

  await expect(removeFavorite(userId, bookId)).rejects.toThrowError(`Favorite with id ${{
    userId,
    bookId
  }} was not found`);
});

test('should throw unknown error when prisma error occurs', async () => {
  const userId = 1;
  const bookId = 1;

  prismaMock.favorite.delete.mockRejectedValueOnce(new Prisma.PrismaClientKnownRequestError('', {
    code: 'X',
    clientVersion: '',
    meta: {},
    batchRequestIdx: 0
  }));

  await expect(removeFavorite(userId, bookId)).rejects.toThrowError('Internal Server Error. Our team is working on it.');
});
