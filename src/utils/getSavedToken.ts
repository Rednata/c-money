import { useAppSelector } from '../hooks/hooksStore';

export const getSavedToken = () =>
  useAppSelector(state => state.token.token) ||
    localStorage.getItem('token');
