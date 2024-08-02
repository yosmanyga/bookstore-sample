import {prismaMock} from '../../singleton'

import {addFavorite} from '../../../src/service/favorite'

test('should add favorite', async () => {
  const userId = 1;
  const bookId = 1;

  prismaMock.favorite.create.mockResolvedValue({
    userId: userId,
    bookId: bookId
  })

  await expect(addFavorite(userId, bookId)).resolves.toEqual({
    userId: userId,
    bookId: bookId
  });

  expect(prismaMock.favorite.create).toBeCalledWith({
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
  })
});
