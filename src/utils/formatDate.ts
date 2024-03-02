/* eslint-disable no-unused-vars */

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('ru-RU').format(new Date(date));

