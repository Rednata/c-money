import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAccount {
  account: string;
  date: Date;
  balance: number;
  mine: boolean;
  transactions: [];
}

interface IArrayAccounts {
  accounts: IAccount[];
  error: string;
  isLoading: boolean;
}[];

const initialState: IArrayAccounts = {
  accounts: [],
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
    addAccountRequestSuccess: (state, action: PayloadAction<IAccount>) => {
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
    sortAccounts: (state, action) => {
      state.accounts = action.payload;
      state.isLoading = false;
      state.error = '';
    }
  },
}
);

export default accountsSlice.reducer;

