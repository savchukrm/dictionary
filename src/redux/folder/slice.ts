import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  folder: [],
};

const folder = createSlice({
  name: 'folder',
  initialState,
  reducers: {
    setFolder(state, action) {
      state.folder = action.payload;
    },
    clearFolder(state) {
      state.folder = [];
    },
  },
});

export const { setFolder, clearFolder } = folder.actions;

export default folder.reducer;
