import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import words from './words/slice';
import search from './search/slice';
import user from './auth/slice';
import modal from './modal/slice';
import mode from './mode/slice';
import list from './list/slice';

export const store = configureStore({
  reducer: { words, search, user, modal, mode, list },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();