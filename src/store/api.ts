import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAuthToken } from '../utils/helpers';

// const BASE_URL = process.env.VITE_BASE_URL;
const BASE_URL = 'http://127.0.0.1:8000/api/v1';

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token = getAuthToken();
    if (token) {
      headers.set('authToken', token);
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
