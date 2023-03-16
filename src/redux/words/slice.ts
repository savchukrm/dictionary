import { createSlice } from '@reduxjs/toolkit';
import { fetchWords } from './asynAction';

import { DataSliceState, Status } from './types';

const initialState: DataSliceState = {
  words: {
    definitions: [{ definition: '', partOfSpeech: '', synonyms: [] }],
    pronunciation: '',
    word: '',
    examples: [],
  },
  status: Status.NOTHING,
};

const dataWords = createSlice({
  name: 'words',
  initialState,
  reducers: {
    setWords(state, action) {
      state.words = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWords.pending, (state, action) => {
      state.status = Status.LOADING;
      state.words = {
        definitions: [{ definition: '', partOfSpeech: '', synonyms: [] }],
        pronunciation: '',
        word: '',
        examples: [],
      };
    });
    builder.addCase(fetchWords.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.words = action.payload;
    });
    builder.addCase(fetchWords.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.words = {
        definitions: [{ definition: '', partOfSpeech: '', synonyms: [] }],
        pronunciation: '',
        word: '',
        examples: [],
      };
    });
  },
});

export const { setWords } = dataWords.actions;

export default dataWords.reducer;
