import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { State, AppDispatch } from '../../../types/state';
import { DELETE_ERROR_TIMEOUT } from '../../../const';

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

