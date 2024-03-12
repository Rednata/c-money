export const formatSum = (sum: number) =>
  (new Intl.NumberFormat('ru-RU')
    .format(sum));
