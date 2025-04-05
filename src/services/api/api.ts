// src/services/api/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Cat } from './types';

export const catClickerApi = createApi({
  reducerPath: 'catClickerApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://cataas.com' }),
  endpoints: (builder) => ({
    getCats: builder.query<Cat[], void>({
      query: () => '/api/cats?limit=10',
      transformResponse: (response: any[]) => {
        return response.slice(0, 10).map((_, index) => ({
          id: `cat-${index}`, // Генеруємо унікальний ID вручну
          url: `https://cataas.com/cat?unique=${index}`, // Створюємо URL, щоб уникнути кешу
          price: 10 + index * 5,
        }));
      },
    }),
  }),
});

export const { useGetCatsQuery } = catClickerApi;
