import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AuthReducer from './AuthStore/AuthSlice';

const rootReducer = combineReducers({
  auth: AuthReducer
});

export const store = configureStore({
  reducer: rootReducer,
});
