import axios from 'axios';
import { URI_API } from '../../const-Interface/const';
import { accountInfoSlice } from '../accountInfoStore/accountInfoSlice';

export const accountInfoRequestAsync = (id: string) =>
  (dispatch: any, getState: any) => {
    const token = getState().token.token;
    dispatch(accountInfoSlice.actions.infoRequest());

    axios(`${URI_API}account/${id}`, {
      headers: {
        Authorization: `Basic ${token}` }
    })
      .then(({ data }) => {
        if (data.error) {
          dispatch(accountInfoSlice.actions.infoRequestError(data.error));
        } else {
          dispatch(accountInfoSlice.actions.infoRequestSuccess(data.payload));
        }
      });
  };
