import axios from 'axios';
import { URI_API } from '../../const-Interface/const';
import { accountInfoSlice } from '../accountInfoSlice/accountInfoSlice';

/* eslint-disable no-unused-vars */
export const postTransferRequestAsync = (
    infoTransfer: {account: string, amount: number}
) =>
  (dispatch: any, getState: any) => {
    const token = getState().token.token;
    console.log('token: ', token);
    const id = getState().info.info.account;
    console.log('infoTransfer: ', infoTransfer);

    dispatch(accountInfoSlice.actions.postTransferRequest());
    axios.post(`${URI_API}transfer-funds`, {
      from: id,
      to: infoTransfer.account,
      amount: infoTransfer.amount
    }, {
      headers: {
        Authorization: `Basic ${token}` }
    })
      .then(({ data }) => {
        if (data.error) {
          console.log(data);
          dispatch(accountInfoSlice.actions.postTransferRequestError(data));
        } else {
          dispatch(accountInfoSlice.actions.postTransferRequestSuccess(data));
        }
      })
    ;
  };
