import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { State, AppDispatch } from '../../../types/state';
import { APIRoute, AppRoute } from '../../../const';
import { UserAuth } from '../../../types/user-auth';
import { ResponseAuth } from '../../../types/response-auth';
import { setUserData, deleteUserData } from '../../../services/user-data';
import browserHistory from '../../../browser-history';

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
