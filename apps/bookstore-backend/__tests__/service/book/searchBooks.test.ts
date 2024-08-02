import {prismaMock} from '../../singleton'

import {searchBooks} from '../../../src/service/book'

test('should search books'  , async () => {
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

  const text = 'A Title';

  await expect(searchBooks(text)).resolves.toEqual(books);

  expect(prismaMock.book.findMany).toHaveBeenCalledWith({
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
    }
  })
});
