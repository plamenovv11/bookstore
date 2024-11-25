import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Book } from '../common/types';
import type { Cart } from '../common/types';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/',
    credentials: 'include',
  }),
  tagTypes: ['Book', 'Image', 'Cart'],
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

    getCart: build.query<Cart, void>({
      query: () => 'carts',
      transformResponse: (response: { cart: Cart }) => response.cart,
      providesTags: ['Cart'],
    }),

    createCart: build.mutation<Cart, Partial<Cart>>({
      query: (newCartData) => ({
        url: 'carts',
        method: 'POST',
        body: newCartData,
      }),
      invalidatesTags: ['Cart'],
    }),

    updateCart: build.mutation<Cart, Partial<Cart>>({
      query: (cartUpdateData) => ({
        url: 'carts',
        method: 'PUT',
        body: cartUpdateData,
      }),
      invalidatesTags: ['Cart'],
    }),

    deleteItemFromCart: build.mutation<void, { bookId: string }>({
      query: ({ bookId }) => ({
        url: `carts/${bookId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useCreateBookMutation,
  useCreateImageMutation,
  useGetCartQuery,
  useCreateCartMutation,
  useUpdateCartMutation,
  useDeleteItemFromCartMutation,
} = api;

export default api;
