import { combineReducers } from '@reduxjs/toolkit';
import { offersSlice } from './slices/offers';
import { authorizationSlice } from './slices/authorization';
import { offerSlice } from './slices/offer';

export const rootReducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
  [offerSlice.name]: offerSlice.reducer,
  [authorizationSlice.name]: authorizationSlice.reducer,
});
