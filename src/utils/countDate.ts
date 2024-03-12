/* eslint-disable no-unused-vars */
import moment from 'moment';

export const countDate = (arr: any, id: string, balance: number) => {
  console.log('arr: ', arr);
  const startDate = moment(new Date().setDate(1))
    .subtract(5, 'months').format();
  const sliceArray = arr.filter((elem: {date: Date}) =>
    moment(elem.date).format() >= startDate);
  console.log('sliceArray: ', sliceArray);

  let startMonth = moment(sliceArray[0].date).month();
  // let currentMonth: number;
  // if (new Date(arr[0].date) > new Date(startDate)) {
  //   currentMonth = moment(new Date(arr[0].date)).month();
  // } else {
  //   currentMonth = startMonth;
  // }

  console.log('startMonth: ', startMonth);

  let sum = 0;
  const sumMonth = sliceArray.reduce(
    (acc: any[], elem: {date: Date, from: string, amount: number}) => {
      if (moment(elem.date).month() === startMonth) {
        sum = elem.from === id ? sum - elem.amount : sum + elem.amount;
      } else {
        acc.push({ sum, month: startMonth - 1 });
        startMonth = moment(elem.date).month();
        sum = elem.amount;
      }
      if (elem === sliceArray[sliceArray.length - 1]) {
        acc.push({ sum, month: moment(elem.date).month() - 1 });
      }
      return acc;
    }, [])
    .map((elem: {sum: number}) =>
      ({ ...elem, sum: Number((balance - elem.sum).toFixed(2)) }));
  sumMonth.push({ sum: balance, month: new Date().getMonth() });
  console.log('sumMonth: ', sumMonth);
};


