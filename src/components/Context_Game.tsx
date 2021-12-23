import React from 'react'
import { TEndGameState } from 'src/types/EndGameState'

export interface IGameContent {
  endGameState: TEndGameState
  setEndGameState: (level: TEndGameState) => void
}

const GameContext = React.createContext<IGameContent>({
  endGameState: null,
  setEndGameState: () => null,
})

export default GameContext

export const GameContextProvider: React.FC = ({ children }) => {
  const [endGameState, setEndGameState] = React.useState<TEndGameState>(null)

  return (
    <GameContext.Provider value={{ endGameState, setEndGameState }}>
      {children}
    </GameContext.Provider>
  )
}
