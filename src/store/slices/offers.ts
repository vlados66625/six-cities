import { CityName } from '../../const';
import { OfferPreview } from '../../types/offer-types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getFilteredByCityOffers, SortingOptions } from '../../util';
import {
  fetchOffersPreviewAction,
  fetchFavoriteOffersAction,
  setFavoriteOfferAction,
} from './api-actions/offers';
import { logoutAction } from './api-actions/authorization';
import { createSelector } from '@reduxjs/toolkit';

type InitialState = {
  city: CityName;
  offersPreview: OfferPreview[];
  favoritesOffers: OfferPreview[];
  isLoadingOffers: boolean;
  sortingName: string;
};

const initialState: InitialState = {
  city: 'Paris',
  offersPreview: [],
  favoritesOffers: [],
  isLoadingOffers: false,
  sortingName: SortingOptions[0].name,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersPreviewAction.pending, (state) => {
        state.isLoadingOffers = true;
      })
      .addCase(fetchOffersPreviewAction.fulfilled, (state, action) => {
        state.isLoadingOffers = false;
        state.offersPreview = action.payload;
      })
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.isLoadingOffers = true;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.isLoadingOffers = false;
        state.favoritesOffers = action.payload;
      })
      .addCase(setFavoriteOfferAction.fulfilled, (state, action) => {
        if (action.payload.offerIsFavorite) {
          state.favoritesOffers.push(action.payload.offer);
        } else {
          state.favoritesOffers = state.favoritesOffers.filter((favoritesOffer) => favoritesOffer.id !== action.payload.offer.id);
        }
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.favoritesOffers = [];
      });
  },
  selectors: {
    city: (state) => state.city,
    offersPreview: (state) => state.offersPreview,
    favoritesOffers: (state) => state.favoritesOffers,
    favoritesOffersCount: (state) => state.favoritesOffers.length,
    isLoadingOffers: (state) => state.isLoadingOffers,
    showOffers: createSelector(
      [
        (state: InitialState) => state.offersPreview,
        (state: InitialState) => state.city,
        (state: InitialState) => state.sortingName
      ],
      (offersPreview, city, sortingName): OfferPreview[] => {
        const filteredOffers = getFilteredByCityOffers(offersPreview, city);
        const sortingFunction = SortingOptions.find(({ name }) => name === sortingName)?.functionSorting;
        return sortingFunction ? sortingFunction(filteredOffers) : filteredOffers;
      }
    )
  }
});

export const offersSelectors = offersSlice.selectors;
export const offersActions = {
  ...offersSlice.actions,
  fetchOffersPreviewAction,
  fetchFavoriteOffersAction,
  setFavoriteOfferAction,
};
