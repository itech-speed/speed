import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useState } from 'react'
import ObjectWithTransformControl from 'src/components/levels/ObjectWithTransformControl'
import PlaneFiber from 'src/components/levels/PlaneFiber'
import GameMenu from 'src/components/ui/GameMenu'
import ModelListSideMenu from 'src/components/ui/ModelListSideMenu'
import { useKeyPress } from 'src/hooks/useKeyPress'
import { EditMode } from 'src/types/EditMode'
import create from 'zustand'

const [useStore]: any = create((set: any) => ({
  objects: [
    {
      id: '1',
      objectType: 'box',
      position: [0, 0.5, 0],
    },
    {
      id: '2',
      objectType: 'box',
      position: [10, 0.5, 0],
    },
    {
      id: '3',
      objectType: 'box',
      position: [20, 0.5, 0],
    },
  ],
  api: {
    addObject(object: any) {
      set((state: any) => ({ ...state, objects: [...state.objects, object] }))
    },
  },
}))

const EditLevelPage = () => {
  // const objectCounter = useRef(0)
  const [editMode, setEditMode] = useState(EditMode.Translate)
  const [selectedObjId, setSelectedObjId] = useState<string | null>(null)

  useKeyPress(['w', 'e', 'r'], (pressed: boolean, key: string) => {
    if (pressed) {
      const mode =
        key === 'r'
          ? EditMode.Scale
          : key === 'e'
          ? EditMode.Rotate
          : EditMode.Translate
      setEditMode(mode)
    }
  })

  const objects = useStore((state: any) => state.objects)
  console.log(objects)

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

        <ObjectWithTransformControl
          editMode={editMode}
          id="1"
          selectedObjId={selectedObjId}
          onClick={setSelectedObjId}
          position={[0, 0.5, 0]}
          objectType="box"
        />

        <ObjectWithTransformControl
          editMode={editMode}
          id="2"
          selectedObjId={selectedObjId}
          onClick={setSelectedObjId}
          position={[10, 0.5, 0]}
          objectType="box"
        />

        <ObjectWithTransformControl
          editMode={editMode}
          id="3"
          selectedObjId={selectedObjId}
          onClick={setSelectedObjId}
          position={[20, 0.5, 0]}
          objectType="box"
        />

        <OrbitControls makeDefault />
      </Canvas>
    </main>
  )
}

export default EditLevelPage
