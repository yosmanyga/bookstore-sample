import {prismaMock} from '../../singleton'

import {updateBook} from '../../../src/service/book'
import {Prisma} from "@prisma/client";

test('should update book ', async () => {
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

  prismaMock.book.update.mockResolvedValue(book);

  await expect(updateBook(id, data)).resolves.toEqual(book);
});

test('should throw not found error when book not found', async () => {
  const id = 1;

  const data = {
    title: 'Title X',
    author: 'Author X',
    description: 'Description X',
    publication_year: 2024,
    isbn: '123456'
  };

  prismaMock.book.update.mockRejectedValueOnce(new Prisma.PrismaClientKnownRequestError('Record to delete does not exist.', {
    code: 'P2025',
    clientVersion: '',
    meta: {},
    batchRequestIdx: 0
  }));

  await expect(updateBook(id, data)).rejects.toThrowError('Book with id 1 was not found');
});

test('should throw unknown error when prisma error occurs', async () => {
  const id = 1;

  const data = {
    title: 'Title X',
    author: 'Author X',
    description: 'Description X',
    publication_year: 2024,
    isbn: '123456'
  };

  prismaMock.book.update.mockRejectedValueOnce(new Prisma.PrismaClientKnownRequestError('', {
    code: 'X',
    clientVersion: '',
    meta: {},
    batchRequestIdx: 0
  }));

  await expect(updateBook(id, data)).rejects.toThrowError('Internal Server Error. Our team is working on it.');
});
