import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Cat } from './types';

export const catClickerApi = createApi({
  reducerPath: 'catClickerApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://cataas.com/' }),
  endpoints: (builder) => ({
    getCats: builder.query<Cat[], void>({
      query: () => 'api/cats?tags=cute&limit=20',
    }),
  }),
});

export const { useGetCatsQuery } = catClickerApi;
