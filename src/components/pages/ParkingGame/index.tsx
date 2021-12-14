import { Physics } from '@react-three/cannon'
import { Canvas } from '@react-three/fiber'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Beetle from 'src/components/Levels/Beetle'
import LevelBuilder from 'src/components/Levels/LevelBuilder'
import Plane from 'src/components/Levels/Plane'
import EndGameModal from 'src/components/modals/EndGameModal'
import { AppDispatch, RootState } from 'src/reducers'
import { setEndGameState } from 'src/reducers/GameReducer'
import { levelsConfigList } from 'src/res/LevelsConfig'
import { SLUG_LEVEL } from 'src/res/routes'
import { TEndGameState } from 'src/types/EndGameState'

import GameMenu from './GameMenu'

const ParkinkGamePage = () => {
  const params = useParams()
  console.log(params[SLUG_LEVEL])

  const levelSlug = params[SLUG_LEVEL] || 1
  const findedLevel = levelsConfigList.find(
    (i) => i.id.toString() === levelSlug.toString(),
  )
  const curLevelConfig = findedLevel || levelsConfigList[0]

  const dispatch = useDispatch<AppDispatch>()
  const endGameState = useSelector(
    (state: RootState) => state.game.endGameState,
  )

  const onGameEnded = (endState: TEndGameState) => {
    dispatch(setEndGameState(endState))
  }

  return (
    <div className="h-screen relative">
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

          <Beetle {...curLevelConfig.car} onGameEnded={onGameEnded} />

          <LevelBuilder levelData={curLevelConfig} />
        </Physics>
      </Canvas>

      {endGameState !== null && (
        <EndGameModal className="absolute inset-0" text={endGameState} />
      )}
    </div>
  )
}

export default ParkinkGamePage
