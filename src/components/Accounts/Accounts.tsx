import style from './Accounts.module.scss';

import { Button } from '../Button/Button';
import { Container } from '../Container/Container';
import { ItemAccount } from './ItemAccount/ItemAccount';


import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooksStore';
import {
  accountAddAsync, accountRequestAsync
} from '../../store/accountsStore/accountAsyncAction';
import {
  IAccount, accountsSlice
} from '../../store/accountsStore/accountsSlice';
import { tokenSlice } from '../../store/tokenStore/tokenSlice';
import { funcSort } from '../../utils/sort';
import { SelectList } from '../SelectList/SelectList';

export const Accounts = () => {
  const token = useAppSelector(state => state.token.token) ||
  localStorage.getItem('token');
  const dispatch = useAppDispatch();

  const listAccounts = useAppSelector(state => state.accounts.accounts);

  // Добавление нового счета
  const handleClick = () => {
    dispatch(accountAddAsync());
  };

  useEffect(() => {
    console.log('UseEffect 3333333');
    dispatch(tokenSlice.actions.updateToken(token));
    dispatch(accountRequestAsync('accounts'));
    // if (!isLoading || listAccounts) {
    if (listAccounts) {
      const newSortList = funcSort('По дате', listAccounts);
      dispatch(accountsSlice.actions.sortAccounts(newSortList));
    }
  }, []);

  return (
    <>
      <Container>
        <div className={style.wrapAccounts}>
          <div className={style.wrapTitle}>
            <p className={style.title}>Здравствуйте, Guest!</p>
            <Button
              cn='btnAccounts'
              text='Открыть новый счет'
              type='button'
              func={handleClick}
            />
          </div>
          <div className={style.wrapTitleAccounts}>
            <h2 className={style.titleAccounts}>Мои счета</h2>
            <div className={style.wrapSort}>
              <p className={style.titleSort}>Сортировка:</p>
              <div className={style.wrapSortList}>
                <SelectList />
              </div>

            </div>
          </div>

          <ul className={style.listAccounts}>
            {listAccounts.map((item: IAccount) => (
              <ItemAccount
                key={Math.random().toString(16).slice(2, 8)} data={item}
              />
            )
            )}
          </ul>
        </div>

      </Container>
    </>

  );
};
