import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooksStore';
import {
  accountRequestAsync
} from '../../store/accountsStore/accountAsyncAction';
import { Container } from '../Container/Container';
import style from './AccountInfo.module.scss';
import { Button } from '../Button/Button';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Chart } from 'chart.js';
// import { Doughnut } from 'react-chartjs-2';
import { Chart1 } from './Chart/Chart';
import { useEffect } from 'react';
import { formatDate } from '../../utils/formatDate';

export const AccountInfo = () => {
  const id = useLocation().hash.slice(1);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleClick = () => {
    navigate('/accounts');
  };

  useEffect(() => {
    dispatch(accountRequestAsync(`account/${id}`));
  }, []);

  const data = useAppSelector(state => state.info.info);

  const transactionsAll = data.transactions;
  const transactionsHistory = transactionsAll.slice(-10).reverse();
  console.log('transactions: ', transactionsHistory);

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
        <div className={style.static}>static</div>

      </div>

    </Container>
  );
};
