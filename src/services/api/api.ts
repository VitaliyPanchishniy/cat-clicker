import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const catClickerApi = createApi({
  reducerPath: 'catClickerApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://cataas.com' }),
  endpoints: (builder) => ({
    getCats: builder.query<{ url: string }[], void>({
      query: () => 'api/cats?json=true',
    }),
  }),
});

export const { useGetCatsQuery } = catClickerApi;
