import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import {
  deleteErrorAction,
} from './api-actions/error';

type InitialState = {
  error: string | null;
};

const initialState: InitialState = {
  error: null,
};

export const errorSlice = createSlice({
  initialState,
  name: 'error',
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteErrorAction.fulfilled, (state) => {
        state.error = null;
      });
  },
  selectors: {
    error: (state) => state.error,
  }
});

export const errorSelectors = errorSlice.selectors;
export const errorActions = { ...errorSlice.actions, deleteErrorAction };
