import { CityName } from '../../const';
import { OfferPreview } from '../../types/offer-types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getFilteredByCityOffers, SortingOptions } from '../../util';
import {
  fetchOffersPreviewAction,
} from './api-actions/offers';

type InitialState = {
  city: CityName;
  offersPreview: OfferPreview[];
  isLoadingOffers: boolean;
  sortingName: string;
};

const initialState: InitialState = {
  city: 'Paris',
  offersPreview: [],
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
      });
  },
  selectors: {
    city: (state) => state.city,
    offersPreview: (state) => state.offersPreview,
    isLoadingOffers: (state) => state.isLoadingOffers,
    showOffers: (state): OfferPreview[] => {
      const filteredOffers = getFilteredByCityOffers(state.offersPreview, state.city);
      const sortingFunction = SortingOptions.find(({ name }) => name === state.sortingName)?.functionSorting;

      return sortingFunction ? sortingFunction(filteredOffers) : filteredOffers;
    }
  }
});

export const offersSelectors = offersSlice.selectors;
export const offersActions = { ...offersSlice.actions, fetchOffersPreviewAction };
