import axios from "./axios";

import {FavoriteDataType, FavoriteType} from "../type";

const getFavorites = async (
  userId: number
): Promise<FavoriteType[]> => {
  const response = await axios.get(`/favorites/user/${userId}`);

  return response.data;
}

const toggleFavorite = async (
  userId: FavoriteDataType['userId'],
  bookId: FavoriteDataType['bookId'],
  current: boolean
): Promise<FavoriteType> => {
  let response;

  if (current) {
    response = await axios.delete(`/favorites/user/${userId}/book/${bookId}`);
  } else {
    response = await axios.post('/favorites', {
      userId: userId,
      bookId: bookId
    });
  }

  return response.data;
}

export {
  getFavorites,
  toggleFavorite
};
