import { CityName } from '../const';
import { offersPreview } from '../mock/offers-preview';
import { reviewsOffer } from '../mock/reviews-offer';
import { detailedOffer } from '../mock/detailed-offer';
import { OfferPreview, DetailedOffer } from '../types/offer-types';
import { ReviewOffer } from '../types/review-offer';
import { createReducer } from '@reduxjs/toolkit';
import { changeCity, fillingOfferPreview, fillingDetailedOffer, fillingReviewOffer } from './action';

type InitialState = {
  city: CityName;
  offersPreview: OfferPreview[];
  reviewsOffer: ReviewOffer[];
  detailedOffer: DetailedOffer;
};

const initialState: InitialState = {
  city: 'Paris',
  offersPreview: [...offersPreview],
  reviewsOffer: [...reviewsOffer],
  detailedOffer: detailedOffer
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillingOfferPreview, (state) => {
      state.offersPreview = [...offersPreview];
    })
    .addCase(fillingReviewOffer, (state) => {
      state.reviewsOffer = [...reviewsOffer];
    })
    .addCase(fillingDetailedOffer, (state) => {
      state.detailedOffer = detailedOffer;
    });
});
