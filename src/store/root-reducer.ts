import { combineReducers } from '@reduxjs/toolkit';
import { offersSlice } from './slices/offers';
import { authorizationSlice } from './slices/authorization';
import { offerSlice } from './slices/offer';
import { errorSlice } from './slices/error';

export const rootReducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
  [offerSlice.name]: offerSlice.reducer,
  [authorizationSlice.name]: authorizationSlice.reducer,
  [errorSlice.name]: errorSlice.reducer,
});
