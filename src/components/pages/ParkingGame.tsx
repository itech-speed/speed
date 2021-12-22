import { Physics } from '@react-three/cannon'
import { Canvas } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Beetle from 'src/components/levels/Beetle'
import LevelBuilder from 'src/components/levels/LevelBuilder'
import Plane from 'src/components/levels/Plane'
import EndGameModal from 'src/components/modals/EndGameModal'
import GameMenu from 'src/components/ui/GameMenu'
import { AppDispatch, RootState } from 'src/reducers'
import { setEndGameState } from 'src/reducers/GameReducer'
import { levelsConfigList } from 'src/res/LevelsConfig'
import { PATH_LEVEL } from 'src/res/routes'
import { TEndGameState } from 'src/types/EndGameState'

import { getLevels } from '../../api/get'
import transformCarFromServer from '../../utils/transformCarFromServer'
import transformServerObjectToPlay from '../../utils/transformServerObjectToPlay'

const ParkinkGamePage = () => {
  const params = useParams()
  const [currentLevel, setCurrentLevel] = useState<any>(null)

  const dispatch = useDispatch<AppDispatch>()
  const endGameState = useSelector(
    (state: RootState) => state.game.endGameState,
  )

  const onGameEnded = (endState: TEndGameState) => {
    dispatch(setEndGameState(endState))
  }

  useEffect(() => {
    ;(async () => {
      const levelSlug = params[PATH_LEVEL] || 1
      const findedLevel = levelsConfigList.find(
        (i) => i.id.toString() === levelSlug.toString(),
      )

      if (findedLevel) setCurrentLevel(findedLevel)
      else {
        const customLevels = await getLevels()
        const findedCustomLevel =
          customLevels &&
          customLevels.find(
            (i: any) => i.id.toString() === levelSlug.toString(),
          )

        if (findedCustomLevel) {
          // @ts-ignore
          findedCustomLevel.objects = findedCustomLevel.objects.map(
            (obj: any) => transformServerObjectToPlay(obj),
          )

          // @ts-ignore
          findedCustomLevel.car = transformCarFromServer(findedCustomLevel.car)
          setCurrentLevel(findedCustomLevel)
        } else setCurrentLevel(levelsConfigList[0])
      }
    })()
  }, [])

  if (!currentLevel) return <div>Loading</div>

  return (
    <main className="h-screen relative">
      <GameMenu className="absolute z-50" />

      <Canvas dpr={[1, 1.5]} shadows camera={{ position: [0, 5, 15], fov: 50 }}>
        <color attach="background" args={['#e8fffe']} />
        <ambientLight intensity={0.6} />
        <spotLight
          color="#fffbd1"
          position={[100, 80, 20]}
          angle={0.3}
          intensity={2}
          castShadow
          penumbra={1}
        />

        <Physics
          broadphase="SAP"
          // @ts-ignore
          contactEquationRelaxation={4}
          friction={1e-3}
          allowSleep
        >
          {/* contact groud */}
          <Plane
            type="Static"
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
            userData={{ id: 'floor' }}
          />

          <Beetle {...currentLevel.car} onGameEnded={onGameEnded} />

          <LevelBuilder levelData={currentLevel} />
        </Physics>
      </Canvas>

      {endGameState !== null && (
        <EndGameModal className="absolute inset-0" text={endGameState} />
      )}
    </main>
  )
}

export default ParkinkGamePage
