import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  word: '',
};

const dataWords = createSlice({
  name: 'words',
  initialState,
  reducers: {
    searchWord(state, action) {
      state.word = action.payload;
    },
  },
});

export const { searchWord } = dataWords.actions;

export default dataWords.reducer;
