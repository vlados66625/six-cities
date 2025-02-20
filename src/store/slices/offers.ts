import { CityName } from '../../const';
import { reviewsOffer } from '../../mock/reviews-offer';
import { detailedOffer } from '../../mock/detailed-offer';
import { OfferPreview, DetailedOffer } from '../../types/offer-types';
import { ReviewOffer } from '../../types/review-offer';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import {
  fetchOffersPreviewAction,
  fetchAuthorizationStatusAction,
  loginAction,
  logoutAction,
} from '../api-actions';

type InitialState = {
  city: CityName;
  offersPreview: OfferPreview[];
  reviewsOffer: ReviewOffer[];
  detailedOffer: DetailedOffer;
  authorizationStatus: AuthorizationStatus;
  isLoading: boolean;
  email: string;
};

const initialState: InitialState = {
  city: 'Paris',
  offersPreview: [],
  reviewsOffer: [...reviewsOffer],
  detailedOffer: detailedOffer,
  authorizationStatus: AuthorizationStatus.Unknown,
  isLoading: false,
  email: 'unknown'
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
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersPreviewAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOffersPreviewAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offersPreview = action.payload;
      })
      .addCase(fetchAuthorizationStatusAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(fetchAuthorizationStatusAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.email = action.payload.email;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.email = 'unknown';
      });
  },
  selectors: {
    city: (state) => state.city,
    offersPreview: (state) => state.offersPreview,
    reviewsOffer: (state) => state.reviewsOffer,
    detailedOffer: (state) => state.detailedOffer,
    isLoading: (state) => state.isLoading,
    authorizationStatus: (state) => state.authorizationStatus,
    email: (state) => state.email,
  }
});

export const offersSelectors = offersSlice.selectors;
export const offersActions = offersSlice.actions;
