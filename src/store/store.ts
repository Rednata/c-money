import { combineReducers, configureStore } from '@reduxjs/toolkit';
import tokenReducer from './tokenStore/tokenSlice';
import accountsSlice from './accountsStore/accountsSlice';
import { tokenMiddleware } from './tokenStore/tokenAsyncAction';

const rootReducer = combineReducers({
  token: tokenReducer,
  accounts: accountsSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(tokenMiddleware),
}
);

export type AppStore = typeof store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
