import { useEffect, useState } from 'react';
import { useAppSelector } from './hooksStore';

export const useEffectShowModal = (message: string) => {
  const token = useAppSelector(state => state.token.token);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (token && message === token) {
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 1500);
    } else if (!token && message.length) {
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 1500);
    }
  }, [message]);
  return showModal;
};
