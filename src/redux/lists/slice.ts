import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lists: [],
};

const lists = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    setLists(state, action) {
      state.lists = action.payload;
    },
    clearLists(state) {
      state.lists = [];
    },
  },
});

export const { setLists, clearLists } = lists.actions;

export default lists.reducer;
