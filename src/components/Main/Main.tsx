/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import style from './Main.module.scss';
import { AuthSlice } from '../../store/AuthStore/AuthSlice';
import { useDispatch } from 'react-redux';
import { ReactComponent as CloseEyeIcon } from './closeEye.svg';
import { ReactComponent as OpenEyeIcon } from './openEye.svg';

export const Main = () => {
  const [value, setValue] = useState({ login: '', password: '' });
  const [passwordType, setPasswordType] = useState(true);

  const loginInput = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    // console.log(value);
    dispatch(AuthSlice.actions.inputAuth(value));
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
            // pattern="[A-Za-z]"
          />
          <label className={style.label} htmlFor="password">Пароль
          </label >
          <div className={style.inputWrap}>
            <input
              className={style.input}
              type={passwordType ? 'password' : 'text'}
              id="password"
              name="password"
              autoComplete="off"
              title="только латинские буквы (не менее 6), без пробелов"
              required
              pattern="[A-Za-z]{6,}"
              onChange={handleChange}
            />
            <button
              className={style.btnClose}
              onClick={() => setPasswordType(!passwordType)}
            >
              {passwordType ? <CloseEyeIcon /> : <OpenEyeIcon />}
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
