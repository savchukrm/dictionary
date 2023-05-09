import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quizList: [],
};

const quiz = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setListForQuiz(state, action) {
      state.quizList = action.payload;
    },
    clearListForQuiz(state) {
      state.quizList = [];
    },
  },
});

export const { setListForQuiz, clearListForQuiz } = quiz.actions;

export default quiz.reducer;
