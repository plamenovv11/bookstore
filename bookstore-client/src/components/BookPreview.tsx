import React from 'react';
import { Backdrop, Box, Typography, Button } from '@mui/material';

interface BookPreviewProps {
    open: boolean;
    onClose: () => void;
    title: string;
    image: string;
    price: string;
    description: string;
    publishDate: string;
}

const BookPreview: React.FC<BookPreviewProps> = ({ open, onClose, title, image, price, description, publishDate }) => {
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
                    src={image}
                    alt={title}
                    style={{ width: 'auto', height: '250px', borderRadius: 8 }}
                />
                <Typography variant="h5" gutterBottom>{title}</Typography>

                <Typography color="primary">
                    <b> Price:</b> {price}
                </Typography>

                <Typography color="primary">{description}</Typography>
                <Typography color="primary">
                    <b>Published Date</b>: {new Date(publishDate).toLocaleDateString()}
                </Typography>
                <Button sx={{marginTop: '2px'}} variant="contained" onClick={onClose}>Close</Button>
            </Box>
        </Backdrop>
    );
};

export default BookPreview;
