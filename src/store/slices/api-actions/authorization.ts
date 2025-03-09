import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { State, AppDispatch } from '../../../types/state';
import { APIRoute } from '../../../const';
import { UserAuth } from '../../../types/user-auth';
import { ResponseAuth } from '../../../types/response-auth';
import { setUserData, deleteUserData } from '../../../services/user-data';

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
    const { token, name, avatarUrl } = data;
    setUserData(token, name, avatarUrl);
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
  },
);
