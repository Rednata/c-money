/* eslint-disable no-unused-vars */
import moment from 'moment';
import { ITransaction } from '../const-Interface/interface';

export const countDate = (arr: ITransaction[], id: string, balance: number) => {
  // первый день стартового месяца
  const startDate = moment(new Date().setDate(1)).subtract(6, 'month').format();

  // срез массива с определнной даты + сортировка дат внутри
  const sliceArray = arr.filter((elem: {date: string}) =>
    moment(elem.date).format() >= startDate)
    .sort((a: {date: string}, b: {date: string}) => {
      console.log();
      return new Date(a.date) > new Date(b.date) ? 1 : -1;
    });

  let startDate1 =
    moment(startDate).add(1, 'month').date(1).format();

  let tempArr: ITransaction[] = [];
  const arrMonths: ITransaction[][] = [];
  let tempElem: ITransaction = { date: '', from: '', to: '', amount: 0 };

  sliceArray.forEach((elem: ITransaction) => {
    if (elem.date < startDate1) {
      if (tempElem.date) {
        tempArr.push(tempElem, elem);
        tempElem = { date: '', from: '', to: '', amount: 0 };
      } else {
        tempArr.push(elem);
      }
    } else {
      if (tempArr.length) {
        arrMonths.push(tempArr);
      }
      if (moment(elem.date).month() !== moment(startDate1).month()) {
        startDate1 = moment(startDate1).add(1, 'month').date(1).format();
        const currentElemDate = moment(elem.date).date(1).format();

        while (currentElemDate > startDate1) {
          arrMonths.push([
            { date: moment(startDate1).format(), amount: 0, from: '', to: '' }
          ]);
          startDate1 =
        moment(startDate1).add(1, 'month').date(1).format();
        }
        tempElem = { ...elem };
        tempArr = [];
      } else {
        tempArr = [];
        tempArr.push(elem);
        startDate1 = moment(startDate1).add(1, 'month').date(1).format();
      }
    }
    if (elem === sliceArray[sliceArray.length - 1]) {
      arrMonths.push(tempArr);
    }
  });

  let monthBalance = balance;
  const arrReverse = [...arrMonths].reverse();
  const sumMonths = arrReverse.map(
    (elem: ITransaction[]): {sum: number, month: number} => {
      const sum = elem.reduce(
        (acc: number, res: {from: string, amount: number}) => {
          console.log();
          return res.from === id ? acc - res.amount : acc + res.amount;
        }, 0);
      monthBalance -= sum;

      return (
        {
          sum: +monthBalance.toFixed(2),
          month: moment(elem[0].date).month()
        });
    });

  return sumMonths.reverse();
};

