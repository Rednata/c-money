/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import style from './Auth.module.scss';
import { ReactComponent as CloseEyeIcon } from './closeEye.svg';
import { ReactComponent as OpenEyeIcon } from './openEye.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/hooksStore';
import { tokenRequestAsync } from '../../store/tokenStore/tokenAsyncAction';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button/Button';

export const Auth = () => {
  const [valueInput, setValueInput] = useState({
    login: '', password: ''
  });
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [auth, setAuth] = useState({ login: '', password: '' });

  const token = useAppSelector(state => state.token.token);
  const navigate = useNavigate();
  const loginInput = useRef<HTMLInputElement>(null); //  для фокуса
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setAuth(valueInput);
  };

  const handleChange = (e: React.ChangeEvent<EventTarget>) => {
    if (e.target instanceof HTMLInputElement) {
      if (e.target.name === 'login') {
        setValueInput({ ...valueInput, login: e.target.value });
      } else if (e.target.name === 'password') {
        setValueInput({ ...valueInput, password: e.target.value });
      }
    }
  };

  useEffect(() => {
    loginInput.current?.focus();
  }, []);

  // Получаем токен
  useEffect(() => {
    if (auth.login) {
      dispatch(tokenRequestAsync(auth));
    }
  }, [auth]);

  // Загружаем страницу со счетами
  useEffect(() => {
    if (token) {
      // dispatch(accountRequestAsync());
      navigate('/accounts');
    }
  }, [token]);

  return (
    <main className={style.main}>
      <div className={style.wrapAuth}>
        <h1 className='visually-hidden'>Форма для авторизации</h1>
        <form className={style.form} onSubmit={handleSubmit}>
          <h2 className={style.title}>Вход в аккаунт</h2>
          <label
            className={style.label}
            htmlFor="login"
          >Логин
          </label >
          <input
            className={style.input}
            type="text"
            id="login"
            name="login"
            ref={loginInput}
            onChange={handleChange}
            autoComplete="off"
            title="только латинские буквы (не менее 6), без пробелов"
            required
            pattern="[A-Za-z]{6,}"
            value={valueInput.login}
          />
          <label className={style.label} htmlFor="password">Пароль
          </label >
          <div className={style.inputWrap}>
            <label className={style.inputLabel}>
              <input
                className={style.input}
                type={hiddenPassword ? 'password' : 'text'}
                id="password"
                name="password"
                autoComplete="off"
                title="только латинские буквы (не менее 6), без пробелов"
                required
                pattern="[A-Za-z]{6,}"
                onChange={handleChange}
                value={valueInput.password}
              />
            </label>
            <button
              className={style.btnEye}
              onClick={() => setHiddenPassword(!hiddenPassword)}
            >
              {hiddenPassword ? <CloseEyeIcon /> : <OpenEyeIcon />}
            </button>
          </div>

          <Button text='Войти' type='submit' / >

        </form>
      </div>
    </main>
  );
};