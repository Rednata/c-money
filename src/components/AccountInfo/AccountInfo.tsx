/* eslint-disable no-unused-vars */
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooksStore';
import { Container } from '../Container/Container';
import style from './AccountInfo.module.scss';
import { Button } from '../Button/Button';

import { useEffect, useState } from 'react';
import { formatDate } from '../../utils/formatDate';
import { countDate } from '../../utils/countDate';

import { ChartLine } from '../Charts/LineChart1';
import { DoughnutChart } from '../Charts/DoughnutChart';
import moment from 'moment';
import { getSum } from '../../utils/getSum';
import {
  transferRequestAsync
} from '../../store/transferStore/transferAction';
import { Modal } from '../Modal/Modal';
import { formatSum } from '../../utils/fomatSum';
import { LineChart } from '../Charts/LineChart';
import { ITransaction } from '../../const-Interface/interface';
import { useEffectShowModal } from '../../hooks/useEffectShowModal';
import { getSavedToken } from '../../utils/getSavedToken';
import { tokenSlice } from '../../store/tokenStore/tokenSlice';
import {
  accountInfoRequestAsync
} from '../../store/accountInfoStore/accountInfoAction';
import { Loader } from '../Loader/Loader';
import {
  accountInfoSlice
} from '../../store/accountInfoStore/accountInfoSlice';

export const AccountInfo = () => {
  const id = useLocation().hash.slice(1);
  const token = getSavedToken();

  const errorMessage = useAppSelector(state => state.info.error);
  const showModalError = useEffectShowModal(errorMessage);
  const successMessage = useAppSelector(state => state.info.isSuccess);
  const showModalSuccess = useEffectShowModal(successMessage);
  const isLoading = useAppSelector(state => state.info.isLoading);

  const [dataTransfer, setDataTransfer] = useState({ account: '', amount: '' });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [balanceItems, setBalanceItems] = useState<number[]>([0, 0]);
  const transactions = useAppSelector(state => state.info.info.transactions);
  const balance = useAppSelector(state => state.info.info.balance);

  const transactionsHistory = transactions.slice(-10).reverse();

  // let dataLineChart = [{ sum: 0, month: Number(new Date()) }];
  let dataLineChart: {sum: number, month: number}[] = [];
  if (transactions.length >= 1) {
    dataLineChart = countDate(transactions, id, balance);
  }

  const handleClickStatic = (
      e: React.MouseEvent<HTMLButtonElement>) => {
    const currentDate = new Date();
    let arr: ITransaction[] = [];
    if (e.currentTarget.textContent === 'Неделя') {
      arr = transactions
        .filter((elem: {date: Date}) =>
          moment(elem.date) >= moment(currentDate).subtract(7, 'days'));
    } else if (e.currentTarget.textContent === 'Месяц') {
      arr = transactions
        .filter((elem: {date: Date}) =>
          moment(elem.date) >= moment(currentDate).subtract(24, 'month'));
    } else {
      arr = transactions
        .filter((elem: {date: Date}) =>
          moment(elem.date) >= moment(currentDate).subtract(3, 'year'));
    }
    setBalanceItems(getSum(arr, id));
  };

  const handleClick = () => {
    navigate('/accounts');
  };

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    dispatch(transferRequestAsync(dataTransfer));
    setDataTransfer({ account: '', amount: '' });
  };

  const handleChange = (e: React.ChangeEvent<EventTarget>) => {
    if (e.target instanceof HTMLInputElement) {
      if (e.target.id === 'account') {
        setDataTransfer({ ...dataTransfer, account: e.target.value });
      } else if (e.target.id === 'amount') {
        setDataTransfer({ ...dataTransfer, amount: (e.target.value) });
      }
    }
  };

  useEffect(() => {
    dispatch(tokenSlice.actions.updateToken(token));
    dispatch(accountInfoRequestAsync(id));

    return () => {
      dispatch(accountInfoSlice.actions.infoRequestRemove());
    };
  }, []);

  const classNameAmount = (!balanceItems[0] && !balanceItems[1] ?
    'textTransparent' : 'textColor');
  return (
    <Container>
      <div className={style.wrapInfo}>
        <div className={style.wrapTitle}>
          <h1 className={style.infoTitle}>{`Счет №${id}`}</h1>
          <div className={style.wrapBtnBack}>
            <Button
              text='Вернуться' type='button' cn='btnBack' func={handleClick}/>
          </div>
        </div>
        <div className={style.wrap}>
          <div className={style.chart}>
            <p className={style.chartTitle}>Динамика</p>
            {
              (!isLoading && !dataLineChart.length) ? <p>Нет данных</p> : (
                !isLoading ?
                (<LineChart dataInput={dataLineChart} balance={balance}/>
                ) : (
                  <Loader />
                )
              )
            }

          </div>
          {
            !isLoading ? (
              <div className={style.history}>
                <table cellSpacing={24} className={style.table}>
                  <thead className={style.thead}>
                    <tr>
                      <th>Счет</th>
                      <th>Сумма</th>
                      <th>Дата</th>
                    </tr>
                  </thead>
                  <tbody className={style.tbody}>
                    {transactionsHistory.map(({ date, from, amount }) =>
                      (
                        <tr
                          className={style.tr}
                          key={Math.random().toString(16).slice(2, 8)}>
                          <td>{from}</td>
                          {from === id ?
                          (<td className={style.amountColor}>-{amount}</td>
                          ) : (
                          <td>+{amount}</td>)
                          }
                          <td>{formatDate(date)}</td>
                        </tr>
                      )
                    )}
                  </tbody>

                </table>
              </div>
            ) : (
              <Loader />
            )
          }

          <div className={style.static}>
            <h2 className={style.title}>Статистика</h2>
            <div className={style.staticWrap}>

              <div className={style.btnWrap}>
                <button
                  className={style.staticBtn}
                  onClick={handleClickStatic}
                >Неделя
                </button>
                <button
                  className={style.staticBtn}
                  onClick={handleClickStatic}
                >Месяц</button>
                <button
                  className={style.staticBtn}
                  onClick={handleClickStatic}
                >Год</button>
              </div>
              <div className={style.DoughnutChart}>

                <DoughnutChart balanceItems={balanceItems}/>
                {/* <div className={style.noData}>Нет данных</div> */}

              </div>

              <div className={style.wrapValue}>

                <div className={style.valueName}>
                  <span className={style.labelName}>Баланс</span>
                  <span className={style[classNameAmount]}>
                    { formatSum(balanceItems[0] + balanceItems[1])
                    } &#8381;
                  </span>
                </div>
                <div className={style.valueNameIncome}>
                  <span className={style.labelName}>Доходы</span>
                  <span className={style[classNameAmount]}>
                    {formatSum(balanceItems[0])
                    } &#8381;
                  </span>
                </div>
                <div className={style.valueNameSpending}>
                  <span className={style.labelName}>Расходы</span>
                  <span className={style[classNameAmount]}>
                    {formatSum(balanceItems[1])
                    } &#8381;
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>
        <div className={style.transfer}>
          <h2 className={style.title}>Перевод</h2>
          {
            showModalError && <Modal text={errorMessage} />
          }
          {
            showModalSuccess && <Modal text='Перевод выполнен успешно' />
          }
          <form className={style.form} onSubmit={handleSubmit}>
            <div className={style.labelWrap}>
              <label htmlFor='account' className={style.label} />Счет
              <input
                className={style.input}
                type="text"
                id='account'
                required
                onChange={handleChange}
                value={dataTransfer.account}
              />
            </div>
            <div className={style.labelWrap}>
              <label htmlFor='amount' className={style.label} />Сумма
              <input
                className={style.input}
                type="number"
                id='amount'
                required
                pattern="[0123456789]"
                min="1"
                onChange={handleChange}
                value={dataTransfer.amount}
              />
            </div>

            <div className={style.btnInputWrap}>
              <Button
                cn='btnTransfer'
                text='Перевести'
                type="submit"/>
            </div>
          </form>

        </div>
      </div>

    </Container>
  );
};
