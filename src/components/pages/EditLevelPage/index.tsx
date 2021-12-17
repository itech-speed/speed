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

const [useStore]: any = create((set: any, get: any) => ({
  objects: [
    {
      id: 'car',
      objectType: 'car',
      position: [2, 0.6, 2],
    },
    {
      id: 'arrow',
      objectType: 'arrow',
      position: [4, 0, 4],
    },
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
    deleteObject(id: string) {
      const objects = get().objects
      const index = objects.findIndex((obj: any) => obj.id === id)
      if (index >= 0) {
        console.log(objects.slice(index))

        const updatedList = [
          ...objects.slice(0, index),
          ...objects.slice(index + 1),
        ]
        console.log(updatedList)

        set((state: any) => ({ ...state, objects: updatedList }))
      }
    },
  },
}))

const EditLevelPage = () => {
  const [editMode, setEditMode] = useState(EditMode.Translate)
  const [selectedObjId, setSelectedObjId] = useState<string | null>(null)

  const objects = useStore((state: any) => state.objects)
  const { addObject, deleteObject } = useStore((state: any) => state.api)

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
  useKeyPress(
    ['Delete'],
    (pressed: boolean) => {
      if (pressed) {
        deleteObject(selectedObjId)
      }
    },
    [selectedObjId],
  )

  return (
    <main className="h-screen relative">
      <GameMenu className="absolute z-50" />
      <ModelListSideMenu
        className="absolute right-0 top-0 z-50"
        onAddObject={addObject}
      />

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

        {objects &&
          objects.map((obj: any) => (
            <ObjectWithTransformControl
              key={obj.id}
              editMode={editMode}
              id={obj.id}
              selectedObjId={selectedObjId}
              onClick={setSelectedObjId}
              position={obj.position}
              objectType={obj.objectType}
            />
          ))}

        <OrbitControls makeDefault />
      </Canvas>
    </main>
  )
}

export default EditLevelPage
