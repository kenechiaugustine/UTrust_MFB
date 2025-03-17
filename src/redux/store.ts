import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import auth from './auth/authSlice';
import { authApi } from './auth/authApi';
import { accountApi } from './account/accountApi';
import { transactionsApi } from './transactions/transactionsApi';

const userResult = localStorage.getItem('LOGGED_IN_USER');

let preloadedStateValue = undefined;
if (userResult) {
  try {
    preloadedStateValue = JSON.parse(userResult).user;
  } catch (e) {
    console.error('could not parse local storage string', e);
    localStorage.removeItem('LOGGED_IN_USER');
  }
}

export const store = configureStore({
  preloadedState: {
    auth: preloadedStateValue,
  },
  reducer: {
    auth: auth,
    [authApi.reducerPath]: authApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [transactionsApi.reducerPath]: transactionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, accountApi.middleware, transactionsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
