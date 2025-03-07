import browserHistory from '../../browser-history';
import { AppRoute } from '../../const';
import { OfferPreview, DetailedOffer } from '../../types/offer-types';
import { ReviewOffer } from '../../types/review-offer';
import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import {
  fetchDetailedOfferAction,
  fetchOffersNearbyAction,
  fetchReviewsOfferAction,
  reviewPostAction,
  setFavoriteOfferAction
} from './api-actions/offer';
import dayjs from 'dayjs';

type InitialState = {
  reviewsOffer: ReviewOffer[];
  detailedOffer: DetailedOffer | null;
  offersNearby: OfferPreview[];
  isLoadingOffer: boolean;
  idFocusCard: string | null;
  isFavoriteBtnDisabled: boolean;
};

const initialState: InitialState = {
  reviewsOffer: [],
  detailedOffer: null,
  offersNearby: [],
  isLoadingOffer: false,
  idFocusCard: null,
  isFavoriteBtnDisabled: false,
};

export const offerSlice = createSlice({
  initialState,
  name: 'offer',
  reducers: {
    setidFocusCard: (state, action: PayloadAction<string | null>) => {
      state.idFocusCard = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetailedOfferAction.pending, (state) => {
        state.isLoadingOffer = true;
      })
      .addCase(fetchDetailedOfferAction.fulfilled, (state, action) => {
        state.isLoadingOffer = false;
        state.detailedOffer = action.payload;
      })
      .addCase(fetchDetailedOfferAction.rejected, () => {
        browserHistory.push(AppRoute.Error);
      })
      .addCase(fetchOffersNearbyAction.fulfilled, (state, action) => {
        state.offersNearby = action.payload;
      })
      .addCase(fetchReviewsOfferAction.fulfilled, (state, action) => {
        state.reviewsOffer = action.payload;
      })
      .addCase(reviewPostAction.fulfilled, (state, action) => {
        state.reviewsOffer.push(action.payload);
      })
      .addCase(setFavoriteOfferAction.pending, (state) => {
        state.isFavoriteBtnDisabled = true;
      })
      .addCase(setFavoriteOfferAction.fulfilled, (state) => {
        state.isFavoriteBtnDisabled = false;
      });
  },
  selectors: {
    reviewsOffer: (state) => state.reviewsOffer,
    sortedByDateReviewsOffer: createSelector([(state: InitialState) => state.reviewsOffer],
      (reviewsOffer): ReviewOffer[] => [...reviewsOffer].sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf())
    ),
    detailedOffer: (state) => state.detailedOffer,
    offersNearby: (state) => state.offersNearby,
    isLoadingOffer: (state) => state.isLoadingOffer,
    idFocusCard: (state) => state.idFocusCard,
    isFavoriteBtnDisabled: (state) => state.isFavoriteBtnDisabled,
  }
});

export const offerSelectors = offerSlice.selectors;
export const offerActions = {
  ...offerSlice.actions,
  fetchDetailedOfferAction,
  fetchOffersNearbyAction,
  fetchReviewsOfferAction,
  reviewPostAction,
  setFavoriteOfferAction,
};
