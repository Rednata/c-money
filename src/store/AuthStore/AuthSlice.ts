import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAuth {
  auth: {
    login: string;
    password: string;
  }
}

const initialState: IAuth = {
  auth: {
    login: '',
    password: ''
  }
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    inputAuth:
      (state, action: PayloadAction<{login: string, password: string}>) => {
        state.auth = action.payload;
      }
  }
});

export default AuthSlice.reducer;
