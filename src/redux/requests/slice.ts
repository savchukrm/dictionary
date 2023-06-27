import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lastRequests: [],
};

const requests = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    setLastRequests(state, action) {
      state.lastRequests = action.payload;
    },
    clearLastRequests(state) {
      state.lastRequests = [];
    },
  },
});

export const { setLastRequests, clearLastRequests } = requests.actions;

export default requests.reducer;
