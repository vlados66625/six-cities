import { CityName } from '../const';
import { offersPreview } from '../mock/offers-preview';
import { OfferPreview } from '../types/offer-types';
import { createReducer } from '@reduxjs/toolkit';
import { changeCity, fillingOffers } from './action';

type InitialState = {
  city: CityName;
  offersPreview: OfferPreview[];
};

const initialState: InitialState = {
  city: 'Paris',
  offersPreview: [...offersPreview],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillingOffers, (state) => {
      state.offersPreview = [...offersPreview];
    });
});
