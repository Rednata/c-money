import { createSlice } from '@reduxjs/toolkit';

interface IAccounts {
  accounts: any;
  error: string;
  isLoading: boolean;
}[];

const initialState: IAccounts = {
  accounts: {},
  error: '',
  isLoading: false
};

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    addAccountRequest: (state) => {
      state.isLoading = true;
    },
    addAccountRequestSuccess: (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.accounts.push(action.payload);
    },
    addAccountRequestError: (state, action) => {
      state.isLoading = false;
      console.log('action: ', action);
    },
    accountsRequest: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    accountsRequestSuccess: (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.accounts = action.payload;
    },
    accountsRequestError: (state, action) => {
      console.log('action: ', action);
      state.isLoading = false;
    },
  }
});

export default accountsSlice.reducer;

