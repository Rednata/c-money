import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { AppDispatch } from '../store/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
