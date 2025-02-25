import { CityName, AppRoute } from '../../const';
import { OfferPreview, DetailedOffer } from '../../types/offer-types';
import { ReviewOffer } from '../../types/review-offer';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { getFilteredByCityOffers, SortingOptions } from '../../util';
import {
  fetchOffersPreviewAction,
  fetchDetailedOfferAction,
  fetchOffersNearbyAction,
  fetchReviewsOfferAction,
  reviewPostAction,
} from '../api-actions';
import browserHistory from '../../browser-history';

type InitialState = {
  city: CityName;
  offersPreview: OfferPreview[];
  reviewsOffer: ReviewOffer[];
  detailedOffer: DetailedOffer | null;
  offersNearby: OfferPreview[];
  isLoading: boolean;
  sortingName: string;
  idFocusCard: string | null;
};

const initialState: InitialState = {
  city: 'Paris',
  offersPreview: [],
  reviewsOffer: [],
  detailedOffer: null,
  offersNearby: [],
  isLoading: false,
  sortingName: SortingOptions[0].name,
  idFocusCard: null,
};

export const offersSlice = createSlice({
  initialState,
  name: 'offers',
  reducers: {
    changeCity: (state, action: PayloadAction<CityName>) => {
      state.city = action.payload;
    },
    setSorting: (state, action: PayloadAction<string>) => {
      state.sortingName = action.payload;
    },
    setidFocusCard: (state, action: PayloadAction<string | null>) => {
      state.idFocusCard = action.payload;
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
      })
      .addCase(fetchDetailedOfferAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDetailedOfferAction.fulfilled, (state, action) => {
        state.isLoading = false;
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
      });
  },
  selectors: {
    city: (state) => state.city,
    offersPreview: (state) => state.offersPreview,
    reviewsOffer: (state) => state.reviewsOffer,
    detailedOffer: (state) => state.detailedOffer,
    offersNearby: (state) => state.offersNearby,
    isLoading: (state) => state.isLoading,
    idFocusCard: (state) => state.idFocusCard,
    showOffers: (state): OfferPreview[] => {
      const filteredOffers = getFilteredByCityOffers(state.offersPreview, state.city);
      const sortingFunction = SortingOptions.find(({ name }) => name === state.sortingName)?.functionSorting;

      return sortingFunction ? sortingFunction(filteredOffers) : filteredOffers;
    }
  }
});

export const offersSelectors = offersSlice.selectors;
export const offersActions = offersSlice.actions;
