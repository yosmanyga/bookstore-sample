import {BookType} from './BookType';

type FavoriteIdType = number;

type FavoriteDataType = {
  userId: number,
  bookId: number,
  book: BookType
}

type FavoriteType = {
  id: FavoriteIdType
} & FavoriteDataType;

export type {
  FavoriteIdType,
  FavoriteDataType,
  FavoriteType
}
