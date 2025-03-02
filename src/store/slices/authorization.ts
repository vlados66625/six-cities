import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { getUserName, getAvatarUrl } from '../../services/user-data';
import {
  fetchAuthorizationStatusAction,
  loginAction,
  logoutAction,
} from './api-actions/authorization';

type InitialState = {
  authorizationStatus: AuthorizationStatus;
  userName: string;
  avatarUrl: string;
};

const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userName: getUserName(),
  avatarUrl: getAvatarUrl(),
};

export const authorizationSlice = createSlice({
  initialState,
  name: 'authorization',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthorizationStatusAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(fetchAuthorizationStatusAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userName = action.payload.name;
        state.avatarUrl = action.payload.avatarUrl;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userName = '';
        state.avatarUrl = '';
      });
  },
  selectors: {
    authorizationStatus: (state) => state.authorizationStatus,
    userName: (state) => state.userName,
    avatarUrl: (state) => state.avatarUrl,
    isAuth: (state) => state.authorizationStatus === AuthorizationStatus.Auth,
  }
});

export const authorizationSelectors = authorizationSlice.selectors;
export const authorizationActions = { ...authorizationSlice.actions, fetchAuthorizationStatusAction, loginAction, logoutAction };
