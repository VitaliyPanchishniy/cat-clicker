import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Cat } from '../../store/catsSlice';

export const catClickerApi = createApi({
  reducerPath: 'catClickerApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://cataas.com/api/' }),
  endpoints: (builder) => ({
    getCats: builder.query<Cat[], void>({
      query: () => 'cats?limit=20',
      transformResponse: (response: any[]) =>
        response.map((cat: any) => ({
          id: cat.id,
          url: `https://cataas.com/cat/${cat.id}`,
          price: Math.floor(Math.random() * 100) + 50,
        })),
    }),
  }),
});

export const { useGetCatsQuery } = catClickerApi;
