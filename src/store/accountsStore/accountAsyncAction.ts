import axios from 'axios';
import { accountsSlice } from './accountsSlice';
import { URI_API } from '../../const/const';
import { accountInfoSlice } from '../accountInfoSlice/accountInfoSlice';

export const accountRequestAsync = (pathname: string) =>
  (dispatch: any, getState: any) => {
    const token = getState().token.token;
    console.log(pathname);
    if (pathname === 'accounts') {
      dispatch(accountsSlice.actions.accountsRequest());
    } else {
      dispatch(accountInfoSlice.actions.infoRequest());
    }

    axios(`${URI_API}${pathname}`, {
      headers: {
        Authorization: `Basic ${token}` }
    })
      .then(({ data }) => {
        console.log(data);
        if (pathname === 'accounts') {
          if (data.error) {
            dispatch(accountsSlice.actions.accountsRequestError(data.error));
          } else {
            console.log(data.payload);

            dispatch(
              accountsSlice.actions.accountsRequestSuccess(data.payload));
          }
        } else {
          if (data.error) {
            dispatch(accountInfoSlice.actions.infoRequestError(data.error));
          } else {
            dispatch(accountInfoSlice.actions.infoRequestSuccess(data.payload));
          }
        }
      });
  };

export const accountAddAsync = () => (dispatch: any, getState: any) => {
  const token = getState().token.token;

  dispatch(accountsSlice.actions.addAccountRequest());
  axios.post(`${URI_API}create-account`, {},
    {
      headers: {
        Authorization: `Basic ${token}` }
    })
    .then(({ data }) => {
      console.log(data);
      if (data.error) {
        dispatch(accountsSlice.actions.addAccountRequestSuccess(data.error));
      } else {
        console.log(data.payload);
        dispatch(accountsSlice.actions.addAccountRequestSuccess(data.payload));
      }
    });
};

