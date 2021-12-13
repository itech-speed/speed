import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setEndGameState } from 'src/reducers/CarReducer'

interface IProps {
  className: string
  text: string
}

const EndGameModal = ({ className, text }: IProps) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const listenerFunc = (event: any) => {
      if (event.key === 'r') {
        dispatch(setEndGameState(null))
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
