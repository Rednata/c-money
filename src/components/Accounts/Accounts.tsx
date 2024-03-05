/* eslint-disable no-unused-vars */
import { Button } from '../Button/Button';
import { Container } from '../Container/Container';
import { ItemAccount } from './ItemAccount/ItemAccount';

import style from './Accounts.module.scss';

import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooksStore';
import {
  accountAddAsync, accountRequestAsync
} from '../../store/accountsStore/accountAsyncAction';
import { accountsSlice } from '../../store/accountsStore/accountsSlice';
import { tokenSlice } from '../../store/tokenStore/tokenSlice';
import { funcSort } from '../../utils/sort';

export const Accounts = () => {
  const token = useAppSelector(state => state.token.token) ||
  localStorage.getItem('token');
  const dispatch = useAppDispatch();

  const [isVisible, setIsvisible] = useState(true);
  const listAccounts = useAppSelector(state => state.accounts.accounts);
  const isLoading = useAppSelector(state => state.accounts.isLoading);

  // Логика для отображения сортировки
  const [valueSort, setValueSort] = useState('По дате');
  const [isActivebtnSort, setisActivebtnSort] = useState(false);
  const commonSortList = [
    'По дате', 'По балансу', 'По карте', 'По дате транзакции'
  ];
  const [sortList, setSortList] = useState(
    commonSortList.filter(item => item !== valueSort));

  const sortHandleClick = () => {
    setisActivebtnSort(!isActivebtnSort);
  };

  const handleChoiceSort = (e: React.MouseEvent<HTMLLIElement>) => {
    if (e.currentTarget.textContent) {
      setValueSort(e.currentTarget.textContent);
      setisActivebtnSort(!isActivebtnSort);
    }
  };

  // Добавление нового счета
  const handleClick = () => {
    dispatch(accountAddAsync());
  };

  // Плавное исчезновение надписи об авторизации
  useEffect(() => {
    console.log('UseEffect 22222');
    const id = setTimeout(() => {
      setIsvisible(false);
    }, 1500);
    return () => {
      clearTimeout(id);
    };
  }, []);

  useEffect(() => {
    console.log('UseEffect 3333333');
    dispatch(tokenSlice.actions.updateToken(token));

    dispatch(accountRequestAsync('accounts'));
    // if (!isLoading || listAccounts) {
    //   const newSortList = funcSort(valueSort, listAccounts);
    //   dispatch(accountsSlice.actions.sortAccounts(newSortList));
    // }
  }, []);

  useEffect(() => {
    console.log('UseEffect 1111');
    setSortList(commonSortList.filter(item => item !== valueSort));
    console.log('1');
    console.log('isLoading: ', isLoading);
    console.log('listAccounts.length: ', listAccounts.length);
    if (isLoading || !listAccounts.length) return;
    console.log('2');
    const newSortList = funcSort(valueSort, listAccounts);
    dispatch(accountsSlice.actions.sortAccounts(newSortList));
  }, [valueSort]);


  return (
    <>
      {isVisible ?
        (<p className={style.textSuccess}>Вы успешно авторизовались</p>
        ) : (
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
                    <button className={isActivebtnSort ?
                      style.activeBtnSort : style.btnSort}
                    onClick={sortHandleClick}>
                      {valueSort} &#9660;
                    </button>
                    {isActivebtnSort && (
                      <ul className={style.sortList} >
                        {sortList.map(item => (
                          <li className={style.sortItem}
                            onClick={handleChoiceSort}
                            key={Math.random().toString(16).slice(2, 8)}
                          >{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              <ul className={style.listAccounts}>
                {listAccounts.map((item: any) => (
                  <ItemAccount
                    key={Math.random().toString(16).slice(2, 8)} data={item}
                  />
                )
                )}
              </ul>
            </div>

          </Container>
      )}
    </>

  );
};
