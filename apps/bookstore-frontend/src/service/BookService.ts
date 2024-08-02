import axios from "./axios";

import {BookDataType, BookIdType, BookType} from "../type";

const getBooks = async (): Promise<BookType[]> => {
  const response = await axios.get('/books');

  return response.data;
}

const getBook = async (
  id: BookIdType
): Promise<BookType> => {
  const response = await axios.get(`/books/${id}`);

  return response.data;
}

const addBook = async (
  data: BookDataType
): Promise<BookType> => {
  const response = await axios.post('/books', data);

  return response.data;
}

const updateBook = async (
  id: BookIdType,
  data: BookDataType
): Promise<BookType> => {
  const response = await axios.put(`/books/${id}`, data);

  return response.data;
}

const deleteBook = async (
  id: BookIdType
): Promise<BookIdType> => {
  const response = await axios.delete(`/books/${id}`);

  return response.data;
}

const searchBooks = async (
  text: string
): Promise<BookType[]> => {
  const response = await axios.get(`/books/search?text=${text}`);

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
