import {Fragment, useEffect, useState} from "react";
import {useMutation} from "@tanstack/react-query";

import {Box, Button, Card, CardActions, CardContent, CardHeader, IconButton, Tooltip, Typography} from '@mui/material';
import {toggleFavorite} from "../service/FavoriteService";
import {Icon, icons, useCredential} from "../core";
import {BookType, FavoriteType} from "../type";
import {BookImageBlock} from "./BooksImageBlock";

const BookItemBlock = ({
  book,
  favorite: initialFavorite,
  onDetails
}: {
  book: BookType,
  favorite: boolean,
  onDetails?: () => void
}) => {
  const credential = useCredential();

  const [favorite, setFavorite] = useState(initialFavorite);

  useEffect(() => {
    setFavorite(initialFavorite);
  }, [initialFavorite])

  const mutation = useMutation({
    mutationFn: async ({
      book,
      favorite
    }: {
      book: FavoriteType['bookId'],
      favorite: boolean
    }) => {
      if (!credential) {
        throw new Error('User not logged in');
      }

      return toggleFavorite(credential.id, book, favorite);
    },
    onSuccess: () => {
      setFavorite(!favorite);
    }
  });

  const description = !onDetails
    ? book.description
    // Truncate description
    : `${book.description.substring(0, 100)}`
    // Add ellipsis if the description was longer than truncation
    + (book.description.length > 100 ? '...' : '');

  return <Card sx={{
    display: 'flex',
    maxHeight: 220
  }}>
    <BookImageBlock
      book={book}
      width={220 * 180 / 268}
      height={220}
    />

    <Box flex={1}>
      <CardHeader
        action={<Tooltip
          title={
            credential
              ? (
                favorite
                  ? 'Remove from favorites'
                  : 'Add to favorites'
              )
              : 'Login to favorite'
          }
        >
          <IconButton
            onClick={credential
              ? () => {
                mutation.mutate({
                  book: book.id,
                  favorite: favorite
                });
              }
              : undefined
            }
            aria-label="Add to favorites"
          >
            <Icon name={favorite
              ? icons.states.liked
              : icons.states.unliked}
            />
          </IconButton>
        </Tooltip>}
        title={book.title}
        subheader={book.author}
      />

      <CardContent
        sx={{
          maxHeight: 70,
          display: {xs: 'none', sm: 'block'}
        }}
      >
        <Typography
          paragraph
        >
          {description}
        </Typography>

        {!onDetails && <Fragment>
          <Typography
            paragraph
          >
            Publication Year: {book.publication_year}
          </Typography>
          <Typography
            paragraph
          >
            ISBN: {book.isbn}
          </Typography>
        </Fragment>}
      </CardContent>

      {onDetails && <CardActions>
        <Button
          onClick={(e) => {
            onDetails();

            e.preventDefault();
          }}
          startIcon={<Icon name={icons.actions.details}/>}
        >
          Details
        </Button>
      </CardActions>}
    </Box>
  </Card>
};

export {
  BookItemBlock
}
