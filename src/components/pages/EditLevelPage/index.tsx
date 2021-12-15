import { OrbitControls, TransformControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useState } from 'react'
import BoxFiber from 'src/components/levels/BoxFiber'
import PlaneFiber from 'src/components/levels/PlaneFiber'
import GameMenu from 'src/components/ui/GameMenu'
import ModelListSideMenu from 'src/components/ui/ModelListSideMenu'
import { useKeyPress } from 'src/hooks/useKeyPress'
// import create from 'zustand'

// const [useStore] = create((set) => ({
//   count: 0,
//   welcome: true,
//   api: {
//     pong(velocity) {
//       ping.currentTime = 0
//       ping.volume = clamp(velocity / 20, 0, 1)
//       ping.play()
//       if (velocity > 4) set((state) => ({ count: state.count + 1 }))
//     },
//     reset: (welcome) =>
//       set((state) => ({ welcome, count: welcome ? state.count : 0 })),
//   },
// }))

// const [useStore] = create((set) => ({
//   objects: [],
//   api: {
//     addObject(object) {

//       set((state) => ({...state, objects}))
//     }
//   }
// }))

const EditLevelPage = () => {
  const [editMode, setEditMode] = useState('translate')
  const [selectedObjId, setSelectedObjId] = useState<string | null>(null)

  useKeyPress(['w', 'e', 'r'], (pressed: boolean, key: string) => {
    if (pressed) {
      const mode = key === 'r' ? 'scale' : key === 'e' ? 'rotate' : 'translate'
      setEditMode(mode)
    }
  })

  // const welcome = useStore((state) => state.welcome)
  // const { pong } = useStore((state) => state.api)

  return (
    <main className="h-screen relative">
      <GameMenu className="absolute z-50" />
      <ModelListSideMenu className="absolute right-0 top-0 z-50" />

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
        <PlaneFiber rotation={[-Math.PI / 2, 0, 0]} receiveShadow />
        <TransformControls
          showZ={selectedObjId === '1'}
          showY={selectedObjId === '1'}
          showX={selectedObjId === '1'}
          enabled={selectedObjId === '1'}
          onClick={() => setSelectedObjId('1')}
          onMouseDown={(e) => {
            console.log(e)
          }}
          mode={editMode}
          position={[0, 0.5, 0]}
        >
          <BoxFiber castShadow />
        </TransformControls>

        <TransformControls
          showZ={selectedObjId === '2'}
          showY={selectedObjId === '2'}
          showX={selectedObjId === '2'}
          enabled={selectedObjId === '2'}
          onClick={() => setSelectedObjId('2')}
          mode={editMode}
          position={[10, 0.5, 0]}
        >
          <BoxFiber castShadow />
        </TransformControls>

        <TransformControls
          showZ={selectedObjId === '3'}
          showY={selectedObjId === '3'}
          showX={selectedObjId === '3'}
          enabled={selectedObjId === '3'}
          onClick={(e) => {
            console.log(e)
            setSelectedObjId('3')
          }}
          mode={editMode}
          position={[20, 0.5, 0]}
        >
          <BoxFiber castShadow />
        </TransformControls>

        <OrbitControls makeDefault />
      </Canvas>
    </main>
  )
}

export default EditLevelPage
