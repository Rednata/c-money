// import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { tokenSlice } from './tokenSlice';
// import { createAsyncThunk } from '@reduxjs/toolkit';

export const tokenMiddleware = (store: any) => (next: any) => (action: any) => {
  console.log('action: ', action);
  if (action.type === 'token/updateToken') {
    localStorage.setItem('token', action.payload);
  }
  next(action);
};

interface IAuth {
  login: string;
  password: string;
}

export const tokenRequestAsync = (data: IAuth) =>
  (dispatch: any) => {
    dispatch(tokenSlice.actions.tokenRequest());
    axios.post('http://localhost:3000/login', {
      login: data.login,
      password: data.password,
    })
      .then(({ data }) => {
        console.log(data);
        if (data.error) {
          dispatch(tokenSlice.actions.tokenRequestError(data.error));
        } else {
          dispatch(tokenSlice.actions.tokenRequestSuccess(data.payload));
        }
      })
      .catch(error => {
        if (error.response) {
          console.warn(error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log(error.message);
        }

        // dispatch(tokenSlice.actions.tokenRequestError(err));
      });
  };


// export const authRequestAsync =
//   createAsyncThunk<string, data: {login: string, password: string}>(
//     'auth/fetch',
//     (data) => {
//       console.log(data);
//       return axios.post('http://localhost:3000/login', {
//         login: data.login,
//         password: data.password,
//       })
//         .then(res => res);
//     }
//   );
