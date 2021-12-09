import { configureStore } from '@reduxjs/toolkit'

import CarReducer from './CarReducer'

const store = configureStore({
  reducer: {
    car: CarReducer,
  },
})
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
