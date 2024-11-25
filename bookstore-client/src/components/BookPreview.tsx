import React from 'react';
import { Backdrop, Box, Typography, Button } from '@mui/material';
import DEFAULT_IMAGE_URL from '../assets/images/book-image.jpg';
import { Book } from '../common/types';

interface BookPreviewProps {
    open: boolean;
    onClose: () => void;
    book: Book
}

const BookPreview: React.FC<BookPreviewProps> = ({ open, onClose, book }) => {
    return (
        <Backdrop open={open} onClick={onClose} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                    borderRadius: 2,
                    maxWidth: 400,
                    minHeight: 460,
                    padding: 4,
                    boxShadow: 3,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '6px'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={book.imageUrl || DEFAULT_IMAGE_URL}
                    alt={book.title}
                    style={{ width: 'auto', height: '250px', borderRadius: 8 }}
                />
                <Typography variant="h5" gutterBottom>{book.title}</Typography>

                <Typography color="primary">
                    <b> Price:</b> {book.price}
                </Typography>

                <Typography color="primary">{book.description}</Typography>
                <Typography color="primary">
                    <b>Published Date</b>: {new Date(book.publishedDate).toLocaleDateString()}
                </Typography>
                <Button sx={{marginTop: '2px'}} variant="contained" onClick={onClose}>Close</Button>
            </Box>
        </Backdrop>
    );
};

export default BookPreview;
