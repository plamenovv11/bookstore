import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Book } from '../common/types';

const API_URL = 'http://localhost:3000/books';

export const fetchBooks = createAsyncThunk<Book[]>('books/fetchBooks', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

interface BooksState {
  items: Book[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  loading: boolean;
  books: Book[];
}

const initialState: BooksState = {
  items: [],
  status: 'idle',
  error: null,
  loading: false,
  books: []
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default booksSlice.reducer;
