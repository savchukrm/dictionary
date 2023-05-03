import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import words from './words/slice';
import search from './search/slice';
import user from './auth/slice';
import modal from './modal/slice';
import favorite from './favorite/slice';
import lists from './lists/slice';
import list from './set/slice';

export const store = configureStore({
  reducer: { words, search, user, modal, favorite, lists, list },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
