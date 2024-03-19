/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import style from './Auth.module.scss';
import { ReactComponent as CloseEyeIcon } from './closeEye.svg';
import { ReactComponent as OpenEyeIcon } from './openEye.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/hooksStore';
import { tokenRequestAsync } from '../../store/tokenStore/tokenAsyncAction';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { useEffectShowModalAuth } from '../../hooks/useEffectShowModal';

export const Auth = () => {
  const [valueInput, setValueInput] = useState({
    login: '', password: ''
  });
  const [auth, setAuth] = useState({ login: '', password: '' });
  const [hiddenPassword, setHiddenPassword] = useState(true);

  const errorMessage = useAppSelector(state => state.token.error);
  const token = useAppSelector(state => state.token.token);

  const loginInput = useRef<HTMLInputElement>(null); //  для фокуса
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const showModalError = useEffectShowModalAuth(errorMessage);

  const showModalSuccess = useEffectShowModalAuth(token);

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
    if (auth.login) {
      dispatch(tokenRequestAsync(auth));
    }
  }, [auth]);

  useEffect(() => {
    loginInput.current?.focus();
  }, []);

  // Загружаем страницу со счетами
  useEffect(() => {
    if (token && !showModalSuccess) {
      setTimeout(() => {
        navigate('/accounts');
      }, 1500);
    }
  }, [token]);

  return (
    <main className={style.main}>
      <div className={style.wrapAuth}>
        <h1 className='visually-hidden'>Форма для авторизации</h1>
        <form className={style.form} onSubmit={handleSubmit}>
          {showModalError && <Modal text={errorMessage}/>}
          {showModalSuccess && <Modal text='Вы успешно авторизовались'/>}
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
