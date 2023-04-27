import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorite: [],
};

const favorite = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    setFavorite(state, action) {
      state.favorite = action.payload;
    },
    clearFavorite(state) {
      state.favorite = [];
    },
  },
});

export const { setFavorite, clearFavorite } = favorite.actions;

export default favorite.reducer;
