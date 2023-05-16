import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TermItems = {
  definition: string;
  meaning: string;
};

type FolderItems = {
  description: string;
  terms: TermItems[];
};

const initialState: FolderItems = {
  description: '',
  terms: [{ definition: '', meaning: '' }],
};

const folder = createSlice({
  name: 'folder',
  initialState,
  reducers: {
    setFolder: (state, action: PayloadAction<FolderItems>) => {
      return action.payload;
    },
    clearFolder: () => initialState,
  },
});

export const { setFolder, clearFolder } = folder.actions;

export default folder.reducer;
