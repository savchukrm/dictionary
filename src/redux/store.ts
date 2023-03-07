import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import words from './words/slice';
import search from './search/slice';

export const store = configureStore({
  reducer: { words, search },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
