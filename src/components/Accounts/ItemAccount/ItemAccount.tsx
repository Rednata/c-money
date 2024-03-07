/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import { formatDate } from '../../../utils/formatDate';
import style from './ItemAccount.module.scss';

export interface ITransaction {
  amount: number;
  date: Date;
  from: string;
  to: string;
}

type Props = {
  data: {
    account: string;
    date: Date;
    balance: number;
    transactions: ITransaction[];
  }
}

export const ItemAccount = ({ data }: Props) => {
  const {
    account,
    date,
    balance,
    transactions,
  } = data;

  // const lastDate = transactions[0].date

  return (
    <li className={style.account}>
      <Link to={`/accounts/acc#${account}`}>
        <p className={style.numAccount}>{account}</p>
        <p className={style.balance}>{
          (new Intl.NumberFormat('ru-RU').format(balance))
        } &#8381;</p>
        <div className={style.wrapDates}>
          <div className="">
            <p>открыт</p>
            <p>{formatDate(date)}</p>
          </div>
          <div className="">
            <p>последняя операция</p>
            <p>Нет данных</p>
          </div>
        </div>
      </Link>
    </li>
  );
};
