import { createSlice } from '@reduxjs/toolkit';

export interface ModalState {
  modal: boolean;
}

const initialState: ModalState = {
  modal: false,
};

const modal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    handleOpen(state) {
      state.modal = true;
    },
    handleClose(state) {
      state.modal = false;
    },
  },
});

export const { handleClose, handleOpen } = modal.actions;

export default modal.reducer;
