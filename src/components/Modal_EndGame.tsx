import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GameContext from 'src/components/Context_Game'

import { getCompainLevels, getCustomLevels } from '../api/requests/getLevels'
import { HREF_LEVEL } from '../res/routes'

interface IProps {
  className: string
  text: string
  currentLevelID: string
  isCustomLevel: boolean
}

const EndGameModal = ({
  className,
  text,
  currentLevelID,
  isCustomLevel,
}: IProps) => {
  {
    const navigate = useNavigate()
    const { setEndGameState } = useContext(GameContext)
    const [nextLevelID, setNextLevelID] = useState('')
    const isVictory = text == 'victory' ? true : false

    const routeToNextLevel = () => {
      navigate(`/${HREF_LEVEL}/${nextLevelID}`, {
        replace: true,
      })
    }

    useEffect(() => {
      const getLevels = async () => {
        let levels

        isCustomLevel
          ? (levels = await getCustomLevels())
          : (levels = await getCompainLevels())

        const levelIndex = levels.findIndex(
          (level) => level.id == currentLevelID,
        )

        if (levelIndex >= 0 && levelIndex < levels.length - 1) {
          setNextLevelID(levels[levelIndex + 1].id)
        } else setNextLevelID('')
      }

      getLevels()
    }, [currentLevelID])

    useEffect(() => {
      const listenerFunc = (event: KeyboardEvent) => {
        if (event.key === 'r') {
          setEndGameState(null)
        }
        if (event.key === 'Enter' && nextLevelID && isVictory) {
          setEndGameState(null)
          routeToNextLevel()
        }
      }
      window.addEventListener('keydown', listenerFunc)

      return () => {
        window.removeEventListener('keydown', listenerFunc)
      }
    }, [nextLevelID])
    return (
      <div className={className}>
        <div className="w-screen h-screen bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="w-80 h-40 bg-gray-200 text-center p-4">
            <p className="text-3xl mb-4">{text.toUpperCase()}</p>
            <div>
              <p className="mt-1">Press "R" to restart</p>
              {nextLevelID && isVictory && (
                <p className="mt-1">Press "Enter" to play next level</p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EndGameModal
