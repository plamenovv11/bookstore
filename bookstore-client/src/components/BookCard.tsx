import React, { useState } from 'react';
import { Card, CardContent, Typography, CardActions, CardMedia, Button } from '@mui/material';
import BookPreview from './BookPreview';
import DEFAULT_IMAGE_URL from '../assets/images/book-image.jpg';
import { useCreateCartMutation, useGetCartQuery, useUpdateCartMutation } from '../services/api';
import { Book } from '../common/types';
import { useSnackbar } from './SnackbarContext';

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const [open, setOpen] = useState(false);
  const { data: cartData } = useGetCartQuery();
  const [createCart] = useCreateCartMutation();
  const [updateCart] = useUpdateCartMutation();
  const { showSnackbar } = useSnackbar();

  const handleOpenPreview = () => setOpen(true);

  const handleClosePreview = () => setOpen(false);

  const handleAddToCart = async () => {
    if (!cartData) {
      await createCart({ items: [{ book, quantity: 1 }] }).unwrap();
      showSnackbar(`${book.title} added to cart`, 'success');
    } else {
      const existingItem = cartData.items.find((item) => item.book._id === book._id);

      if (existingItem) {
        const updatedItems = cartData.items.map((item) =>
          item.book._id === book._id ? { ...item, quantity: item.quantity + 1 } : item
        );

        await updateCart({ items: updatedItems }).unwrap();
        showSnackbar(`${book.title} quantity updated in cart`, 'success');
      } else {
        await updateCart({ items: [...cartData.items, { book, quantity: 1 }] }).unwrap();
        showSnackbar(`${book.title} added to cart`, 'success');
      }
    }
  };

  return (
    <>
      <Card sx={{ maxWidth: 380, maxHeight: 350 }}>
        <CardMedia
          component="img"
          alt={book.title}
          height="140"
          image={book.imageUrl || DEFAULT_IMAGE_URL}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {book.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Author: {book.author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Genre: {book.genre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: ${book.price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleAddToCart}>
            Add to cart
          </Button>
          <Button size="small" onClick={handleOpenPreview}>
            Show Details
          </Button>
        </CardActions>
      </Card>

      <BookPreview open={open} onClose={handleClosePreview} book={book} />
    </>
  );
};
