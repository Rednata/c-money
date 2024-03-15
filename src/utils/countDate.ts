/* eslint-disable no-unused-vars */
import moment from 'moment';
import { ITransaction } from '../const-Interface/interface';

export const countDate = (arr: any, id: string, balance: number) => {
  const startDate = moment(new Date().setDate(1))
    .subtract(5, 'months').format();

  // срез массива с определнной даты + сортировка дат внутри
  const sliceArray = arr.filter((elem: {date: Date}) =>
    moment(elem.date).format() >= startDate)
    .sort((a: {date: Date}, b: {date: Date}) => {
      console.log();
      return a.date > b.date ? 1 : -1;
    });
  console.log('sliceArray: ', sliceArray);


  const arrOfMonths = sliceArray
    .reduce((
        acc: ITransaction[][],
        elem: ITransaction, i: number, arr: ITransaction[]) => {
      const tempArr: ITransaction[] = [];
      if (arr[i + 1]) {
        console.log(new Date(arr[i].date).getMonth());
        console.log(new Date(arr[i + 1].date).getMonth());
        if (
          new Date(arr[i].date).getMonth() ===
          new Date(arr[i + 1].date).getMonth()
        ) {
          console.log('===========');

          tempArr.push(arr[i]);
        } else {
          console.log('tempArr: ', tempArr);
          acc.push(tempArr);
          if (elem === arr[arr.length - 1]) {
            acc.push(tempArr);
          }
        //   tempArr = [];
        }
      }

      // acc.push(tempArr);
      return acc;
    }, []);

  console.log('arrOfMonths: ', arrOfMonths);
  return [];
};

// export const countDate2 = (arr: any, id: string, balance: number) => {
//   const startDate = moment(new Date().setDate(1))
//     .subtract(5, 'months').format();
//   const sliceArray1 = arr.filter((elem: {date: Date}) =>
//     moment(elem.date).format() >= startDate);

//   const sliceArray = sliceArray1.sort((a: {date: Date}, b: {date: Date}) => {
//     console.log();
//     return a.date > b.date ? 1 : -1;
//   });
//   console.log('sliceArray: ', sliceArray);
//   let tempDate = moment(sliceArray[0].date).startOf('month').add(1, 'month');
//   console.log('tempDate: ', tempDate.format());

//   console.warn(moment('2023-12-01T12:30:16.799Z').format());

//   let sum = 0;
// const tempDate = moment(startDate).add(1, 'month').format();
// console.log('startDate: ', startDate);
// console.log('tempDate: ', tempDate);
// let count = 0;
// const sumMonth = sliceArray.reduce(
//   (acc: any[], elem: {date: Date, from: string, amount: number}) => {
//     if (moment(elem.date) < moment(tempDate)) {
//       sum = elem.from === id ? sum - elem.amount : sum + elem.amount;
//       if (count <= 2) {
//         console.log(count, tempDate.format(), elem);
//       }
//     } else {
//       count++;
//       acc.push({ sum, month: moment(elem.date).month() });
//       tempDate = moment(tempDate).add(count, 'month');
//       console.log('tempDate: ', tempDate.format());
//       // tempDate = moment(elem.date).startOf('month').add(1, 'month');
//     }
//     if (elem === sliceArray[sliceArray.length - 1]) {
//       acc.push({ sum, month: moment(elem.date).month() });
//     }
//     return acc;
//   }, []);

// const sumMonth1 = sliceArray.reduce(
//   (acc: any[], elem: {date: Date, from: string, amount: number}) => {
//     if (moment(elem.date).month() === startMonth) {
//       sum = elem.from === id ? sum - elem.amount : sum + elem.amount;
//     } else {
//       acc.push({ sum, month: moment(elem.date).month() });
//       // console.log(new Date(elem.date), sum);
//       // console.log('!!!!!!!!!!', moment(elem.date),
//       //   'startMonth======', startMonth);

//       const date1 = moment(elem.date).startOf('month').format();
//       const date2 = moment(elem.date)
//         .month(startMonth).startOf('month').format();
//       console.log('date1: ', date1, 'date2: ', date2);

//       // if ((moment(elem.date).month() - startMonth) > 1) {
//       //   console.log('!!!!!!!!!!', moment(elem.date).month());
//       // }
//       startMonth = moment(elem.date).month();
//       sum = elem.amount;
//     }
//     if (elem === sliceArray[sliceArray.length - 1]) {
//       acc.push({ sum, month: moment(elem.date).month() });
//     }
//     return acc;
//   }, []);

// const diff = balance - sumMonth
//   .reduce((acc: number, elem: {sum: number}) => acc + elem.sum, 0);
// const resultMonth = sumMonth
//   .map((elem: {sum: number}) => ({ ...elem, sum: elem.sum + diff }));
// console.log('resultMonth: ', resultMonth);
// .map((elem: {sum: number}) =>
//   ({ ...elem, sum: Number((balance - elem.sum).toFixed(2)) }));
// sumMonth.push({ sum: balance, month: new Date().getMonth() });

// console.log('sumMonth: ', sumMonth);
// return sumMonth;
// return [];
// };


