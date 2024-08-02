type BookIdType = number;

type BookDataType = {
  title: string,
  author: string,
  publication_year: number,
  description: string,
  isbn: string
}

type BookType = {
  id: BookIdType
} & BookDataType;

export type {
  BookIdType,
  BookDataType,
  BookType
}
