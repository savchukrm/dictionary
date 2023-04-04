import { createSlice } from '@reduxjs/toolkit';

export interface DataWordState {
  word: string | any;
}

const initialState: DataWordState = {
  word: '',
};

const dataWord = createSlice({
  name: 'searchWord',
  initialState,
  reducers: {
    searchWord(state, action) {
      state.word = action.payload;
    },
  },
});

export const { searchWord } = dataWord.actions;

export default dataWord.reducer;
