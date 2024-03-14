/* eslint-disable no-unused-vars */

export const formatDate = (date: string) =>
  new Intl.DateTimeFormat('ru-RU').format(new Date(date));

