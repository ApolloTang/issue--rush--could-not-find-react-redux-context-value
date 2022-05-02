import { useDispatch } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { middleware } from './middleware';
import { rootReducer } from './reducers';

type AppStateType = ReturnType<typeof rootReducer>;
type AppDispatch = ThunkDispatch<AppStateType, any, AnyAction>;
type ThunkDispatchExtensions = ThunkDispatch<AppStateType, void, AnyAction>;

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware().concat(middleware),
});

// Correctly typed `useDispatch` hook
const useThunkDispatch = () => useDispatch<typeof store.dispatch>();

type GetStateType = () => AppStateType;

export {
  store,
  AppStateType,
  AppDispatch,
  useThunkDispatch,
  GetStateType,
  ThunkDispatchExtensions,
};
