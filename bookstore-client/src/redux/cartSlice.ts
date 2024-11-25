import { createSlice } from '@reduxjs/toolkit';
import { Book } from '../common/types';

interface CartState {
    books: Book[];
    itemCount: number;
}

const initialState: CartState = {
    books: [],
    itemCount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            state.books.push(action.payload);
            state.itemCount += 1;
        },
    },
});

export const { addItemToCart } = cartSlice.actions;

export const selectCartItemCount = (state: { cart: CartState }) => state.cart.itemCount;

export default cartSlice.reducer;