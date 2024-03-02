/* eslint-disable no-unused-vars */
import { Button } from '../Button/Button';
import { Container } from '../Container/Container';
import style from './Accounts.module.scss';
// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooksStore';
import { Account } from '../Account/Account';
import { accountAddAsync } from '../../store/accountsStore/accountAsyncAction';

export const Accounts = () => {
  const [isVisible, setIsvisible] = useState(true);
  const listAccounts = useAppSelector(state => state.accounts.accounts);
  const dispatch = useAppDispatch();

  // Логика для отображения сорта
  const [currentSort, setCurrentSort] = useState('По дате');
  const [isActivebtnSort, setisActivebtnSort] = useState(false);
  const commonSortList = [
    'По дате', 'По балансу', 'По карте', 'По дате транзакции'
  ];
  const [sortList, setSortList] = useState(
    commonSortList.filter(item => item !== currentSort));

  const sortHandleClick = () => {
    setisActivebtnSort(!isActivebtnSort);
  };

  const handleChoiceSort = (e: React.MouseEvent<HTMLLIElement>) => {
    if (e.currentTarget.textContent) {
      setCurrentSort(e.currentTarget.textContent);
      setisActivebtnSort(!isActivebtnSort);
    }
  };

  useEffect(() => {
    setSortList(commonSortList.filter(item => item !== currentSort));
  }, [currentSort]);

  // Добавление нового счета
  const handleClick = () => {
    dispatch(accountAddAsync());
  };

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
                      {currentSort} &#9660;
                    </button>
                    {isActivebtnSort && (
                      <ul className={style.sortList} >
                        {sortList.map(item => (
                          <li className={style.sortItem}
                            onClick={handleChoiceSort}
                            key={Math.random().toString(16).slice(2, 8)}
                          >{item}</li>
                        ))}
                        {/* <li className={style.sortItem}
                          onClick={handleChoiceSort}
                        >По балансу</li>
                        <li className={style.sortItem}
                          onClick={handleChoiceSort}
                        >По номеру</li>
                        <li className={style.sortItem}
                          onClick={handleChoiceSort}
                        >По дате транзакции</li> */}
                      </ul>
                    )}
                  </div>

                  {/* <select className={style.select} name="" id="">
                    <option
                      className={style.option} value=""
                    >
                      По дате открытия
                    </option>
                    <option
                      className={style.option} value="">По балансу</option>
                    <option className={style.option} value="">
                      По номеру счета
                    </option>
                    <option className={style.option} value="">
                      По дате транзакции
                    </option>
                  </select> */}
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
            </div>

          </Container>
      )}
    </>

  );
};
