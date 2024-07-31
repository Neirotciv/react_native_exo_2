import { configureStore } from '@reduxjs/toolkit'
import favoriteCitiesReducer from './features/favoriteCitiesSlice' 

export const store = configureStore({
  reducer: {
    favoriteCities: favoriteCitiesReducer,
  },
})