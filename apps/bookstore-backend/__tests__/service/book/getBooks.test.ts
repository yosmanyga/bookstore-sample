import {prismaMock} from '../../singleton'

import {getBooks} from '../../../src/service/book'

test('should get all books'  , async () => {
  const books = [
    {
      id: 1,
      title: 'Title X',
      author: 'Author X',
      description: 'Description X',
      publication_year: 2024,
      isbn: '123456'
    },
    {
      id: 2,
      title: 'Title Y',
      author: 'Author Y',
      description: 'Description Y',
      publication_year: 2025,
      isbn: '123457'
    }
  ];

  prismaMock.book.findMany.mockResolvedValue(books);

  await expect(getBooks()).resolves.toEqual(books);

  expect(prismaMock.book.findMany).toHaveBeenCalledWith();
});
