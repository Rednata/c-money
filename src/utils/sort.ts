export const funcSort = (valueSort: string, listAccounts: any) => {
  const copyListAccounts = [...listAccounts];

  if (valueSort === 'По балансу') {
    copyListAccounts.sort((a: {balance: number}, b: {balance: number}) => {
      console.log();
      return b.balance >= a.balance ? -1 : 1;
    });
  } else if (valueSort === 'По карте') {
    copyListAccounts.sort((a: {account: string}, b: {account: string}) => {
      console.log();
      return Number(b.account) >= Number(a.account) ? -1 : 1;
    });
  } else if (valueSort === 'По дате') {
    copyListAccounts.sort((a: {date: Date}, b: {date: Date}) => {
      console.log();
      return (b.date) >= (a.date) ? -1 : 1;
    });
  }
  return copyListAccounts;
};
