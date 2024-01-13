import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    languages: [],
  },
  reducers: {
    saveLanguages: (state, action) => {
      state.languages = action.payload;
    },
  },
});

export default cartSlice.reducer;
export const {saveLanguages} = cartSlice.actions;
