import {Fragment} from "react";
import {Helmet} from "react-helmet";
import {useQuery} from '@tanstack/react-query'
import {Box, Typography} from "@mui/material";

import {useCredential} from "../core";
import {getFavorites} from "../service/FavoriteService";
import {ErrorBlock} from "./ErrorBlock";
import {ProgressBlock} from "./ProgressBlock";
import {BooksListBlock} from "./BooksListBlock";

const BooksFavoritesPage = ({
  onNavigateToBookDetails
}: {
  onNavigateToBookDetails: (id: number) => void
}) => {
  const credential = useCredential();

  const {
    isLoading,
    error,
    data,
  } = useQuery({
    queryKey: ['favorites', credential ? credential.id : null],
    queryFn: async () => {
      if (!credential) {
        return [];
      }

      return await getFavorites(
        credential.id
      );
    }
  });

  if (!credential) {
    // TODO: Redirect to login
    return null;
  }

  return <Fragment>
    <Helmet>
      <title>Bookstore :: My Favorites</title>
    </Helmet>
    <Box
      sx={{mt: 2}}
    >
      {isLoading || isLoading
        ? <ProgressBlock/>
        : (
          (
            data && !error
            && data && !error
          )
            ? (data.length > 0
                ? <BooksListBlock
                  books={data.map(favorites => favorites.book)}
                  favorites={data}
                  onNavigateToBookDetails={onNavigateToBookDetails}
                />
                : <Typography>
                  You have no favorites
                </Typography>
            )
            : <ErrorBlock/>
        )
      }
    </Box>
  </Fragment>
}

export {
  BooksFavoritesPage
}
