/* eslint-disable no-unused-vars */
import { Button } from '../Button/Button';
import { Container } from '../Container/Container';
import style from './Accounts.module.scss';
// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks/hooksStore';
import { Account } from '../Account/Account';

export const Accounts = () => {
  const [isVisible, setIsvisible] = useState(true);

  const listAccounts = useAppSelector(state => state.accounts.accounts);
  console.log('listAccounts: ', listAccounts);

  // Плавное исчезновение надписи об авторизации
  useEffect(() => {
    const id = setTimeout(() => {
      setIsvisible(false);
    }, 1500);
    return () => {
      clearTimeout(id);
    };
  }, []);


  return (
    <>
      {isVisible ?
        (<p className={style.textSuccess}>Вы успешно авторизовались</p>
        ) : (
          <Container>
            <div className={style.wrapTitle}>
              <p className={style.title}>Здравствуйте, Александр!</p>
              <Button
                cn='btnAccounts'
                text='Открыть новый счет'
                type='button' />
            </div>
            <div className={style.wrapTitleAccounts}>
              <h2 className={style.titleAccounts}>Мои счета</h2>
              <div className={style.wrapSort}>
                <p className={style.titleSort}>Сортировка:</p>
                <select className={style.select} name="" id="">
                  <option className={style.option} value="">По дате</option>
                  <option className={style.option} value="">По балансу</option>
                  <option className={style.option} value="">
                    По номеру счета
                  </option>
                  <option className={style.option} value="">
                    По транзакции
                  </option>
                </select>
              </div>
            </div>

            <ul className={style.listAccounts}>
              {listAccounts.map((item: any) => (
                <Account
                  key={Math.random().toString(16).slice(2, 8)} data={item}
                />
              )
              )}
            </ul>

          </Container>
      )}
    </>

  );
};
