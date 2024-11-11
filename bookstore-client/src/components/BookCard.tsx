import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import DEFAULT_IMAGE_URL from '../assets/images/book-image.jpg'

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
  imageUrl
}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguanaa"
        height="140"
        image={imageUrl || DEFAULT_IMAGE_URL}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
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
        <Typography variant="body2" color="text.secondary">
          Published Date: {new Date(publishedDate).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to cart</Button>
        <Button size="small">Show Details</Button>
      </CardActions>
    </Card>
  );

};

export default BookCard;
