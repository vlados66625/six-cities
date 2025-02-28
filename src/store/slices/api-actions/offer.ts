import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { State, AppDispatch } from '../../../types/state';
import { OfferPreview, DetailedOffer } from '../../../types/offer-types';
import { ReviewOffer } from '../../../types/review-offer';
import { APIRoute } from '../../../const';
import { ReviewForm } from '../../../types/review-form';

export const fetchDetailedOfferAction = createAsyncThunk<DetailedOffer, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/fetchDetailedOffer',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<DetailedOffer>(`${APIRoute.Offers}/${offerId}`);
    return data;
  },
);

export const fetchOffersNearbyAction = createAsyncThunk<OfferPreview[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/fetchOffersNearby',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<OfferPreview[]>(`${APIRoute.Offers}/${offerId}/nearby`);
    return data;
  },
);

export const fetchReviewsOfferAction = createAsyncThunk<ReviewOffer[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/fetchReviewsOffer',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<ReviewOffer[]>(`${APIRoute.Comments}/${offerId}`);
    return data;
  },
);

export const reviewPostAction = createAsyncThunk<ReviewOffer, ReviewForm & { offerId: string; cb: () => void }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/reviewPost',
  async ({ offerId, comment, rating, cb }, { extra: api }) => {
    const { data } = await api.post<ReviewOffer>(`${APIRoute.Comments}/${offerId}`, { comment, rating: rating });
    cb();
    return data;
  },);

export const setFavoriteOfferAction = createAsyncThunk<{ offer: OfferPreview; offerIsFavorite: boolean }, { offerId: string; offerIsFavorite: boolean }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/setFavoriteOffer',
  async ({ offerId, offerIsFavorite }, { extra: api }) => {
    const { data: offer } = await api.post<OfferPreview>(`${APIRoute.Favorite}/${offerId}/${Number(offerIsFavorite)}`);
    return { offer, offerIsFavorite };
  },);
