import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface DataState {
  postedData: any | null;
}

const initialState: DataState = {
  postedData: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setPostedData: (state, action: PayloadAction<any>) => {
      state.postedData = action.payload;
    },
    clearPostedData: (state) => {
      state.postedData = null;
    },
  },
});

export const { setPostedData, clearPostedData } = dataSlice.actions;
export const selectPostedData = (state: RootState) => state.data.postedData; 


export default dataSlice.reducer;
