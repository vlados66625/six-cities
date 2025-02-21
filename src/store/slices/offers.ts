import { CityName } from '../../const';
import { reviewsOffer } from '../../mock/reviews-offer';
import { detailedOffer } from '../../mock/detailed-offer';
import { OfferPreview, DetailedOffer } from '../../types/offer-types';
import { ReviewOffer } from '../../types/review-offer';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchOffersPreviewAction,
} from '../api-actions';

type InitialState = {
  city: CityName;
  offersPreview: OfferPreview[];
  reviewsOffer: ReviewOffer[];
  detailedOffer: DetailedOffer;
  isLoading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  city: 'Paris',
  offersPreview: [],
  reviewsOffer: [...reviewsOffer],
  detailedOffer: detailedOffer,
  isLoading: false,
  error: null,
};

export const offersSlice = createSlice({
  initialState,
  name: 'offers',
  reducers: {
    changeCity: (state, action: PayloadAction<CityName>) => {
      state.city = action.payload;
    },
    fillingReviewOffer: (state) => {
      state.reviewsOffer = [...reviewsOffer];
    },
    fillingDetailedOffer: (state) => {
      state.detailedOffer = detailedOffer;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersPreviewAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOffersPreviewAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offersPreview = action.payload;
      });
  },
  selectors: {
    city: (state) => state.city,
    offersPreview: (state) => state.offersPreview,
    reviewsOffer: (state) => state.reviewsOffer,
    detailedOffer: (state) => state.detailedOffer,
    isLoading: (state) => state.isLoading,
  }
});

export const offersSelectors = offersSlice.selectors;
export const offersActions = offersSlice.actions;
