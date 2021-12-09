import { createSlice } from '@reduxjs/toolkit'

interface IState {
  num: number
}

const initialState: IState = {
  num: 1,
}

const CarReducer = createSlice({
  name: 'car',
  initialState,
  reducers: {
    setNumber(state, { payload }) {
      state.num = payload
    },
  },
})

export default CarReducer.reducer
export const { setNumber } = CarReducer.actions
