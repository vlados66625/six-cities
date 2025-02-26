import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { State, AppDispatch } from '../../../types/state';
import { OfferPreview } from '../../../types/offer-types';
import { APIRoute } from '../../../const';


export const fetchOffersPreviewAction = createAsyncThunk<OfferPreview[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetchOffersPreview',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<OfferPreview[]>(APIRoute.Offers);
    return data;
  },
);

export const fetchFavoriteOffersAction = createAsyncThunk<OfferPreview[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetchFavoriteOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<OfferPreview[]>(APIRoute.Favorite);
    return data;
  },
);

export const setFavoriteOfferAction = createAsyncThunk<boolean, { offerId: string; offerIsFavorite: boolean; setIsFavorite: (isFavorite: boolean) => void }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/setFavoriteOffer',
  async ({ offerId, offerIsFavorite, setIsFavorite }, { extra: api }) => {
    await api.post<OfferPreview>(`${APIRoute.Favorite}/${offerId}/${Number(offerIsFavorite)}`);
    setIsFavorite(offerIsFavorite);
    return offerIsFavorite;
  },);

