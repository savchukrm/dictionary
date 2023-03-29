import { createSlice } from '@reduxjs/toolkit';

export interface ModeState {
  mode: string;
}

const initialState: ModeState = {
  mode: 'dark',
};

const mode = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    changeMode(state) {
      state.mode === 'dark' ? (state.mode = 'light') : (state.mode = 'dark');
      state.mode === 'dark'
        ? document.body.classList.remove('white-content')
        : document.body.classList.add('white-content');
      state.mode === 'dark'
        ? document.querySelector('header')?.classList.remove('header-light')
        : document.querySelector('header')?.classList.add('header-light');
      state.mode === 'dark'
        ? document.querySelector('.formBtn')?.classList.remove('dark-border')
        : document.querySelector('.formBtn')?.classList.add('dark-border');
    },
  },
});

export const { changeMode } = mode.actions;

export default mode.reducer;
