import React from 'react';
import { Box, Grid, Typography, Button, Paper, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DEFAULT_IMAGE_URL from '../assets/images/book-image.jpg';
import { useGetCartQuery, useUpdateCartMutation, useDeleteItemFromCartMutation } from '../services/api';
import { get } from 'lodash';

const Cart: React.FC = () => {
    const { data: cartData, refetch } = useGetCartQuery();
    const [updateCart] = useUpdateCartMutation();
    const [deleteItemFromCart] = useDeleteItemFromCartMutation();

    const total = cartData?.items.reduce((acc, item) => acc + get(item, 'book.price', 0) * item.quantity, 0) || 0;

    const handleRemoveBook = async (bookId: string) => {
        if (!cartData) return;

        await deleteItemFromCart({ bookId });
        refetch();
    };

    return (
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Typography variant="h4" gutterBottom>
                Your Cart
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Grid container spacing={3}>
                        {cartData?.items.map((item) => (
                            <Grid item xs={12} sm={6} md={4} key={item.book._id}>
                                <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={item.book.imageUrl || DEFAULT_IMAGE_URL}
                                        alt={item.book.title}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Box>
                                                <Typography variant="h6">{item.book.title}</Typography>
                                                <Typography variant="body2">Author: {item.book.author}</Typography>
                                                <Typography variant="body2">Price: ${get(item, 'book.price', 0)}</Typography>
                                                <Typography variant="body2">Qty: {item.quantity}</Typography>
                                            </Box>
                                            <IconButton onClick={() => handleRemoveBook(get(item, 'book._id', ''))}>
                                                <DeleteIcon color="error" />
                                            </IconButton>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h5" gutterBottom>
                            Summary
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="body1">Total Books:</Typography>
                            <Typography variant="body1">{cartData?.items.length || 0}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="body1" fontWeight="bold">
                                Total:
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                                ${total.toFixed(2)}
                            </Typography>
                        </Box>
                        <Button variant="contained" color="success" fullWidth>
                            Purchase Now
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Cart;
