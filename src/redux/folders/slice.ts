import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  folders: [],
};

const folders = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    setFolders(state, action) {
      state.folders = action.payload;
    },
    clearFolders(state) {
      state.folders = [];
    },
  },
});

export const { setFolders, clearFolders } = folders.actions;

export default folders.reducer;
