/* eslint-disable no-unused-vars */
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooksStore';
import {
  accountRequestAsync
} from '../../store/accountsStore/accountAsyncAction';
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
  postTransferRequestAsync
} from '../../store/postTransferSlice/postTransferAction';
import { ErrorModal } from '../ErrorModal/ErrorModal';
import { formatSum } from '../../utils/fomatSum';
import { LineChart } from '../Charts/LineChart';
import { ITransaction } from '../../const-Interface/interface';


export const AccountInfo = () => {
  const id = useLocation().hash.slice(1);

  const errorTransfer = useAppSelector(state => state.info.error);
  const [showErrorModal, setshowErrorModal] = useState(false);
  const [infoTransfer, setInfoTransfer] = useState({ account: '', amount: 0 });

  const [balanceItems, setBalanceItems] = useState<number[]>([0, 0]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    navigate('/accounts');
  };

  const data = useAppSelector(state => state.info.info);
  const balance = useAppSelector(state => state.info.info.balance);

  const transactionsAll = data.transactions;
  const transactionsHistory = transactionsAll.slice(-10).reverse();

  let dataLineChart = [{ sum: 0, month: Number(new Date()) }];
  if (transactionsAll.length >= 1) {
    dataLineChart = countDate(transactionsAll, id, balance);
  }

  const handleClickStatic = (
      e: React.MouseEvent<HTMLButtonElement>) => {
    const currentDate = new Date();
    let arr: ITransaction[] = [];
    if (e.currentTarget.textContent === 'Неделя') {
      arr = transactionsAll
        .filter((elem: {date: Date}) =>
          moment(elem.date) >= moment(currentDate).subtract(7, 'days'));
    } else if (e.currentTarget.textContent === 'Месяц') {
      arr = transactionsAll
        .filter((elem: {date: Date}) =>
          moment(elem.date) >= moment(currentDate).subtract(24, 'month'));
    } else {
      arr = transactionsAll
        .filter((elem: {date: Date}) =>
          moment(elem.date) >= moment(currentDate).subtract(3, 'year'));
    }
    setBalanceItems(getSum(arr, id));
  };

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    dispatch(postTransferRequestAsync(infoTransfer));
    console.warn('errorTransfer: ', errorTransfer);
  };

  const handleChange = (e: React.ChangeEvent<EventTarget>) => {
    if (e.target instanceof HTMLInputElement) {
      if (e.target.id === 'account') {
        setInfoTransfer({ ...infoTransfer, account: e.target.value });
      } else if (e.target.id === 'amount') {
        setInfoTransfer({ ...infoTransfer, amount: Number(e.target.value) });
      }
    }
  };

  useEffect(() => {
    if (errorTransfer) {
      setshowErrorModal(true);
      setTimeout(() => {
        setshowErrorModal(false);
      }, 1500);
    }
  }, [errorTransfer]);

  useEffect(() => {
    dispatch(accountRequestAsync(`account/${id}`));
  }, []);

  const classNameAmount = (!balanceItems[0] && !balanceItems[1] ?
    'textTransparent' : 'textColor');
  return (
    <Container>
      <div className={style.wrapTitle}>
        <h1 className={style.title}>{`Счет №${id}`}</h1>
        <Button text='Вернуться' type='button' cn='btnBack' func={handleClick}/>
      </div>
      <div className={style.wrap}>
        <div className={style.chart}>
          <LineChart dataInput={dataLineChart} />
        </div>
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
              <div className={style.wrapValue}>
                <p className={style[classNameAmount]}>
                  {formatSum(balanceItems[0] + balanceItems[1])
                  } &#8381;</p>
                <p className={style[classNameAmount]}>
                  {}
                  {formatSum(balanceItems[0])
                  } &#8381;
                </p>
                <p className={style[classNameAmount]}>
                  {formatSum(balanceItems[1])
                  } &#8381;</p>
              </div>
            </div>
          </div>
          <ChartLine />
        </div>

      </div>
      <div className={style.transfer}>
        <h2 className={style.title}>Перевод</h2>
        {showErrorModal && <ErrorModal text={errorTransfer} />}
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.labelWrap}>
            <label htmlFor='account' className={style.label} />Счет
            <input
              className={style.input}
              type="text"
              id='account'
              required
              onChange={handleChange}
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
            />
          </div>

          <Button
            cn='btnTransfer'
            text='Перевести'
            type="submit"/>
        </form>

      </div>

    </Container>
  );
};
