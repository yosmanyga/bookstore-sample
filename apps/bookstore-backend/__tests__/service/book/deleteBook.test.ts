import {prismaMock} from '../../singleton'
import {Book, Prisma} from "@prisma/client";

import {deleteBook} from '../../../src/service/book'

test('should delete book ', async () => {
  const id = 1;

  const data = {
    title: 'Title X',
    author: 'Author X',
    description: 'Description X',
    publication_year: 2024,
    isbn: '123456',
  }

  const book: Book = {
    id,
    ...data
  }

  prismaMock.book.delete.mockResolvedValue(book);

  await expect(deleteBook(id)).resolves.toBeUndefined();

  expect(prismaMock.book.delete).toHaveBeenCalledWith({ where: { id } });
});

test('should throw not found error when book not found', async () => {
  const id = 1;

  prismaMock.book.delete.mockRejectedValueOnce(new Prisma.PrismaClientKnownRequestError('Record to delete does not exist.', {
    code: 'P2025',
    clientVersion: '',
    meta: {},
    batchRequestIdx: 0
  }));

  await expect(deleteBook(id)).rejects.toThrowError('Book with id 1 was not found');
});

test('should throw unknown error when prisma error occurs', async () => {
  const id = 1;

  prismaMock.book.delete.mockRejectedValueOnce(new Prisma.PrismaClientKnownRequestError('', {
    code: 'X',
    clientVersion: '',
    meta: {},
    batchRequestIdx: 0
  }));

  await expect(deleteBook(id)).rejects.toThrowError('Internal Server Error. Our team is working on it.');
});
