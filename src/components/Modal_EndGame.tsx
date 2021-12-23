import { useContext, useEffect } from 'react'
import GameContext from 'src/components/Context_Game'

interface IProps {
  className: string
  text: string
}

const EndGameModal = ({ className, text }: IProps) => {
  const { setEndGameState } = useContext(GameContext)

  useEffect(() => {
    const listenerFunc = (event: KeyboardEvent) => {
      if (event.key === 'r') {
        setEndGameState(null)
      }
    }
    window.addEventListener('keydown', listenerFunc)

    return () => {
      window.removeEventListener('keydown', listenerFunc)
    }
  }, [])
  return (
    <div className={className}>
      <div className="w-screen h-screen bg-gray-900 bg-opacity-50 flex justify-center items-center">
        <div className="w-80 h-40 bg-gray-200 text-center">
          <p className="text-3xl ">{text}</p>
          <p>Press "R" to restart</p>
        </div>
      </div>
    </div>
  )
}

export default EndGameModal
