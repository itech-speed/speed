import { configureStore } from '@reduxjs/toolkit'

import GameReducer from './GameReducer'

const store = configureStore({
  reducer: {
    game: GameReducer,
  },
})
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
