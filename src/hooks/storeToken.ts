// import { useDispatch } from 'react-redux';
// import { tokenSlice } from '../store/tokenStore/tokenSlice';
// import { useAppSelector } from './hooksStore';

export const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  // const dispatch = useDispatch();
  console.log();
  return localStorage.getItem('token');
  // dispatch(tokenSlice.actions.updateToken(token));
};
