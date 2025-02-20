import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { State, AppDispatch } from '../types/state';
import { OfferPreview } from '../types/offer-types';
import { APIRoute, DELETE_ERROR_TIMEOUT } from '../const';
import { UserAuth } from '../types/user-auth';
import { ResponseAuth } from '../types/response-auth';
import { setToken, deleteToken } from '../services/token';

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

export const fetchAuthorizationStatusAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetchAuthorizationStatus',
  async (_arg, { extra: api }) => {
    await api.get(APIRoute.Login);
  },
);

export const loginAction = createAsyncThunk<ResponseAuth, UserAuth, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/login',
  async ({ email, password }, { extra: api }) => {
    const { data } = await api.post<ResponseAuth>(APIRoute.Login, { email, password });
    const { token } = data;
    setToken(token);
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/logout',
  async (_arg, { extra: api }) => {
    await api.delete<ResponseAuth>(APIRoute.Logout);
    deleteToken();
  },
);

export const deleteErrorAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/deleteError',
  async () => {
    await new Promise((resolve) => setTimeout(resolve, DELETE_ERROR_TIMEOUT));
  },
);

