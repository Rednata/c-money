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
    },
    getAllCurrencyRequestSuccess: (state, action) => {
      state.isLoading = false;
      state.allCurrency = action.payload;
    },
    // getAllCurrencyRequestError: () => {},
    getUserCurrencyRequestSuccess: (state, action) => {
      state.isLoading = false;
      state.userCurrency = action.payload;
    },
    // getUserCurrencyRequestError: () => {},
  }
});

export default allCurrencySlice.reducer;
