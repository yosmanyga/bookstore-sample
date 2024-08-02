import {Fragment} from "react";
import {Helmet} from "react-helmet";
import {useQuery} from '@tanstack/react-query'
import {Button, CircularProgress} from "@mui/material";

import {Icon, icons, useCredential} from "../core";
import {BookIdType, BookType, FavoriteType} from "../type";
import {getBook} from "../service/BookService";
import {getFavorites} from "../service/FavoriteService";
import {ErrorBlock} from "./ErrorBlock";
import {BookItemBlock} from "./BookItemBlock";

export const BookDetailsPage = ({
  id,
  onBack
}: {
  id: BookIdType,
  onBack: () => void
}) => {
  const credential = useCredential();

  const {
    isLoading: isLoadingForBooks,
    error: errorForBooks,
    data: dataForBooks
  } = useQuery({
    queryKey: ['books', id],
    queryFn: () => getBook(id),
  }) as { isLoading: boolean, error: Error | null, data: BookType };

  const {
    isLoading: isLoadingForFavorites,
    error: errorForFavorites,
    data: dataForFavorites
  } = useQuery({
    queryKey: ['favorites', credential && credential.id],
    queryFn: () => {
      if (!credential) {
        return [];
      }

      return getFavorites(credential.id);
    },
  }) as { isLoading: boolean, error: Error | null, data: FavoriteType[] };

  if (isLoadingForBooks || isLoadingForFavorites) {
    return <CircularProgress/>
  }

  if (errorForBooks || errorForFavorites) {
    return <ErrorBlock/>
  }

  return <Fragment>
    <Helmet>
      <title>Bookstore :: {dataForBooks.title}</title>
    </Helmet>
    <BookItemBlock
      book={dataForBooks}
      favorite={!!dataForFavorites.find(favorite => favorite.bookId === dataForBooks.id)}
    />
    <Button
      startIcon={<Icon name={icons.actions.back}/>}
      sx={{mt: 2}}
      onClick={(e) => {
        onBack();

        e.preventDefault();
      }}
    >
      Back to list
    </Button>
  </Fragment>
}
