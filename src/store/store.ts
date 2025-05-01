import { configureStore, combineReducers } from '@reduxjs/toolkit';
import catsReducer from './catsSlice';
import { catClickerApi } from '../services/api/api';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. Комбінуємо всі редьюсери
const rootReducer = combineReducers({
  cats: catsReducer,
  [catClickerApi.reducerPath]: catClickerApi.reducer, // Додаємо RTK Query редюсер
});

// 2. Налаштування persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['cats'], // Ми зберігаємо тільки cats (RTK Query кеш не треба зберігати)
};

// 3. Створюємо persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Створюємо store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // потрібно для redux-persist
    }).concat(catClickerApi.middleware), // додаємо middleware RTK Query
});

// 5. Створюємо persistor
export const persistor = persistStore(store);

// Типи
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
