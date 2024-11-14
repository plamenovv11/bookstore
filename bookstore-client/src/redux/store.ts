import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import booksReducer from './booksSlice';
import authReducer from './authSlice';
import { authApi } from '../services/authApi';  // Ensure you are importing authApi
import api from '../services/api';
import { setupListeners } from '@reduxjs/toolkit/query';

// Persist configuration for auth slice only
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],  // Persist only auth slice
};

// Combining reducers
const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer, // General API middleware
    [authApi.reducerPath]: authApi.reducer, // Auth API reducer for login/logout
    books: booksReducer,  // Books slice reducer
    auth: authReducer,  // Auth slice reducer
});

// Persisting the rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
            .concat(api.middleware) // Add middleware for your general API
            .concat(authApi.middleware), // Add middleware for the authApi
});

const persistor = persistStore(store);

// Setup listeners for query refetching, etc.
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store, persistor };
