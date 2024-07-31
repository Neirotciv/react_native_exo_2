import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const favoriteCitiesSlice = createSlice({
  name: 'favoriteCities',
  initialState,
  reducers: {
    addCity: (state, action) => {
      state.push(action.payload);
    },
    removeCity: (state, action) => {
      // Rechercher dans le tableau si la ville est présente
      const index = state.findIndex(city => city.name === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { addCity, removeCity } = favoriteCitiesSlice.actions;

export default favoriteCitiesSlice.reducer;