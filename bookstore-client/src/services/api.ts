import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Book } from '../common/types';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/',
    credentials: 'include', 
  }),
  tagTypes: ['Book', 'Image'],
  endpoints: (build) => ({
    getBooks: build.query<Book[], void>({
      query: () => 'books',
      transformResponse: (response: Book[]) => response,
      providesTags: ['Book'],
    }),

    createBook: build.mutation<Book, Partial<Book>>({
      query: (newBook) => ({
        url: 'books',
        method: 'POST',
        body: newBook,
      }),
      invalidatesTags: ['Book'],
    }),

    createImage: build.mutation<{ imageUrl: string }, FormData>({
      query: (formData) => ({
        url: 'images/upload',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Image'],
    }),
  }),
});

export const { useGetBooksQuery, useCreateBookMutation, useCreateImageMutation } = api;

export default api;
