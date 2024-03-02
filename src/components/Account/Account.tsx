/* eslint-disable no-unused-vars */
import style from './Account.module.scss';

type Props = {
  data: {
    account: string;
    date: Date;
    balance: number;
    transactions: [];
  }
}

export const Account = ({ data }: Props) => {
  const {
    account,
    date,
    balance,
    transactions
  } = data;

  return (
    <li className={style.account}>
      <p className={style.numAccount}>{account}</p>
      <p className={style.balance}>{
        (new Intl.NumberFormat('ru-RU').format(balance))
      } &#8381;</p>
      {/* <p className={style.balance}>{balance}</p> */}
      <div className={style.wrapDates}>
        <div className="">
          <p>открыт</p>
          <p>date Open</p>
        </div>
        <div className="">
          <p>последняя операция</p>
          <p>date Last</p>
        </div>
      </div>
    </li>
  );
};
