/* eslint-disable no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tokenRequestAsync } from './tokenAsyncAction';

interface IToken {
  token: string;
  error: string;
  isLoading: boolean;
  temp: string;
}

const initialState: IToken = {
  token: '',
  error: '',
  isLoading: false,
  temp: 'start'
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    updateToken: (state, action) => {
      state.token = action.payload;
    },
    tokenRequest: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    tokenRequestSuccess: (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.token = action.payload.token;
    },
    tokenRequestError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default tokenSlice.reducer;
