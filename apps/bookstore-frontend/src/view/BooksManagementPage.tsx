import React, {FC, Fragment, useState} from "react";
import {Helmet} from "react-helmet";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import {
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";

import {addBook, deleteBook, getBooks, updateBook} from "../service/BookService";
import {ErrorBlock} from "./ErrorBlock";
import {ProgressBlock} from "./ProgressBlock";
import {Icon, icons} from "../core";
import {BookDataType, BookIdType, BookType} from "../type";
import {BookImageBlock} from "./BooksImageBlock";

const BooksManagementPage = () => {
  const [message, setMessage] = useState<string | null>(null);

  const queryClient = useQueryClient()

  const [action, setAction] = useState<{ type: string, book: BookType | null }>({
    type: "",
    book: null
  });

  const {
    isLoading,
    error,
    data,
  } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks
  });

  const addMutation = useMutation({
    mutationFn: async (data: BookDataType) => {
      return await addBook(data);
    },
    onSuccess: (book) => {
      queryClient.setQueryData(["books"], (old: BookType[] | undefined) => {
        if (!old) {
          return [];
        }

        return [book, ...old];
      });

      setAction({type: "", book: null});

      setMessage("Book added");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({id, data}: { id: BookIdType, data: BookDataType }) => {
      return await updateBook(id, data);
    },
    onSuccess: (book) => {
      queryClient.setQueryData(["books"], (old: BookType[] | undefined) => {
        if (!old) {
          return [];
        }

        return old.map((b) => {
          if (b.id === book.id) {
            return book;
          }

          return b;
        });
      });

      setAction({type: "", book: null});

      setMessage("Book updated");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: BookIdType) => {
      return await deleteBook(id);
    },
    onSuccess: (id) => {
      queryClient.setQueryData(["books"], (old: BookType[] | undefined) => {
        if (!old) {
          return [];
        }

        return old.filter((b) => b.id !== id);
      });

      setAction({type: "", book: null});

      setMessage("Book deleted");
    },
  });

  return <Fragment>
    <Helmet>
      <title>Bookstore :: Management</title>
    </Helmet>
    <Box
      sx={{mt: 2}}
    >
      {isLoading
        ? <ProgressBlock/>
        : (data && !error)
          ? (data.length > 0
              ? <Fragment>
                <Button
                  startIcon={<Icon name={icons.actions.add}/>}
                  onClick={() => {
                    setAction({type: "add", book: null})
                  }}
                >
                  Add book
                </Button>

                <TableContainer
                  component={Paper}
                  sx={{mt: 2}}
                >
                  <Table sx={{minWidth: 650}}>
                    <TableHead>
                      <TableRow>
                        <TableCell/>
                        <TableCell>Title</TableCell>
                        <TableCell>Author</TableCell>
                        <TableCell/>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((book) => (
                        <Row
                          key={book.id}
                          book={book}
                          onEdit={() => setAction({type: "update", book: book})}
                          onDelete={() => setAction({type: "delete", book: book})}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Fragment>
              : <Typography>
                No books found
              </Typography>
          )
          : <ErrorBlock/>
      }
    </Box>

    <Snackbar
      open={message !== null}
      autoHideDuration={3000}
      onClose={() => setMessage(null)}
      message={message}
    />

    {<AddModal
      open={action.type === "add"}
      onAdd={(data) => {
        addMutation.mutate(data);
      }}
      onClose={() => setAction({type: "", book: null})}
    />}

    {action.book && <UpdateModal
      open={action.type === "update"}
      book={action.book}
      onUpdate={(data) => {
        if (!action.book) {
          return; // TODO: Improve typescript check
        }

        updateMutation.mutate({
          id: action.book.id,
          data: data
        });
      }}
      onClose={() => setAction({type: "", book: null})}
    />}

    {action.book && <DeleteModal
      open={action.type === "delete"}
      book={action.book}
      onDelete={() => {
        if (!action.book) {
          return; // TODO: Improve typescript check
        }

        deleteMutation.mutate(action.book.id);
      }}
      onClose={() => setAction({type: "", book: null})}
    />}
  </Fragment>
}

const Row = ({
  book,
  onEdit,
  onDelete
}: {
  book: BookType,
  onEdit: () => void,
  onDelete: () => void
}) => {
  const [expanded, setExpanded] = useState(false);

  return <Fragment>
    <TableRow sx={{"& > *": {borderBottom: "unset"}}}>
      <TableCell>
        <IconButton
          size="small"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded
            ? <Icon name={icons.actions.collapse}/>
            : <Icon name={icons.actions.expand}/>
          }
        </IconButton>
      </TableCell>
      <TableCell>
        {book.title}
      </TableCell>
      <TableCell>{book.author}</TableCell>
      <TableCell align="right">
        <IconButton
          onClick={onEdit}
        >
          <Icon name={icons.actions.edit}/>
        </IconButton>

        <IconButton
          onClick={onDelete}
          sx={{ml: 2}}
        >
          <Icon name={icons.actions.delete}/>
        </IconButton>
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={4}>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Stack
            direction="row"
            paddingY={2}
          >
            <BookImageBlock
              book={book}
              width={60}
              height='100%'
            />
            <Box sx={{margin: 1}}>
              <Typography>
                <strong>Description: </strong> {book.description}
              </Typography>
              <Typography>
                <strong>Publication Year: </strong> {book.publication_year}
              </Typography>
              <Typography>
                <strong>ISBN: </strong> {book.isbn}
              </Typography>
            </Box>
          </Stack>

        </Collapse>
      </TableCell>
    </TableRow>
  </Fragment>
}

const AddModal = ({
  open,
  onAdd,
  onClose,
}: {
  open: boolean,
  onAdd: (data: BookDataType) => void,
  onClose: () => void,
}) => {
  return <EditModal
    open={open}
    title="Add book"
    action={{
      label: "Add",
      icon: icons.actions.add
    }}
    book={{
      title: "",
      author: "",
      description: "",
      publication_year: 1900,
      isbn: "",
    }}
    onEdit={onAdd}
    onClose={onClose}
  />
}

const UpdateModal = ({
  open,
  book,
  onUpdate,
  onClose,
}: {
  open: boolean,
  book: BookType
  onUpdate: (data: BookDataType) => void,
  onClose: () => void,
}) => {
  return <EditModal
    open={open}
    title="Update book"
    action={{
      label: "Update",
      icon: icons.actions.edit
    }}
    book={book}
    onEdit={onUpdate}
    onClose={onClose}
  />
}

const EditModal = ({
  open,
  title,
  action,
  book,
  onEdit,
  onClose,
}: {
  open: boolean,
  title: string,
  action: {
    label: string,
    icon: FC
  }
  book: BookDataType
  onEdit: (data: BookDataType) => void,
  onClose: () => void,
}) => {
  const [data, setData] = useState<BookDataType>(book);

  return <Dialog
    open={open}
    onClose={onClose}
    PaperProps={{
      component: "form",
      onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        onEdit({
          title: formData.get('title') as string,
          author: formData.get('author') as string,
          description: formData.get('description') as string,
          publication_year: parseInt(formData.get('publication_year') as string),
          isbn: formData.get('isbn') as string
        });
      },
    }}
  >
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <TextField
        value={data.title}
        onChange={(event) => setData({...data, title: event.target.value})}
        autoFocus
        required
        margin="dense"
        name="title"
        label="Title"
        fullWidth
        variant="standard"
      />

      <TextField
        value={data.author}
        onChange={(event) => setData({...data, author: event.target.value})}
        required
        margin="dense"
        name="author"
        label="Author"
        fullWidth
        variant="standard"
      />

      <TextField
        value={data.description}
        onChange={(event) => setData({...data, description: event.target.value})}
        required
        margin="dense"
        name="description"
        label="Description"
        fullWidth
        variant="standard"
      />

      <TextField
        value={data.publication_year}
        onChange={(event) => setData({...data, publication_year: parseInt(event.target.value)})}
        required
        type="number"
        margin="dense"
        name="publication_year"
        label="Publication Year"
        fullWidth
        variant="standard"
      />

      <TextField
        value={data.isbn}
        onChange={(event) => setData({...data, isbn: event.target.value})}
        required
        margin="dense"
        name="isbn"
        label="ISBN"
        fullWidth
        variant="standard"
      />
    </DialogContent>
    <DialogActions>
      <Button
        startIcon={<Icon name={icons.actions.back}/>}
        onClick={onClose}
      >
        Cancel
      </Button>
      <Button
        startIcon={<Icon name={action.icon}/>}
        autoFocus
        disabled={
          !data.title
          || !data.author
          || !data.description
          || !data.publication_year
          || !data.isbn
        }
        type="submit"
      >
        {action.label}
      </Button>
    </DialogActions>
  </Dialog>
}

const DeleteModal = ({
  open,
  book,
  onClose,
  onDelete
}: {
  open: boolean,
  book: BookType
  onClose: () => void,
  onDelete: () => void,
}) => {
  return <Dialog
    open={open}
    onClose={onClose}
  >
    <DialogTitle>
      Delete book "{book.title}"?
    </DialogTitle>
    <DialogActions>
      <Button
        startIcon={<Icon name={icons.actions.back}/>}
        autoFocus
        onClick={onClose}
      >
        Cancel
      </Button>
      <Button
        color="error"
        startIcon={<Icon name={icons.actions.delete}/>}
        onClick={onDelete}
      >
        Delete
      </Button>
    </DialogActions>
  </Dialog>
}

export {
  BooksManagementPage
}
