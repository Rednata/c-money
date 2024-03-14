import { useEffect, useState } from 'react';
import { useAppSelector } from './hooksStore';

export const useEffectShowErrorModal = (errorMessage: string) => {
  console.warn('errorMessage: ', errorMessage);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const token = useAppSelector(state => state.token.token);
  useEffect(() => {
    console.log(errorMessage);
    if (errorMessage.length && !token) {
      setShowErrorModal(true);
      setTimeout(() => {
        setShowErrorModal(false);
      }, 1500);
    }
  }, [errorMessage]);
  return showErrorModal;
};
