import { ReactComponent as LogoSvg } from './logo.svg';
import style from './Header.module.scss';
import { Container } from '../Container/Container';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooksStore';
import { tokenSlice } from '../../store/tokenStore/tokenSlice';

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClickExit = () => {
    console.log('lick');
    localStorage.removeItem('token');
    dispatch(tokenSlice.actions.updateToken(''));
    navigate('/');
  };

  return (
    <header className={style.header}>
      <Container>
        <div className={style.wrap}>
          <LogoSvg className={style.logo}/>
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
        </div>
      </Container>
    </header>
  );
};
