/* eslint-disable no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IToken {
  token: string;
  error: string;
  isLoading: boolean;
}

const initialState: IToken = {
  token: '',
  error: '',
  isLoading: false,
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    tokenRequest: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    tokenRequestSuccess: (state, action) => {
      console.log('action: ', action);
      state.isLoading = false;
      state.error = '';
      state.token = action.payload.token;
    },
    tokenRequestError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateToken: (state, action) => {
      state.token = action.payload.token;
    }
  }
});

export default tokenSlice.reducer;
