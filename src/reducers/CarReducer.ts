import { createSlice } from '@reduxjs/toolkit'

// REDUCER
interface IState {
  color: string
}

const initialState: IState = {
  color: 'green',
}

const CarReducer = createSlice({
  name: 'car',
  initialState,
  reducers: {
    colorToRed(state) {
      state.color = 'res'
    },
  },
})

export default CarReducer.reducer
export const { colorToRed } = CarReducer.actions
