/* eslint-disable no-unused-vars */
import moment from 'moment';
// moment().format();

export const countDate = (arr: any, id: string, balance: number) => {
  // const d = useAppSelector(state => state.info);
  // console.log('arr: ', arr);
  const dateEnd = arr[arr.length - 1].date;
  console.log('dateEnd: ', dateEnd);
  const dateStart = moment(new Date(dateEnd).setDate(1)).subtract(5, 'months');
  console.log('dateStart: ', dateStart);

  const newArr = arr.filter((item: {date: Date}) =>
    moment(item.date) >= dateStart);
  console.log('newArr: ', newArr);

  let month = moment(dateStart).month();
  let arrTemp: {date: Date, from: string, amount: number}[] = [];
  const arrMonths: {date: Date, from: string, amount: number}[][] = [];

  newArr.forEach((elem: {date: Date, from: string, amount: number}) => {
    if (moment(elem.date).month() === month) {
      arrTemp.push(elem);
      if (elem === newArr[newArr.length - 1]) {
        arrMonths.push(arrTemp);
      }
    } else {
      month = moment(elem.date).month();
      arrMonths.push(arrTemp);
      arrTemp = [];
    }
  });

  const arrSumMonths = arrMonths.map(item => {
    const sum = item.reduce(
      (acc: number, elem: {from: string, amount: number}) => {
        console.log();
        return elem.from === id ? acc - elem.amount : acc + elem.amount;
      }, 0);
    return sum + balance;
  });
  console.log('arrSumMonths: ', arrSumMonths);
  return arrSumMonths;
};


