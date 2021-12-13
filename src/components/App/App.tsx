import { Physics } from '@react-three/cannon'
import { Canvas } from '@react-three/fiber'
import { useDispatch, useSelector } from 'react-redux'
import Beetle from 'src/components/Levels/Beetle'
import LevelBuilder from 'src/components/Levels/LevelBuilder'
import Plane from 'src/components/Levels/Plane'
import EndGameModal from 'src/components/modals/EndGameModal'
import { AppDispatch, RootState } from 'src/reducers'
import { setEndGameState } from 'src/reducers/GameReducer'
import levelsConfig from 'src/res/LevelsConfig'
import { TEndGameState } from 'src/types/EndGameState'

const App = () => {
  const dispatch = useDispatch<AppDispatch>()
  const endGameState = useSelector(
    (state: RootState) => state.game.endGameState,
  )

  const gameLvl = useSelector((state: RootState) => state.game.level)
  console.log(gameLvl)

  const onGameEnded = (endState: TEndGameState) => {
    dispatch(setEndGameState(endState))
  }

  return (
    <div className="app relative">
      <header className="App-header"></header>
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

          <Beetle {...levelsConfig[1].car} onGameEnded={onGameEnded} />

          <LevelBuilder levelData={levelsConfig[1]} />
        </Physics>
      </Canvas>

      <div style={{ position: 'absolute', top: 30, left: 40 }}>
        <pre>
          Must run on descktop and fullscreen!
          <br />
          WASD to drive, space to brake
          <br />
          Rotate camera - hold LCM
          <br />
          Shift camera - Shift + hold LCM
          <br />R to reset
        </pre>
      </div>
      {endGameState !== null && (
        <EndGameModal className="absolute inset-0" text={endGameState} />
      )}
    </div>
  )
}

export default App
