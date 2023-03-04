import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import words from './words/slice';

export const store = configureStore({
  reducer: { words },
});

export const useAppDispatch = () => useDispatch();
