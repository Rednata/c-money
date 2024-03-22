import axios from 'axios';
import { URI_API } from '../../const-Interface/const';
import { allCurrencySlice } from './currencySlice';
import { AppDispatch, AppGetState } from '../store';

export const getCurrencyRequestAsync = (param: string) =>
  (dispatch: AppDispatch, getState: AppGetState) => {
    const token = getState().token.token;
    dispatch(allCurrencySlice.actions.currencyRequest());

    axios(`${URI_API}${param}`, {
      headers: {
        Authorization: `Basic ${token}` }
    })
      .then(({ data }) => {
        if (param === 'all-currencies') {
          dispatch(
            allCurrencySlice.actions.getAllCurrencyRequestSuccess(
              data.payload));
        } else {
          dispatch(
            allCurrencySlice.actions.getUserCurrencyRequestSuccess(
              data.payload));
        }
      });
  };

export const postCurrencyRequestAsync = (
    valueSelect: {from: string, to: string, amount: number}) =>
  (dispatch: AppDispatch, getState: AppGetState) => {
    const token = getState().token.token;
    dispatch(allCurrencySlice.actions.currencyRequest());
    axios.post(`${URI_API}currency-buy`, {
      from: valueSelect.from,
      to: valueSelect.to,
      amount: valueSelect.amount,
    }, {
      headers: {
        Authorization: `Basic ${token}`
      }
    })
      .then(({ data }) => {
        if (data.error) {
          dispatch(allCurrencySlice.actions.postUserCurrencyRequestError(data));
        } else {
          dispatch(
            allCurrencySlice.actions.postUserCurrencyRequestSuccess(
              data.payload
            )
          );
        }
      });
  };
