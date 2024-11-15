import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './booksSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import api from '../services/api'; // Import your API slice

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer, // Add the API slice reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware), // Add the API middleware
});

setupListeners(store.dispatch); // Enable refetching on focus and network reconnecti


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
