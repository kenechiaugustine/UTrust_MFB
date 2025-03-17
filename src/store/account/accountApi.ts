import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../api';

export const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    deposit: builder.mutation<Response<IUser>, { userId: string; amount: string }>({
      query: (body) => ({
        url: '/account/deposit',
        method: 'POST',
        body,
      }),
    }),

    withdraw: builder.mutation<Response<IUser>, { userId: string; amount: string }>({
      query: (body) => ({
        url: '/account/withdraw',
        method: 'POST',
        body,
      }),
    }),

    verifyAccount: builder.mutation<Response<IVerifyAccount>, { accountNumber: string }>({
      query: (body) => ({
        url: '/account/verify-account',
        method: 'POST',
        body,
      }),
    }),

    transfer: builder.mutation<Response<IUser>, { senderId: string; receiverAccountNumber: number; amount: string }>({
      query: (body) => ({
        url: '/account/transfer',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useDepositMutation, useWithdrawMutation, useVerifyAccountMutation, useTransferMutation } = accountApi;
