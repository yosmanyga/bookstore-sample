import axios from "./axios";

import {BookDataType, BookIdType, BookType} from "../type";

const getBooks = async (): Promise<BookType[]> => {
  const response = await axios
    .get<BookType[]>('/books');

  return response.data;
}

const getBook = async (
  id: BookIdType
): Promise<BookType> => {
  const response = await axios
    .get<BookType>(`/books/${id}`);

  return response.data;
}

const addBook = async (
  data: BookDataType
): Promise<BookType> => {
  const response = await axios
    .withAuthentication()
    .post<BookType>('/books', data);

  return response.data;
}

const updateBook = async (
  id: BookIdType,
  data: BookDataType
): Promise<BookType> => {
  const response = await axios
    .withAuthentication()
    .put<BookType>(`/books/${id}`, data);

  return response.data;
}

const deleteBook = async (
  id: BookIdType
): Promise<BookIdType> => {
  const response = await axios
    .withAuthentication()
    .delete<BookIdType>(`/books/${id}`);

  return response.data;
}

const searchBooks = async (
  text: string
): Promise<BookType[]> => {
  const response = await axios
    .get<BookType[]>(`/books/search?text=${text}`);

  return response.data;
}

export {
  getBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook,
  searchBooks
};
