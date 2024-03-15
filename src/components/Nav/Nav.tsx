/* eslint-disable no-unused-vars */
import style from './Nav.module.scss';
import { tokenSlice } from '../../store/tokenStore/tokenSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooksStore';
import { useEffect, useState } from 'react';
import { isSmallWindowSize,
  mediaQuery } from '../../utils/mediaQueryWindowSize';

export const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [disabledAccountsLink, setDisabledAccountsLink] = useState(true);
  const [disabledExchangeLink, setDisabledExchangeLink] = useState(true);
  console.log('FIRST');

  const [showNavList, setShowNavList] = useState(false);
  const [showBurger, setShowBurger] = useState(false);
  // const mediaQuery = window.matchMedia('(max-width: 850px');

  const handleBurgerClick = () => {
    setShowNavList(true);
    setShowBurger(false);
  };

  const hiddenAccountsNav = () => {
    if (location.pathname === '/accounts' && isSmallWindowSize()) {
      setShowBurger(true);
      setShowNavList(false);
    }
  };

  const hiddenCurrencyNav = () => {
    if (location.pathname === '/exchange' && isSmallWindowSize()) {
      setShowBurger(true);
      setShowNavList(false);
    }
  };

  const handleClickExit = () => {
    localStorage.removeItem('token');
    dispatch(tokenSlice.actions.updateToken(''));
    navigate('/');
  };

  // console.log('mediaQuery: ', mediaQuery);
  const showMenu = (e: MediaQueryListEvent) => {
    console.log('SHOWMENU');
    if (e.matches) {
      setShowBurger(true);
      setShowNavList(false);
    } else {
      setShowNavList(true);
      setShowBurger(false);
    }
  };

  mediaQuery.addEventListener('change', showMenu);

  // mediaQuery.addEventListener('change', () => {
  //   console.log('CHANGE===========');
  //   if (isSmallWindowSize()) {
  //     setShowBurger(true);
  //     setShowNavList(false);
  //   } else {
  //     setShowNavList(true);
  //     setShowBurger(false);
  //   }
  // });

  useEffect(() => {
    if (location.pathname === '/accounts') {
      setDisabledAccountsLink(true);
    } else {
      setDisabledAccountsLink(false);
    }
    if (location.pathname === '/exchange') {
      setDisabledExchangeLink(true);
    } else {
      setDisabledExchangeLink(false);
    }
    if (isSmallWindowSize()) {
      setShowBurger(true);
      setShowNavList(false);
    } else {
      setShowNavList(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    console.log('USEEFFECT');
    if (isSmallWindowSize()) {
      setShowBurger(true);
      setShowNavList(false);
    } else {
      setShowNavList(true);
    }
  }, []);

  return (
    <nav className={style.nav}>
      {
        showBurger && (
          <button className={style.burger} onClick={handleBurgerClick}>
            <span className={style.burgerDash}></span>
            <span className={style.burgerDash}></span>
            <span className={style.burgerDash}></span>
          </button>
        )
      }
      {
        showNavList && (
          <ul
            className={style.list}
          >
            <li className={style.item}>
              {disabledAccountsLink ? (
                <a
                  onClick={hiddenAccountsNav}
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
              {disabledExchangeLink ? (
              <a
                className={style.linkDisabled}
                onClick={hiddenCurrencyNav}
              >Обмен
              </a>
              ) : (
                <Link
                  className={style.link}
                  to="/exchange"
                >Обмен
                </Link>
              )}
            </li>
            <li className={style.item}>
              <button
                className={style.btn}
                onClick={handleClickExit}
              >Выйти
              </button>
            </li>
          </ul>
        )
      }
    </nav>
  );
};
