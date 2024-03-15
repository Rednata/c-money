/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import style from './SelectList.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/hooksStore';
import { funcSort } from '../../utils/sort';
import { accountsSlice } from '../../store/accountsStore/accountsSlice';

export const SelectList = () => {
  const listAccounts = useAppSelector(state => state.accounts.accounts);
  const dispatch = useAppDispatch();
  const [isActivebtnSort, setisActivebtnSort] = useState(false);
  const [valueSort, setValueSort] = useState('По дате');
  const list = [
    'По дате', 'По балансу', 'По карте', 'По дате транзакции'
  ];
  const [sortList, setSortList] = useState(
    list.filter(item => item !== valueSort));

  const handleSortItem = (e: React.MouseEvent<HTMLLIElement>) => {
    if (e.currentTarget.textContent) {
      setValueSort(e.currentTarget.textContent);
      setisActivebtnSort(!isActivebtnSort);
    }
  };

  useEffect(() => {
    setSortList(list.filter(item => item !== valueSort));
    const newSortList = funcSort(valueSort, listAccounts);
    dispatch(accountsSlice.actions.sortAccounts(newSortList));
  }, [valueSort]);

  return (
    <>
      <button className={isActivebtnSort ?
        style.activeBtnSort : style.btnSort}
      onClick={() => setisActivebtnSort(!isActivebtnSort)}>
        {valueSort} &#9660;
      </button>
      {
        isActivebtnSort &&
          <ul className={style.sortList} >
            {
              sortList.map(item => (
                <li className={style.sortItem}
                  onClick={handleSortItem}
                  key={Math.random().toString(16).slice(2, 8)}
                >{item}</li>
              ))
            }
          </ul>
      }
    </>
  );
};
