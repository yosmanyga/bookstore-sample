import {Fragment, useCallback, useState} from "react";
import {Helmet} from "react-helmet";
import {useQuery} from '@tanstack/react-query'
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {Box, Button, FilledInput, IconButton, InputAdornment, Stack, Typography} from "@mui/material";
import type {ButtonProps} from '@mui/material/Button';

import {Icon, icons, useCredential} from "../core";
import {getFavorites} from "../service/FavoriteService";
import {getBooks, searchBooks} from "../service/BookService";
import {ProgressBlock} from "./ProgressBlock";
import {ErrorBlock} from "./ErrorBlock";
import {BooksListBlock} from "./BooksListBlock";

export const BooksBrowserPage = ({
  onNavigateToBookDetails
}: {
  onNavigateToBookDetails: (id: number) => void
}) => {
  const credential = useCredential();

  const [search, setSearch] = useState({
    text: ''
  });

  const {
    isLoading: isLoadingForBooks,
    error: errorForBooks,
    data: dataForBooks,
  } = useQuery({
    queryKey: ['books', search],
    queryFn: () => {
      if (search.text) {
        return searchBooks(search.text);
      }

      return getBooks();
    }
  });

  const {
    isLoading: isLoadingForFavorites,
    error: errorForFavorites,
    data: dataForFavorites,
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

  return <Fragment>
    <Helmet>
      <title>Bookstore :: Browse books</title>
    </Helmet>
    <SearchBar
      disabled={isLoadingForBooks}
      onSearch={(text) => setSearch({text: text})}
      onReset={() => setSearch({text: ''})}
    />
    <Box
      sx={{mt: 2}}
    >
      {isLoadingForBooks || isLoadingForFavorites
        ? <ProgressBlock/>
        : (dataForBooks && !errorForBooks && dataForFavorites && !errorForFavorites)
          ? (dataForBooks.length > 0
              ? <Fragment>
                {search.text && <Typography
                  variant="body1"
                  marginBottom={2}
                >
                  {prepareSearchMessage(dataForBooks.length)}
                </Typography>}
                <BooksListBlock
                  books={dataForBooks}
                  favorites={dataForFavorites}
                  onNavigateToBookDetails={onNavigateToBookDetails}
                />
              </Fragment>
              : <Typography>
                No books found
              </Typography>
          )
          : <ErrorBlock/>
      }
    </Box>
  </Fragment>
}

const prepareSearchMessage = (amount: number) => {
  if (amount === 0) {
    return 'No books found';
  }

  if (amount === 1) {
    return '1 book found';
  }

  return `${amount} books found`;
}

const SearchBar = ({
  disabled,
  onSearch,
  onReset
}: {
  disabled: boolean,
  onSearch: (text: string) => void,
  onReset: () => void
}) => {
  const [text, setText] = useState('');

  const handleSearch = useCallback(() => {
    onSearch(text);
  }, [text, onSearch]);

  return <Stack
    direction='row'
    spacing={1}
    useFlexGap
  >
    <FilledInput
      value={text}
      onChange={(event) => setText(event.target.value)}
      hiddenLabel
      size="small"
      aria-label="Type title, desc or author"
      placeholder="Type title, desc or author"
      fullWidth
      disabled={disabled}
      endAdornment={text && <InputAdornment position="end">
        <IconButton
          onClick={async () => {
            setText('');

            onReset();
          }}
          disabled={disabled}
          edge="end"
        >
          <Icon name={icons.actions.clear}/>
        </IconButton>
      </InputAdornment>}
      onKeyDown={(event) => {
        if (event.key !== 'Enter') {
          return;
        }

        handleSearch();
      }}
    />
    <SearchButton
      disabled={!text || disabled}
      onClick={handleSearch}
    />
  </Stack>
}

const SearchButton = (props: ButtonProps) => {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down('sm'));

  return <Button
    variant="contained"
    color="primary"
    startIcon={!small && <Icon name={icons.actions.search}/>}
    {...props}
  >
    {!small ? `Search` : <Icon name={icons.actions.search}/>}
  </Button>
}
