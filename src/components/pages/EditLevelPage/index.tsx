import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ObjectWithTransformControl from 'src/components/levels/ObjectWithTransformControl'
import PlaneFiber from 'src/components/levels/PlaneFiber'
import GameMenu from 'src/components/ui/GameMenu'
import ModelListSideMenu from 'src/components/ui/ModelListSideMenu'
import { useKeyPress } from 'src/hooks/useKeyPress'
import { CUSTOM_LEVELS } from 'src/res/localStorageNames'
import { HREF_MENU } from 'src/res/routes'
import { EditMode } from 'src/types/EditMode'
import transformEditObjToPlay from 'src/utils/transformEditObjToPlay'
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
      position: [6, 0, 5],
    },
    {
      id: '1',
      objectType: 'box',
      position: [0, 0.5, 0],
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
        const updatedList = [
          ...objects.slice(0, index),
          ...objects.slice(index + 1),
        ]
        set((state: any) => ({ ...state, objects: updatedList }))
      }
    },
    editObject(object: any) {
      const objects = get().objects
      const index = objects.findIndex((obj: any) => obj.id === object.id)
      const updatedObject = {
        ...objects[index],
        ...object,
      }
      if (index >= 0) {
        const updatedList = [
          ...objects.slice(0, index),
          updatedObject,
          ...objects.slice(index + 1),
        ]

        set((state: any) => ({ ...state, objects: updatedList }))
      }
    },
  },
}))

const EditLevelPage = () => {
  const navigate = useNavigate()
  const [editMode, setEditMode] = useState(EditMode.Translate)
  const [selectedObjId, setSelectedObjId] = useState<string | null>(null)

  const objects = useStore((state: any) => state.objects)
  const { addObject, deleteObject, editObject } = useStore(
    (state: any) => state.api,
  )

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

  const save = () => {
    const existedLevels = localStorage.getItem(CUSTOM_LEVELS)
    const levels = existedLevels ? JSON.parse(existedLevels) : []

    const index = objects.findIndex((obj: any) => obj.id === 'car')
    const objectListWithoutCar = [
      ...objects.slice(0, index),
      ...objects.slice(index + 1),
    ]
    const carObject = objects[index]

    const newObject = {
      id: Date.now(),
      img: '/img/no-image.png',
      car: carObject,
      objects: objectListWithoutCar.map((obj) => transformEditObjToPlay(obj)),
    }

    localStorage.setItem(CUSTOM_LEVELS, JSON.stringify([newObject, ...levels]))
    navigate(`/${HREF_MENU}`, { replace: true })
  }

  return (
    <main className="h-screen relative">
      <GameMenu className="absolute z-50" />
      <ModelListSideMenu
        className="absolute right-0 top-0 z-50"
        onAddObject={addObject}
        onSave={save}
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
              onEdit={editObject}
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
