import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAccountItem, IAccounts } from '../../const-Interface/interface';

const initialState: IAccounts = {
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
    addAccountRequestSuccess: (state, action: PayloadAction<IAccountItem>) => {
      state.isLoading = false;
      state.error = '';
      state.accounts.push(action.payload);
    },
    addAccountRequestError: (state, action) => {
      state.isLoading = false;
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
      state.isLoading = false;
    },
    sortAccounts: (state, action) => {
      state.accounts = action.payload;
      state.error = '';
    }
  },
}
);

export default accountsSlice.reducer;

