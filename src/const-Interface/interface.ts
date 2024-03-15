
export interface IAccount {
  account: string;
  date: string;
  balance: number;
  mine: boolean;
  transactions: [];
}

export interface IArrayAccounts {
  accounts: IAccount[];
  error: string;
  isLoading: boolean;
}[];

export interface IAccountInfo {
  isLoading: boolean;
  info: IAccount;
  error: string;
}

export interface ICurrency {
  allCurrency: string[];
  userCurrency: string[];
  isLoading: boolean;
  error: string;
  isSuccess: boolean;
}

export interface ITransaction {
  amount: number;
  date: string;
  from: string;
  to: string;
}

export interface IToken {
  token: string;
  error: string;
  isLoading: boolean;
  temp: string;
}
