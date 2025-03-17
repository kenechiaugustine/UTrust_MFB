import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../api';

export const transactionsApi = createApi({
  reducerPath: 'transactionsApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getTransactions: builder.query<Response<ITransactions[]>, { user: string; limit?: number; page?: number }>({
      query: ({ user, limit, page }) => ({
        url: `/transactions?user=${user}&limit=${limit}&page=${page}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetTransactionsQuery } = transactionsApi;
