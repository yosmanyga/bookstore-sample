import {prismaMock} from '../../singleton'

import {getFavorites} from '../../../src/service/favorite'

test('should get all favorites'  , async () => {
  const userId = 1;

  const favorites = [
    {
      userId: userId,
      bookId: 2,
    },
    {
      userId: userId,
      bookId: 3,
    }
  ];

  prismaMock.favorite.findMany.mockResolvedValue(favorites);

  await expect(getFavorites(userId)).resolves.toEqual(favorites);

  expect(prismaMock.favorite.findMany).toHaveBeenCalledWith({
    where: {
      userId: userId,
    },
    include: {
      book: true,
    }
  });
});
