import {prismaMock} from '../../singleton'

import {createBook} from '../../../src/service/book'

test('should create book ', async () => {
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

  prismaMock.book.create.mockResolvedValue(book);

  await expect(createBook(data)).resolves.toEqual(book);
})
