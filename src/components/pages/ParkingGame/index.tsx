import { Physics } from '@react-three/cannon'
import { Canvas } from '@react-three/fiber'
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
import { CUSTOM_LEVELS } from 'src/res/localStorageNames'
import { PATH_LEVEL } from 'src/res/routes'
import { TEndGameState } from 'src/types/EndGameState'

const ParkinkGamePage = () => {
  const params = useParams()

  const levelSlug = params[PATH_LEVEL] || 1
  const findedLevel = levelsConfigList.find(
    (i) => i.id.toString() === levelSlug.toString(),
  )

  const isCustomLevels = localStorage.getItem(CUSTOM_LEVELS)
  const customLevels = isCustomLevels ? JSON.parse(isCustomLevels) : null
  const findedCustomLevel =
    customLevels &&
    customLevels.find((i: any) => i.id.toString() === levelSlug.toString())

  const curLevelConfig = findedLevel || findedCustomLevel || levelsConfigList[0]

  const dispatch = useDispatch<AppDispatch>()
  const endGameState = useSelector(
    (state: RootState) => state.game.endGameState,
  )

  const onGameEnded = (endState: TEndGameState) => {
    dispatch(setEndGameState(endState))
  }

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

          <Beetle {...curLevelConfig.car} onGameEnded={onGameEnded} />

          <LevelBuilder levelData={curLevelConfig} />
        </Physics>
      </Canvas>

      {endGameState !== null && (
        <EndGameModal className="absolute inset-0" text={endGameState} />
      )}
    </main>
  )
}

export default ParkinkGamePage
