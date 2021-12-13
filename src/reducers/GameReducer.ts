import { createSlice } from '@reduxjs/toolkit'
import { TEndGameState } from 'src/types/EndGameState'

interface IState {
  level: number
  endGameState: TEndGameState
}

const initialState: IState = {
  level: 1,
  endGameState: null,
}

const GameReducer = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setNumber(state, { payload }) {
      state.level = payload
    },
    setEndGameState(state, { payload }) {
      state.endGameState = payload
    },
  },
})

export default GameReducer.reducer
export const { setNumber, setEndGameState } = GameReducer.actions
