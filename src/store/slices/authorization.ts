import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { getEmail } from '../../services/user-data';
import {
  fetchAuthorizationStatusAction,
  loginAction,
  logoutAction,
} from './api-actions/authorization';

type InitialState = {
  authorizationStatus: AuthorizationStatus;
  email: string;
};

const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  email: getEmail(),
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
        state.email = action.payload.email;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.email = 'unknown';
      });
  },
  selectors: {
    authorizationStatus: (state) => state.authorizationStatus,
    email: (state) => state.email,
    isAuth: (state) => state.authorizationStatus === AuthorizationStatus.Auth,
  }
});

export const authorizationSelectors = authorizationSlice.selectors;
export const authorizationActions = { ...authorizationSlice.actions, fetchAuthorizationStatusAction, loginAction, logoutAction };
