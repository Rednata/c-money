import { useEffect } from 'react';
import { Container } from '../Container/Container';
import style from './Exchange.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/hooksStore';
import {
  getCurrencyRequestAsync
} from '../../store/currencyStore/currencyAction';
import { formatSum } from '../../utils/fomatSum';
// import { Loader } from '../Loader/Loader';

export const Exchange = () => {
  const dispatch = useAppDispatch();
  const allCurrency = useAppSelector(state => state.currency.allCurrency);
  const userCurrency = Object
    .entries(useAppSelector(state => state.currency.userCurrency))
    .map((elem: any) => {
      const { amount, code } = elem[1];
      return ([elem[0], amount, code]);
    });

  useEffect(() => {
    dispatch(getCurrencyRequestAsync('all-currencies'));
    dispatch(getCurrencyRequestAsync('currencies'));
  }, []);

  return (
    <Container>
      <h2 className={style.title}>Обмен валюты</h2>
      <div className={style.wrap}>
        <div className={style.websocket}>
        Изменение курса в режиме реального времени
        </div>
        <div className={style.wrapForm}>
          <form className={style.form}>
            <fieldset className={style.fieldset}>
              <legend className={style.formTitle}>
              Обмен валюты
              </legend>
              <div className={style.wrapLabel}>
                <label className={style.label}>Откуда</label>
                <select name="" id="" className={style.select}>
                  {
                    userCurrency.map(elem => (
                      <option
                        className={style.option}
                        value=""
                        key={Math.random().toString(16).slice(2, 10)}
                      >{elem[0]}
                      </option>)
                    )
                  }
                </select>
              </div>
              <div className={style.wrapLabel}>
                <label className={style.label}>Куда</label>
                <select name="" id="" className={style.select}>
                  {
                    allCurrency.map(elem => (
                      <option
                        className={style.option}
                        value=""
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
                />
              </div>
            </fieldset>

          </form>
          <div className={style.myCurrency}>
            <ul className={style.titleCurrency}>
              {
                userCurrency.map(elem => (
                  <li
                    key={Math.random().toString(16).slice(2, 10)}
                    className={style.itemCurrency}>
                    <p className={style.nameCurrency}>{elem[0]}
                    </p>
                    <span className={style.amountCurrency}>
                      {`${formatSum(elem[1])} ${elem[2]}`}
                    </span>
                  </li>
                ))
              }

            </ul>
          </div>
        </div>

      </div>
    </Container>
  );
};
