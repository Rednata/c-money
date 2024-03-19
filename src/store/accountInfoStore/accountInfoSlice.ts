import { createSlice } from '@reduxjs/toolkit';
import { IAccountInfo } from '../../const-Interface/interface';

const initialState: IAccountInfo = {
  isLoading: false,
  isSuccess: '',
  info: {
    account: '',
    balance: 0,
    date: '',
    mine: true,
    transactions: []
  },
  error: ''
};

export const accountInfoSlice = createSlice({
  name: 'accountInfo',
  initialState,
  reducers: {
    infoRequest: (state) => {
      state.isLoading = true;
      state.isSuccess = '';
      state.error = '';
    },
    infoRequestSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = '';
      state.info = action.payload;
      state.error = '';
    },
    infoRequestError: (state, action) => {
      state.isLoading = false;
      state.isSuccess = '';
      state.error = action.payload.error;
    },
    postTransferRequest: (state) => {
      state.isLoading = true;
      state.isSuccess = '';
      state.error = '';
    },
    postTransferRequestSuccess: (state, action) => {
      state.info = action.payload;
      state.isLoading = false;
      state.isSuccess = 'success';
      state.error = '';
    },
    postTransferRequestError: (state, action) => {
      state.isLoading = false;
      state.isSuccess = '';
      state.error = action.payload.error;
    },
  }
});

export default accountInfoSlice.reducer;
