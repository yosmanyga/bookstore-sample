import {prismaMock} from '../../singleton'

import {getBook} from '../../../src/service/book'

test('should return book', async () => {
  const id = 1;

  const data = {
    title: 'Title X',
    author: 'Author X',
    description: 'Description X',
    publication_year: 2024,
    isbn: '123456'
  }

  const book = {
    id,
    ...data
  }

  prismaMock.book.findUnique.mockResolvedValue(book);

  await expect(getBook(id)).resolves.toEqual(book);

  expect(prismaMock.book.findUnique).toHaveBeenCalledWith({ where: { id } });
});

test('should throw not found error when book not found', async () => {
  const id = 1;

  prismaMock.book.findUnique.mockResolvedValue(null);

  await expect(getBook(id)).rejects.toThrowError('Book with id 1 was not found');
});
