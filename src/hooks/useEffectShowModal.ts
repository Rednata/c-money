import { useEffect, useState } from 'react';
import { useAppSelector } from './hooksStore';

export const useEffectShowModalAuth = (data: string) => {
  const token = useAppSelector(state => state.token.token);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (
      (token && data === token) || (
        !token && data.length
      )) {
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 1500);
    }
  }, [data]);
  return showModal;
};

export const useEffectShowModal = (data: string) => {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (data) {
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 1500);
    }
  }, [data]);
  return showModal;
};
