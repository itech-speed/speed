import { Physics, useCylinder, usePlane } from '@react-three/cannon'
import { CylinderProps, PlaneProps } from '@react-three/cannon/dist/hooks'
import { Canvas } from '@react-three/fiber'
import Beetle from 'src/components/3dmodels/Beetle'

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

const App = () => {
  return (
    <div className="app">
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

          <Beetle position={[0, 1, 0]} />

          <Pillar position={[5, 2.5, -5]} userData={{ id: 'pillar-1' }} />
        </Physics>

        {/* 
      @ts-ignore */}
        <PerspectiveCamera
          position={[0, 3, -6]}
          rotation={[0, 3.14, 0]}
          near={0.01}
          far={1000}
          makeDefault
        />
        {/* 
      @ts-ignore */}
        <OrbitControls screenSpacePanning={false} />
      </Canvas>

      <div style={{ position: 'absolute', top: 30, left: 40 }}>
        <pre>
          Must run on descktop and fullscreen!
          <br />
          WASD to drive, space to brake
          <br />R to reset
        </pre>
      </div>
    </div>
  )
}

export default App
