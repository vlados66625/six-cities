import { CityName } from '../../const';
import { OfferPreview } from '../../types/offer-types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getFavoritesOffers, getFilteredByCityOffers, SortingOptions } from '../../util';
import {
  fetchOffersPreviewAction,
  fetchFavoriteOffersAction,
  setFavoriteOfferAction,
} from './api-actions/offers';

type InitialState = {
  city: CityName;
  offersPreview: OfferPreview[];
  favoritesOffers: OfferPreview[];
  isLoadingOffers: boolean;
  sortingName: string;
  diffFavoritesOffers: number;
};

const initialState: InitialState = {
  city: 'Paris',
  offersPreview: [],
  favoritesOffers: [],
  isLoadingOffers: false,
  sortingName: SortingOptions[0].name,
  diffFavoritesOffers: 0,
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
        if (action.payload) {
          state.diffFavoritesOffers += 1;
        } else {
          state.diffFavoritesOffers -= 1;
        }
      });
  },
  selectors: {
    city: (state) => state.city,
    offersPreview: (state) => state.offersPreview,
    favoritesOffers: (state) => state.favoritesOffers,
    favoritesOffersCount: (state) => getFavoritesOffers(state.offersPreview).length + state.diffFavoritesOffers,
    isLoadingOffers: (state) => state.isLoadingOffers,
    showOffers: (state): OfferPreview[] => {
      const filteredOffers = getFilteredByCityOffers(state.offersPreview, state.city);
      const sortingFunction = SortingOptions.find(({ name }) => name === state.sortingName)?.functionSorting;

      return sortingFunction ? sortingFunction(filteredOffers) : filteredOffers;
    }
  }
});

export const offersSelectors = offersSlice.selectors;
export const offersActions = {
  ...offersSlice.actions,
  fetchOffersPreviewAction,
  fetchFavoriteOffersAction,
  setFavoriteOfferAction,
};
