import { useEffect, useState } from 'react';
import { Container } from '../Container/Container';
import style from './Exchange.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/hooksStore';
import {
  getCurrencyRequestAsync, postCurrencyRequestAsync
} from '../../store/currencyStore/currencyAction';
import { formatSum } from '../../utils/fomatSum';
import { Modal } from '../Modal/Modal';
import { WebsocketInfo } from '../WebsocketInfo/WebsocketInfo';
import { getToken } from '../../hooks/storeToken';
import { tokenSlice } from '../../store/tokenStore/tokenSlice';
// import { Loader } from '../Loader/Loader';

export const Exchange = () => {
  const dispatch = useAppDispatch();
  const [showErrorModal, setshowErrorModal] = useState(false);
  const isSuccess = useAppSelector(state => state.currency.isSuccess);
  const errorMessage = useAppSelector(state => state.currency.error);

  const token = getToken();
  const [
    showSuccessTransferModal, setShowSuccessTransferModal
  ] = useState(false);

  const [valueSelect, setValueSelect] =
    useState<{from: string, to: string, amount: number }>(
      { from: 'AUD', to: 'ETH', amount: 0 }
    );

  // type elem = {
  // elem: string | {code: string, amount: number}
  // elem: [string, {code: string, amount: number}]
  // };

  const allCurrency = useAppSelector(state => state.currency.allCurrency);
  const userCurrency = Object
    .entries(useAppSelector(state => state.currency.userCurrency))
    .map((elem: any[]) => {
    // .map((elem: (string | {code: string, amount: number})[]) => {
      console.log('elem: ', elem);
      // .map((elem: {amount: number, code: string}) => {
      const { amount, code } = elem[1];
      return ([elem[0], amount, code]);
    });

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    dispatch(postCurrencyRequestAsync(valueSelect));
  };

  const handleChange = (e: React.ChangeEvent<EventTarget>) => {
    if (e.target instanceof HTMLSelectElement) {
      if (e.target.id === 'from') {
        setValueSelect({ ...valueSelect, from: e.target.value });
      } else {
        setValueSelect({ ...valueSelect, to: e.target.value });
      }
    } else if (e.target instanceof HTMLInputElement) {
      setValueSelect({ ...valueSelect, amount: Number(e.target.value) });
    }
  };

  const handleClickFrom = (e: React.MouseEvent<HTMLElement>) => {
    console.log();
    if (e.currentTarget.dataset.name) {
      setValueSelect({ ...valueSelect, from: e.currentTarget.dataset.name });
    }
  };

  useEffect(() => {
    if (errorMessage) {
      setshowErrorModal(true);
      setTimeout(() => {
        setshowErrorModal(false);
      }, 2000);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (isSuccess) {
      setShowSuccessTransferModal(true);
      setTimeout(() => {
        setShowSuccessTransferModal(false);
      }, 2000);
    }
  }, [isSuccess]);

  useEffect(() => {
    dispatch(tokenSlice.actions.updateToken(token));
    dispatch(getCurrencyRequestAsync('all-currencies'));
    dispatch(getCurrencyRequestAsync('currencies'));
  }, []);

  return (
    <Container>
      <h2 className={style.title}>Обмен валюты</h2>
      <div className={style.wrap}>
        <WebsocketInfo />
        <form
          className={style.form}
          onSubmit={handleSubmit}
        >
          {showErrorModal && <Modal text={errorMessage} />}
          {showSuccessTransferModal &&
            <Modal text='Перевод успешно отправлен' />
          }

          <fieldset className={style.fieldset}>
            <legend className={style.formTitle}>
            Обмен валюты
            </legend>
            {/* <div className={style.innerForm}> */}
            <div className={style.wrapLabel}>
              <label className={style.label} htmlFor='from'>Откуда</label>
              <select
                name=""
                id="from"
                className={style.select}
                onChange={handleChange}
                value={valueSelect.from}
              >
                {
                  userCurrency.map(elem => (
                    <option
                      className={style.option}
                      value={elem[0]}
                      key={Math.random().toString(16).slice(2, 10)}
                    >{elem[0]}
                    </option>)
                  )
                }
              </select>
            </div>
            <div className={style.wrapLabel}>
              <label className={style.label} htmlFor='for'>Куда</label>
              <select
                name=""
                id="for"
                className={style.select}
                onChange={handleChange}
                value={valueSelect.to}
              >
                {
                  allCurrency.map(elem => (
                    <option
                      className={style.option}
                      value={elem}
                      key={Math.random().toString(16).slice(2, 10)}
                    >{elem}
                    </option>)
                  )
                }
              </select>
            </div>

            <div className={style.wrapLabel}>
              <label className={style.label}>Сумма</label>
              <input
                className={style.input}
                type="number"
                min='1'
                required
                onChange={handleChange}
              />
            </div>
            {/* </div> */}

          </fieldset>
        </form>

        <div className={style.myCurrency}>
          <ul className={style.titleCurrency}>
            {
              userCurrency.map(elem => (
                <li
                  key={Math.random().toString(16).slice(2, 10)}
                  className={style.itemCurrency}>
                  <button
                    className={style.myCurrencyBtn}
                    onClick={handleClickFrom}
                    data-name={elem[0]}
                  >
                    <span className={style.nameCurrency}>{elem[0]}</span>
                    <span className={style.amountCurrency}>
                      {`${formatSum(elem[1])} ${elem[2]}`}
                    </span>
                  </button>
                  {/* <p className={style.nameCurrency}>{elem[0]}
                  </p>
                  <span className={style.amountCurrency}>
                    {`${formatSum(elem[1])} ${elem[2]}`}
                  </span> */}
                </li>
              ))
            }

          </ul>
        </div>
      </div>
    </Container>
  );
};
