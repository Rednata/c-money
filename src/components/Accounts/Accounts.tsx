/* eslint-disable no-unused-vars */
import { Button } from '../Button/Button';
import { Container } from '../Container/Container';
import { ListAccounts } from '../ListAccounts/ListAccounts';
import style from './Accounts.module.scss';
// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from 'react';

// type Props = {}

export const Accounts = () => {
  const [isVisible, setIsvisible] = useState(true);

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
            <h2 className={style.titleAccounts}>Мои счета</h2>
            <ListAccounts />
          </Container>
      )}
    </>

  );
};
