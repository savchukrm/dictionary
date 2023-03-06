import { createSlice } from '@reduxjs/toolkit';
import { fetchWords } from './asynAction';

const sts = {
  loading: 'loading',
  success: 'success',
  error: 'error',
};

const initialState = {
  words: {},
  status: '',
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
      state.status = sts.loading;
      state.words = {};
    });
    builder.addCase(fetchWords.fulfilled, (state, action) => {
      state.status = sts.success;
      state.words = action.payload;
    });
    builder.addCase(fetchWords.rejected, (state, action) => {
      state.status = sts.error;
      state.words = {};
    });
  },
});

export const { setWords } = dataWords.actions;

export default dataWords.reducer;
