export interface IToken {
  token: string;
  error: string;
  isLoading: boolean;
}

export interface IAccountItem {
  account: string;
  date: string;
  balance: number;
  mine: boolean;
  transactions: [];
}

export interface IAccounts {
  accounts: IAccountItem[];
  error: string;
  isLoading: boolean;
}[];

export interface IAccountInfo {
  isLoading: boolean;
  isSuccess: 'success' | '';
  error: string;
  info: IAccountItem;
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
