import * as React from 'react';
import Box from '@mui/material/Box';

const Cart: React.FC = () => {
    return (
        <React.Fragment>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 2,
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    boxShadow: 3,
                    marginBottom: 4
                }}
            >
            </Box>
        </React.Fragment>
    );
};

export default Cart;