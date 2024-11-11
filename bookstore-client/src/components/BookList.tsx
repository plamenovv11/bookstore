import * as React from 'react';
import { useGetBooksQuery, useCreateBookMutation } from '../api';
import { Typography } from '@mui/material';
import BookCard from './BookCard';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import AddBookDialog from './AddBookDialog';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { useSnackbar } from './SnackbarContext';
import { Book } from '../common/types';

const BookList: React.FC = () => {
    const [addBookDialogOpened, setAddBookDialogOpened] = React.useState(false);
    const { showSnackbar } = useSnackbar();

    const { data: books, isLoading } = useGetBooksQuery();
    const [createBook, { isSuccess, data: result }] = useCreateBookMutation();

    const handleClickOpen = () => {
        setAddBookDialogOpened(true);
    };

    const handleClose = () => {
        setAddBookDialogOpened(false);
    };

    const handleAddBook = async (book: Partial<Book>) => {
        createBook(book).unwrap();
    };

    useEffect(() => {
        if (isSuccess && result) {
            showSnackbar(`Book with title:  ${result?.title} craeted successfuly!`, 'success');
        }
    }, [isSuccess, result]);

    if (isLoading) return <Box>Loading...</Box>;

    const hasBooks = books && books.length;

    return (
        <React.Fragment>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between', // Ensures the items are spaced out
                    alignItems: 'center', // Vertically centers the items
                    padding: 2, // Adds padding around the box
                    border: '1px solid #ccc', // Optional border for the frame
                    borderRadius: '8px', // Optional rounded corners for the frame
                    boxShadow: 3, // Optional shadow for visual enhancement
                    marginBottom: 4
                }}
            >

                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    Available Books
                </Typography>

                <Button variant="outlined" onClick={handleClickOpen}>
                    Add new book to store
                </Button>
            </Box>

            <AddBookDialog
                open={addBookDialogOpened}
                handleClose={handleClose}
                onSubmitHandler={handleAddBook}
            />

            {hasBooks ? (
                <Grid container spacing={3}>
                    {books.map((book) => (
                        <Grid item xs={12} sm={6} md={4} key={book._id}>
                            <BookCard
                                title={book.title}
                                author={book.author}
                                description={book.description}
                                price={book.price}
                                publishedDate={book.publishedDate.toString().split('T')[0]}
                                genre={book.genre}
                                imageUrl={book.imageUrl}
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Box>No books available.</Box>
            )}
        </React.Fragment>
    );
};

export default BookList;
