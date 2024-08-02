import {Grid} from "@mui/material";

import {BookType, FavoriteDataType} from "../type";
import {BookItemBlock} from "./BookItemBlock";

const BooksListBlock = ({
  books,
  favorites,
  onNavigateToBookDetails
}: {
  books: BookType[],
  favorites: FavoriteDataType[],
  onNavigateToBookDetails: (id: number) => void
}) => {
  return <Grid
    container
    spacing={4}
    marginBottom={4}
  >
    {books.map((book) => {
      const favorite = favorites.find((favorite) => favorite.bookId === book.id);

      return <Grid
        key={book.id}
        item
        xs={12}
        lg={6}
      >
        <BookItemBlock
          book={book}
          favorite={favorite !== undefined}
          onDetails={() => onNavigateToBookDetails(book.id)}
        />
      </Grid>
    })}
  </Grid>
}

export {BooksListBlock};
