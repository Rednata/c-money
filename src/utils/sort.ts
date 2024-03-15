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
  } else {
    for (let i = 0; i < copyListAccounts.length; i++) {
      for (let j = i + 1; j < copyListAccounts.length; j++) {
        if (copyListAccounts[i].transactions.length === 0 &&
          copyListAccounts[j].transactions.length === 0
        ) {
          continue;
        } else if (copyListAccounts[i].transactions.length === 0) {
          const temp = copyListAccounts[j];
          copyListAccounts[j] = { ...copyListAccounts[i] };
          copyListAccounts[i] = { ...temp };
        } else if (copyListAccounts[j].transactions.length === 0) {
          const temp = copyListAccounts[j];
          copyListAccounts[j] = { ...copyListAccounts[i] };
          copyListAccounts[i] = { ...temp };
        } else if (new Date(copyListAccounts[i].transactions[0].date) >
          new Date(copyListAccounts[j].transactions[0].date)) {
          const temp = copyListAccounts[j];
          copyListAccounts[j] = { ...copyListAccounts[i] };
          copyListAccounts[i] = { ...temp };
        }
      }
    }
  }
  return copyListAccounts;
};
