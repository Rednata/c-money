import { useEffect, useState } from 'react';
import { Container } from '../Container/Container';
import style from './Exchange.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/hooksStore';
import {
  getCurrencyRequestAsync, postCurrencyRequestAsync
} from '../../store/currencyStore/currencyAction';
import { formatSum } from '../../utils/fomatSum';
import { ErrorModal } from '../ErrorModal/ErrorModal';
// import { Loader } from '../Loader/Loader';

export const Exchange = () => {
  const dispatch = useAppDispatch();
  const [showErrorModal, setshowErrorModal] = useState(false);
  const errorMessage = useAppSelector(state => state.currency.error);

  const [valueSelect, setValueSelect] =
    useState<{from: string, to: string, amount: number }>(
      { from: 'AUD', to: 'ETH', amount: 0 }
    );

  const allCurrency = useAppSelector(state => state.currency.allCurrency);
  const userCurrency = Object
    .entries(useAppSelector(state => state.currency.userCurrency))
    .map((elem: any) => {
      const { amount, code } = elem[1];
      return ([elem[0], amount, code]);
    });

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    console.log(valueSelect);
    dispatch(postCurrencyRequestAsync(valueSelect));
  };

  const handleChange = (e: React.ChangeEvent<EventTarget>) => {
    if (e.target instanceof HTMLSelectElement) {
      console.log(123);
      if (e.target.id === 'from') {
        setValueSelect({ ...valueSelect, from: e.target.value });
      } else {
        setValueSelect({ ...valueSelect, to: e.target.value });
      }
    } else if (e.target instanceof HTMLInputElement) {
      setValueSelect({ ...valueSelect, amount: Number(e.target.value) });
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
    dispatch(getCurrencyRequestAsync('all-currencies'));
    dispatch(getCurrencyRequestAsync('currencies'));
  }, []);

  return (
    <Container>
      <h2 className={style.title}>Обмен валюты</h2>
      <div className={style.wrap}>
        <div className={style.websocket}>
          <p className={style.websocketTitle}>
            Изменение курса в режиме реального времени
          </p>
          <ul className={style.websocketList}>
            <li className={style.websocketItem}>
              <div className={style.nameCarrencies}>
                <span className={style.name1}>AUD/</span>
                <span className={style.name2}>BTC</span>
              </div>
              <div className={style.hr}></div>
              <div className="courseCurrency">4,754</div>
            </li>
            <li className={style.websocketItem}>
              <div className={style.nameCarrencies}>
                <span className={style.name1}>BTC/</span>
                <span className={style.name2}>BYR</span>
              </div>
              <div className={style.hr}></div>
              <div className="courseCurrency">23,2383</div>
            </li>
            <li className={style.websocketItem}>
              <div className={style.nameCarrencies}>
                <span className={style.name1}>BYR/</span>
                <span className={style.name2}>AUD</span>
              </div>
              <div className={style.hr}></div>
              <div className="courseCurrency">-7.34</div>
            </li>
          </ul>
        </div>
        <div className={style.wrapForm}>
          <form
            className={style.form}
            onSubmit={handleSubmit}
          >
            {showErrorModal && <ErrorModal text={errorMessage} />}
            <fieldset className={style.fieldset}>
              <legend className={style.formTitle}>
              Обмен валюты
              </legend>
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
