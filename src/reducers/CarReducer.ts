import { createSlice } from '@reduxjs/toolkit'
import { TEndGameState } from 'src/types/EndGameState'

interface IState {
  num: number
  endGameState: TEndGameState
}

const initialState: IState = {
  num: 1,
  endGameState: null,
}

const CarReducer = createSlice({
  name: 'car',
  initialState,
  reducers: {
    setNumber(state, { payload }) {
      state.num = payload
    },
    setEndGameState(state, { payload }) {
      state.endGameState = payload
    },
  },
})

export default CarReducer.reducer
export const { setNumber, setEndGameState } = CarReducer.actions
