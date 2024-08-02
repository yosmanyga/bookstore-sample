import {prismaMock} from '../../singleton'

import {getFavorite} from '../../../src/service/favorite'

test('should return favorite', async () => {
  const userId = 1;
  const bookId = 2;

  const favorite = {
    userId: userId,
    bookId: bookId,
  };

  prismaMock.favorite.findUnique.mockResolvedValue(favorite);

  await expect(getFavorite(1, 2)).resolves.toEqual(favorite);

  expect(prismaMock.favorite.findUnique).toHaveBeenCalledWith({
    where: {
      userId_bookId: {
        userId,
        bookId,
      },
    }
  });
});

test('should throw not found error when favorite not found', async () => {
  const userId = 1;
  const bookId = 2;

  prismaMock.favorite.findUnique.mockResolvedValue(null);

  await expect(getFavorite(userId, bookId)).rejects.toThrowError(`Favorite with id ${{userId, bookId}} was not found`);
});
