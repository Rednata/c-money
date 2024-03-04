import axios from 'axios';
import { accountsSlice } from './accountsSlice';
import { URI_API } from '../../const/const';

export const accountRequestAsync = () => (dispatch: any, getState: any) => {
  const token = getState().token.token;

  dispatch(accountsSlice.actions.accountsRequest());
  axios(`${URI_API}/accounts`, {
    headers: {
      Authorization: `Basic ${token}` }
  })
    .then(({ data }) => {
      console.log(data);
      if (data.error) {
        dispatch(accountsSlice.actions.accountsRequestError(data.error));
      } else {
        dispatch(accountsSlice.actions.accountsRequestSuccess(data.payload));
      }
    });
};

export const accountAddAsync = () => (dispatch: any, getState: any) => {
  const token = getState().token.token;

  dispatch(accountsSlice.actions.addAccountRequest());
  axios.post(`${URI_API}/create-account`, {},
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

