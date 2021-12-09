import { combineReducers } from '@reduxjs/toolkit'

import CarReducer from './CarReducer'

export default combineReducers({
  car: CarReducer,
})
