import { configureStore } from '@reduxjs/toolkit';
import { catClickerApi } from '../services/api/api';

export const store = configureStore({
  reducer: {
    [catClickerApi.reducerPath]: catClickerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(catClickerApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
