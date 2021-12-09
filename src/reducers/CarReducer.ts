import { createSlice } from '@reduxjs/toolkit'

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
    setColor(state) {
      state.color = 'red'
    },
  },
})

export default CarReducer.reducer
export const { setColor } = CarReducer.actions
