// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Cat } from './types';

// Define a service using a base URL and expected endpoints
export const catClickerApi = createApi({
  reducerPath: 'catClickerApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: (builder) => ({
    getAllPosts: builder.query<Cat, string>({
      query: () => `/post`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllPostsQuery } = catClickerApi;