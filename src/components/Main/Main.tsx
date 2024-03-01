/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import style from './Main.module.scss';
import { ReactComponent as CloseEyeIcon } from './closeEye.svg';
import { ReactComponent as OpenEyeIcon } from './openEye.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/hooksStore';
import { tokenRequestAsync } from '../../store/tokenStore/tokenAsyncAction';
import { URI_API } from '../../const/const';

export const Main = () => {
  const [value, setValue] = useState({ login: '', password: '' });
  const [inputType, setInputType] = useState(true);
  const token = useAppSelector(state => state.token.token);

  const [auth, setAuth] = useState({ login: '', password: '' });

  const loginInput = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setAuth(value);
  };

  const handleChange = (e: React.ChangeEvent<EventTarget>) => {
    if (e.target instanceof HTMLInputElement) {
      if (e.target.name === 'login') {
        setValue({ ...value, login: e.target.value });
      } else if (e.target.name === 'password') {
        setValue({ ...value, password: e.target.value });
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

  // Получаем счета
  useEffect(() => {
    if (token) {
      fetch(`${URI_API}/accounts`, {
        headers: {
          Authorization: `Basic ${token}`
        }
      })
        .then(data => data.json())
        .then(resp => console.log('resp1 >>', resp));

      fetch(`${URI_API}/currencies`, {
        headers: {
          Authorization: `Basic ${token}`
        }
      })
        .then(data => data.json())
        .then(resp => console.log('resp2 >>', resp));
    }
  }, [token]);

  return (
    <main className={style.main}>
      <div className={style.wrap}>
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
          />
          <label className={style.label} htmlFor="password">Пароль
          </label >
          <div className={style.inputWrap}>
            <input
              className={style.input}
              type={inputType ? 'password' : 'text'}
              id="password"
              name="password"
              autoComplete="off"
              title="только латинские буквы (не менее 6), без пробелов"
              required
              pattern="[A-Za-z]{6,}"
              onChange={handleChange}
            />
            <button
              className={style.btnEye}
              onClick={() => setInputType(!inputType)}
            >
              {inputType ? <CloseEyeIcon /> : <OpenEyeIcon />}
            </button>
          </div>

          <button
            className={style.button}
            type="submit"
          >Войти
          </button>
        </form>
      </div>
    </main>
  );
};
