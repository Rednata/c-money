/* eslint-disable no-unused-vars */
import moment from 'moment';
import { ITransaction } from '../const-Interface/interface';

export const countDate = (arr: any, id: string, balance: number) => {
  // первый день стартового месяца
  const startDate = moment(new Date().setDate(1)).subtract(6, 'month').format();

  // срез массива с определнной даты + сортировка дат внутри
  const sliceArray = arr.filter((elem: {date: string}) =>
    moment(elem.date).format() >= startDate)
    .sort((a: {date: Date}, b: {date: Date}) => {
      console.log();
      return a.date > b.date ? 1 : -1;
    });

  let startDate1 =
    moment(startDate).add(1, 'month').date(1).format();

  let tempArr: any[] = [];
  const arrMonths: any[] = [];
  let tempElem = { date: '' };

  sliceArray.forEach((elem: {date: string, amount: number}) => {
    if (elem.date < startDate1) {
      if (tempElem.date) {
        tempArr.push(tempElem, elem);
        tempElem = { date: '' };
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
            { date: moment(startDate1).format(), amount: 0 }
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
  console.log(arrMonths);

  let monthBalance = balance;
  const arrReverse = [...arrMonths].reverse();
  const sumMonths = arrReverse.map(
    (elem: any): {sum: number, month: number| string} => {
      console.log();
      const sum = elem.reduce(
        (acc: number, res: {from: string, amount: number}) => {
          console.log();
          return res.from === id ? acc - res.amount : acc + res.amount;
        }, 0);
      monthBalance -= sum;
      console.log('sum: ', sum);
      console.log('monthBalance: ', monthBalance);
      return (
        {
          sum: +monthBalance.toFixed(2),
          month: moment(elem[0].date).month()
        });
    });

  return sumMonths.reverse();
};

