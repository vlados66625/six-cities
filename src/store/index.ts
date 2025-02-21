import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { offersSlice } from './slices/offers';
import { authorizationSlice } from './slices/authorization';
import { errorSlice } from './slices/error';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    [offersSlice.name]: offersSlice.reducer,
    [authorizationSlice.name]: authorizationSlice.reducer,
    [errorSlice.name]: errorSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    })
});
