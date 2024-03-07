/* eslint-disable no-unused-vars */
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooksStore';
import {
  accountRequestAsync
} from '../../store/accountsStore/accountAsyncAction';
import { Container } from '../Container/Container';
import style from './AccountInfo.module.scss';
import { Button } from '../Button/Button';

import { Chart1 } from './Chart/Chart';
import { useEffect, useState } from 'react';
import { formatDate } from '../../utils/formatDate';
import { countDate } from '../../utils/countDate';

import { ChartLine } from '../Charts/LineChart';
import { DoughnutChart } from '../Charts/DoughnutChart';
import moment from 'moment';
import { ITransaction } from '../Accounts/ItemAccount/ItemAccount';
import { getSum } from '../../utils/getSum';
// import { ITransaction } from '../Accounts/ItemAccount/ItemAccount';

export const AccountInfo = () => {
  const id = useLocation().hash.slice(1);

  const [balanceItems, setBalanceItems] = useState<number[]>([0, 0]);
  console.log('balanceItems: ', balanceItems);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    navigate('/accounts');
  };

  const data = useAppSelector(state => state.info.info);
  const balance = useAppSelector(state => state.info.info.balance);

  const transactionsAll = data.transactions;
  const transactionsHistory = transactionsAll.slice(-10).reverse();
  if (transactionsAll.length >= 1) {
    const dataLineChart = countDate(transactionsAll, id, balance);
    console.log('dataLineChart: ', dataLineChart);
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

  useEffect(() => {
    dispatch(accountRequestAsync(`account/${id}`));
  }, []);

  return (
    <Container>
      <div className={style.wrapTitle}>
        <h1 className={style.title}>{`Счет №${id}`}</h1>
        <Button text='Вернуться' type='button' cn='btnBack' func={handleClick}/>
      </div>
      <div className={style.wrap}>
        <div className={style.chart}>
          <Chart1 />
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
          <h2 className={style.titleStatic}>Статистика</h2>
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
                <p>
                  {(new Intl.NumberFormat('ru-RU')
                    .format(balanceItems[0] + balanceItems[1]))
                  } &#8381;</p>
                <p>
                  {(new Intl.NumberFormat('ru-RU')
                    .format(balanceItems[0]))
                  } &#8381;
                </p>
                <p>
                  {(new Intl.NumberFormat('ru-RU')
                    .format(balanceItems[1]))
                  } &#8381;</p>
              </div>
            </div>
          </div>
          <ChartLine />
        </div>

      </div>

    </Container>
  );
};
