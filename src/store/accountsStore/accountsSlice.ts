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
    accountsRequest: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    accountsRequestSuccess: (state, action) => {
      console.log('action: ', action);
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

