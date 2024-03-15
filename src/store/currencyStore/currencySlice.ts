import { createSlice } from '@reduxjs/toolkit';
import { ICurrency } from '../../const-Interface/interface';

const initialState: ICurrency = {
  allCurrency: [],
  userCurrency: [],
  isLoading: false,
  error: '',
  isSuccess: false,
};

export const allCurrencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    currencyRequest: (state) => {
      state.isLoading = true;
      state.error = '';
      state.isSuccess = false;
    },
    getAllCurrencyRequestSuccess: (state, action) => {
      state.isLoading = false;
      state.allCurrency = action.payload;
      state.error = '';
      state.isSuccess = false;
    },
    // getAllCurrencyRequestError: () => {},
    getUserCurrencyRequestSuccess: (state, action) => {
      state.isLoading = false;
      state.userCurrency = action.payload;
      state.error = '';
      state.isSuccess = false;
    },
    // getUserCurrencyRequestError: () => {},
    postUserCurrencyRequestSuccess: (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.userCurrency = action.payload;
      state.isSuccess = true;
    },
    postUserCurrencyRequestError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
      state.isSuccess = false;
    }
  }
});

export default allCurrencySlice.reducer;
