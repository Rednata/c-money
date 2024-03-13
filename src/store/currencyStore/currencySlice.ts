import { createSlice } from '@reduxjs/toolkit';

interface ICurrency {
  allCurrency: string[];
  userCurrency: string[];
  isLoading: boolean;
  error: string;
}

const initialState: ICurrency = {
  allCurrency: [],
  userCurrency: [],
  isLoading: false,
  error: ''
};

export const allCurrencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    currencyRequest: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    getAllCurrencyRequestSuccess: (state, action) => {
      state.isLoading = false;
      state.allCurrency = action.payload;
      state.error = '';
    },
    // getAllCurrencyRequestError: () => {},
    getUserCurrencyRequestSuccess: (state, action) => {
      state.isLoading = false;
      state.userCurrency = action.payload;
      state.error = '';
    },
    // getUserCurrencyRequestError: () => {},
    postUserCurrencyRequestSuccess: (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.userCurrency = action.payload;
    },
    postUserCurrencyRequestError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    }
  }
});

export default allCurrencySlice.reducer;
