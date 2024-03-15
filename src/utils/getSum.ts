import { ITransaction } from '../const-Interface/interface';

export const getSum = (arr: ITransaction[], id: string): number[] => {
  const income = arr.reduce(
    (acc, elem: {amount: number, from: string}): number => {
      if (elem.from !== id) {
        return acc + elem.amount;
      } else return acc;
    }, 0);
  const spending = arr.reduce(
    (acc, elem: {amount: number, from: string}): number => {
      if (elem.from === id) {
        return acc - elem.amount;
      } else return acc;
    }, 0);
  return [Math.round(income), Math.round(spending)];
};
