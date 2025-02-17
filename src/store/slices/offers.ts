import { CityName } from '../../const';
import { offersPreview } from '../../mock/offers-preview';
import { reviewsOffer } from '../../mock/reviews-offer';
import { detailedOffer } from '../../mock/detailed-offer';
import { OfferPreview, DetailedOffer } from '../../types/offer-types';
import { ReviewOffer } from '../../types/review-offer';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

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

export const offersSlice = createSlice({
  initialState,
  name: 'offers',
  reducers: {
    changeCity: (state, action: PayloadAction<CityName>) => {
      state.city = action.payload;
    },
    fillingOfferPreview: (state) => {
      state.offersPreview = [...offersPreview];
    },
    fillingReviewOffer: (state) => {
      state.reviewsOffer = [...reviewsOffer];
    },
    fillingDetailedOffer: (state) => {
      state.detailedOffer = detailedOffer;
    }
  },
  selectors: {
    city: (state) => state.city,
    offersPreview: (state) => state.offersPreview,
    reviewsOffer: (state) => state.reviewsOffer,
    detailedOffer: (state) => state.detailedOffer
  }
});

export const offersSelectors = offersSlice.selectors;
export const offersActions = offersSlice.actions;
