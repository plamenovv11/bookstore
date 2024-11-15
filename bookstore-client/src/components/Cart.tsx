import * as React from 'react';
import Box from '@mui/material/Box';

const Cart: React.FC = () => {
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

            </Box>
        </React.Fragment>
    );
};

export default Cart;