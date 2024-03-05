import style from './Nav.module.scss';
import { tokenSlice } from '../../store/tokenStore/tokenSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooksStore';

export const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClickExit = () => {
    console.log('lick');
    localStorage.removeItem('token');
    dispatch(tokenSlice.actions.updateToken(''));
    navigate('/');
  };

  return (
    <nav className={style.nav}>
      <ul className={style.list}>
        <li className={style.item}>Счета
          <a className={style.link} href=""></a>
        </li>
        <li className={style.item}>Обмен
          <a className={style.link} href=""></a>
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
