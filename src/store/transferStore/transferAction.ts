import axios from 'axios';
import { URI_API } from '../../const-Interface/const';
import { accountInfoSlice } from '../accountInfoStore/accountInfoSlice';
import { AppDispatch, AppGetState } from '../store';


/* eslint-disable no-unused-vars */
export const transferRequestAsync = (
    infoTransfer: {account: string, amount: string}
) =>
  (dispatch: AppDispatch, getState: AppGetState) => {
    const token = getState().token.token;
    const id = getState().info.info.account;

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
          dispatch(accountInfoSlice.actions.postTransferRequestError(data));
        } else {
          dispatch(
            accountInfoSlice.actions.postTransferRequestSuccess(data.payload)
          );
        }
      })
    ;
  };
