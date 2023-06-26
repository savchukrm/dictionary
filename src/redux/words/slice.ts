import { createSlice } from '@reduxjs/toolkit';
import { fetchWords } from './asynAction';

import { DataSliceState, Status } from './types';

const initialState: DataSliceState = {
  words: {
    results: [{ definition: '', partOfSpeech: '', synonyms: [] }],
    pronunciation: { all: '' },
    word: '',
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
    clearWords(state) {
      state.words = {
        results: [{ definition: '', partOfSpeech: '', synonyms: [] }],
        pronunciation: { all: '' },
        word: '',
      };
      state.status = Status.NOTHING;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWords.pending, (state, action) => {
      state.status = Status.LOADING;
      state.words = {
        results: [{ definition: '', partOfSpeech: '', synonyms: [] }],
        pronunciation: { all: '' },
        word: '',
      };
    });
    builder.addCase(fetchWords.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.words = action.payload;
    });
    builder.addCase(fetchWords.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.words = {
        results: [{ definition: '', partOfSpeech: '', synonyms: [] }],
        pronunciation: { all: '' },
        word: '',
      };
    });
  },
});

export const { setWords, clearWords } = dataWords.actions;

export default dataWords.reducer;
