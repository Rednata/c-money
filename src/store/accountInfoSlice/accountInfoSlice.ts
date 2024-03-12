import { createSlice } from '@reduxjs/toolkit';
import { IAccount } from '../accountsStore/accountsSlice';

interface IAccountInfo {
  isLoading: boolean;
  info: IAccount;
  error: string;
}

const initialState: IAccountInfo = {
  isLoading: false,
  info: {
    account: '',
    balance: 0,
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
    },
    infoRequestSuccess: (state, action) => {
      state.isLoading = false;
      state.info = action.payload;
      console.log(action);
    },
    infoRequestError: (state, action) => {
      console.log(action);
      state.isLoading = false;
    },
    postTransferRequest: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    postTransferRequestSuccess: (state, action) => {
      state.isLoading = false;
      state.error = '';
    },
    postTransferRequestError: (state, action) => {
      console.log('action: ', action.payload.error);
      state.isLoading = false;
      state.error = action.payload.error;
    },
  }
});

export default accountInfoSlice.reducer;
