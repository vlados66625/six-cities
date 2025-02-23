import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { State, AppDispatch } from '../types/state';
import { OfferPreview, DetailedOffer } from '../types/offer-types';
import { ReviewOffer } from '../types/review-offer';
import { APIRoute, DELETE_ERROR_TIMEOUT, AppRoute } from '../const';
import { UserAuth } from '../types/user-auth';
import { ResponseAuth } from '../types/response-auth';
import { setUserData, deleteUserData } from '../services/user-data';
import browserHistory from '../browser-history';
import { ReviewForm } from '../types/review-form';

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

export const fetchDetailedOfferAction = createAsyncThunk<DetailedOffer, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetchDetailedOffer',
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
  'offers/fetchOffersNearby',
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
  'offers/fetchReviewsOffer',
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
  'offers/reviewPost',
  async ({ offerId, comment, rating, cb }, { extra: api }) => {
    const { data } = await api.post<ReviewOffer>(`${APIRoute.Comments}/${offerId}`, { comment, rating: rating });
    cb();
    return data;
  },
  );

export const fetchAuthorizationStatusAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'authorization/fetchAuthorizationStatus',
  async (_arg, { extra: api }) => {
    await api.get(APIRoute.Login);
  },
);

export const loginAction = createAsyncThunk<ResponseAuth, UserAuth, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'authorization/login',
  async ({ email, password }, { extra: api }) => {
    const { data } = await api.post<ResponseAuth>(APIRoute.Login, { email, password });
    const { token } = data;
    setUserData(token, email);
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'authorization/logout',
  async (_arg, { extra: api }) => {
    await api.delete<ResponseAuth>(APIRoute.Logout);
    deleteUserData();
    browserHistory.push(AppRoute.Root);
  },
);

export const deleteErrorAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'error/deleteError',
  async () => {
    await new Promise((resolve) => setTimeout(resolve, DELETE_ERROR_TIMEOUT));
  },
);

