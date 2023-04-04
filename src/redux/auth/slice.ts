import { createSlice } from '@reduxjs/toolkit';

export type UserItem = {
  email: string | null;
  token: string | null;
  id: number | null;
};

const initialState: UserItem = {
  email: null,
  token: null,
  id: null,
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
    },
  },
});

export const { setUser, removeUser } = user.actions;

export default user.reducer;
