/* eslint-disable no-unused-vars */
import style from './Nav.module.scss';
import { tokenSlice } from '../../store/tokenStore/tokenSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooksStore';
import { useEffect, useState } from 'react';

export const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [disabled, setDisabled] = useState(true);

  const handleClickExit = () => {
    localStorage.removeItem('token');
    dispatch(tokenSlice.actions.updateToken(''));
    navigate('/');
  };

  useEffect(() => {
    if (location.pathname === '/accounts') {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [location.pathname]);

  return (
    <nav className={style.nav}>
      <ul className={style.list}>
        <li className={style.item}>
          {disabled ? (
            <a
              className={style.linkDisabled}
            >Счета
            </a>
          ) : (
            <Link
              className={style.link}
              to="/accounts"
            >Счета
            </Link>
          )}

        </li>
        <li className={style.item}>
          <Link className={style.link} to="/exchange">Обмен</Link>
        </li>
        <li className={style.item}>
          <button
            className={style.btn}
            onClick={handleClickExit}
          >Выйти
          </button>
        </li>
      </ul>
    </nav>
  );
};
