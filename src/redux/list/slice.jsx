import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

const list = createSlice({
  name: 'list',
  initialState,
  reducers: {
    setList(state, action) {
      state.list = action.payload;
    },
    clearList(state) {
      state.list = [];
    },
  },
});

export const { setList, clearList } = list.actions;

export default list.reducer;
