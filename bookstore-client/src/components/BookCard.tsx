import React, { useState } from 'react';
import { Card, CardContent, Typography, CardActions, CardMedia, Button } from '@mui/material';
import BookPreview from './BookPreview';
import DEFAULT_IMAGE_URL from '../assets/images/book-image.jpg';

interface BookCardProps {
  title: string;
  author: string;
  description: string;
  price: number;
  publishedDate: string;
  genre: string;
  imageUrl: string;
}

const BookCard: React.FC<BookCardProps> = ({
  title,
  author,
  description,
  price,
  publishedDate,
  genre,
  imageUrl,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpenPreview = () => setOpen(true);

  const handleClosePreview = () => setOpen(false);

  return (
    <>
      <Card sx={{ maxWidth: 380, maxHeight: 350 }}>
        <CardMedia
          component="img"
          alt={title}
          height="140"
          image={imageUrl || DEFAULT_IMAGE_URL}
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
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Author: {author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Genre: {genre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: ${price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Add to cart</Button>
          <Button size="small" onClick={handleOpenPreview}>Show Details</Button>
        </CardActions>
      </Card>

      <BookPreview
        open={open}
        onClose={handleClosePreview}
        title={title}
        image={imageUrl || DEFAULT_IMAGE_URL}
        price={`$${price}`}
        description={description}
        publishDate={publishedDate}
      />
    </>
  );
};

export default BookCard;
