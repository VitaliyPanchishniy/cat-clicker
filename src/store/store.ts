import { configureStore } from '@reduxjs/toolkit';
import catsReducer from './catsSlice';
import shopReducer from './shopSlice';
import { catClickerApi } from '../services/api/api';

export const store = configureStore({
  reducer: {
    cats: catsReducer,
    shop: shopReducer,
    [catClickerApi.reducerPath]: catClickerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catClickerApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
