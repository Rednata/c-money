import axios from 'axios';
import { URI_API } from '../../const-Interface/const';
import { tokenSlice } from './tokenSlice';
import { AppDispatch } from '../store';

export const tokenMiddleware = () => (next: any) =>
  (action: any) => {
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
  (dispatch: AppDispatch) => {
    dispatch(tokenSlice.actions.tokenRequest());
    axios.post(`${URI_API}login`, {
      login: data.login,
      password: data.password,
    })
      .then(({ data }) => {
        if (data.error) {
          dispatch(tokenSlice.actions.tokenRequestError(data.error));
        } else {
          dispatch(tokenSlice.actions.tokenRequestSuccess(data.payload));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
