import { Physics, useBox, useCylinder, usePlane } from '@react-three/cannon'
import { CylinderProps, PlaneProps } from '@react-three/cannon/dist/hooks'
import { Canvas } from '@react-three/fiber'
import { useDispatch, useSelector } from 'react-redux'
import Arrow from 'src/components/3dmodels/Arrow'
import Beetle from 'src/components/3dmodels/Beetle'
import EndGameModal from 'src/components/modals/EndGameModal'
import { AppDispatch, RootState } from 'src/reducers'
import { setEndGameState } from 'src/reducers/CarReducer'
import { USERDATA_ARROW, USERDATA_PILLAR } from 'src/res/userDataName'
import { TEndGameState } from 'src/types/EndGameState'

const Plane = (props: PlaneProps) => {
  const [ref] = usePlane(() => ({
    type: 'Static',
    material: 'ground',
    ...props,
  }))
  return (
    <group ref={ref}>
      <mesh receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#47614f" />
      </mesh>
    </group>
  )
}

const Pillar = ({ args = [0.7, 0.7, 5, 16], ...props }: CylinderProps) => {
  const [ref] = useCylinder(() => ({ mass: 10, args, ...props }))
  return (
    <mesh ref={ref} castShadow>
      <cylinderGeometry args={args} />
      <meshStandardMaterial color="#333" />
    </mesh>
  )
}

const Stone = ({ args = [40, 4, 2], ...props }: any) => {
  const [ref] = useBox(() => ({ type: 'Static', args, ...props }))
  return (
    <>
      <mesh ref={ref} castShadow>
        <boxGeometry args={args} />
        <meshStandardMaterial color="#47614f" />
      </mesh>
    </>
  )
}

const App = () => {
  const dispatch = useDispatch<AppDispatch>()
  const endGameState = useSelector((state: RootState) => state.car.endGameState)

  const onGameEnded = (endState: TEndGameState) => {
    dispatch(setEndGameState(endState))
  }

  return (
    <div className="app relative">
      <header className="App-header"></header>
      <Canvas dpr={[1, 1.5]} shadows camera={{ position: [0, 5, 15], fov: 50 }}>
        <color attach="background" args={['#e8fffe']} />
        <ambientLight intensity={0.3} />
        <spotLight
          color="#fffbd1"
          position={[70, 20, 30]}
          angle={0.5}
          intensity={2}
          castShadow
          penumbra={1}
        />
        <pointLight position={[10, 10, 10]} />

        <Physics
          broadphase="SAP"
          // @ts-ignore
          contactEquationRelaxation={4}
          friction={1e-3}
          allowSleep
        >
          {/* contact groud */}
          <Plane
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
            userData={{ id: 'floor' }}
          />

          <Beetle position={[-16, 1, -16]} onGameEnded={onGameEnded} />

          <group>
            <Stone position={[0, 0, -20]} userData={{ id: USERDATA_PILLAR }} />
            <Stone position={[0, 0, 20]} userData={{ id: USERDATA_PILLAR }} />
            <Stone
              position={[19, 0, 0]}
              rotation={[0, Math.PI / 2, 0]}
              userData={{ id: USERDATA_PILLAR }}
            />
            <Stone
              position={[-19, 0, 0]}
              rotation={[0, Math.PI / 2, 0]}
              userData={{ id: USERDATA_PILLAR }}
            />
          </group>

          <Pillar position={[5, 2.5, -5]} userData={{ id: USERDATA_PILLAR }} />
          <Arrow position={[5, 1, 5]} userData={{ id: USERDATA_ARROW }} />
        </Physics>
      </Canvas>

      <div style={{ position: 'absolute', top: 30, left: 40 }}>
        <pre>
          Must run on descktop and fullscreen!
          <br />
          WASD to drive, space to brake
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
