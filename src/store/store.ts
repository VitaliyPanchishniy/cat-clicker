import { configureStore } from '@reduxjs/toolkit';
import catsReducer from './catsSlice';
import { catClickerApi } from '../services/api/api'; // Імпортуй API

export const store = configureStore({
  reducer: {
    cats: catsReducer,
    [catClickerApi.reducerPath]: catClickerApi.reducer, // Додай редуктор RTK Query
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catClickerApi.middleware), // Додай middleware
});

// Оголошуємо типи
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
