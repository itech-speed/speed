import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ObjectWithTransformControl from 'src/components/levels/ObjectWithTransformControl'
import PlaneFiber from 'src/components/levels/PlaneFiber'
import GameMenu from 'src/components/ui/GameMenu'
import ModelListSideMenu from 'src/components/ui/ModelListSideMenu'
import { useKeyPress } from 'src/hooks/useKeyPress'
import defaultObjs from 'src/res/defaultEditObj.json'
import { CUSTOM_LEVELS } from 'src/res/localStorageNames'
import { HREF_MENU, PATH_LEVEL } from 'src/res/routes'
import { IEditableObject } from 'src/types/EditableObject'
import { EditMode } from 'src/types/EditMode'
import transformEditObjToPlay from 'src/utils/transformEditObjToPlay'
import transformPlayObjToEdit from 'src/utils/transformPlayObjToEdit'
import create from 'zustand'

import transformLevelObjToServer from '../../utils/transformLevelObjToServer'

interface IStore {
  objects: IEditableObject[]
  api: {
    setObjects: (objects: IEditableObject[]) => void
    addObject: (object: IEditableObject) => void
    deleteObject: (id: string) => void
    editObject: (object: IEditableObject) => void
  }
}

const useStore = create<IStore>((set, get) => ({
  objects: defaultObjs as IEditableObject[],
  api: {
    setObjects(objects) {
      set((state) => ({ ...state, objects }))
    },
    addObject(object) {
      set((state) => ({ ...state, objects: [...state.objects, object] }))
    },
    deleteObject(id) {
      const objects = get().objects
      const index = objects.findIndex((obj) => obj.id === id)
      if (index >= 0) {
        const updatedList = [
          ...objects.slice(0, index),
          ...objects.slice(index + 1),
        ]
        set((state) => ({ ...state, objects: updatedList }))
      }
    },
    editObject(object) {
      const objects = get().objects
      const index = objects.findIndex((obj) => obj.id === object.id)
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

        set((state) => ({ ...state, objects: updatedList }))
      }
    },
  },
}))

const EditLevelPage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const editableLevel = useRef(null)

  const [editMode, setEditMode] = useState(EditMode.Translate)
  const [selectedObj, setSelectedObj] = useState<IEditableObject | null>(null)

  const objects = useStore((state) => state.objects)
  const { setObjects, addObject, deleteObject, editObject } = useStore(
    (state) => state.api,
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
      if (pressed && selectedObj) {
        deleteObject(selectedObj.id)
      }
    },
    [selectedObj],
  )

  const save = () => {
    const existedLevels = localStorage.getItem(CUSTOM_LEVELS)
    const localStorageLevels = existedLevels ? JSON.parse(existedLevels) : []
    let levelsWithoutEditable

    if (editableLevel.current) {
      levelsWithoutEditable = localStorageLevels.filter(
        // @ts-ignore
        (i: any) => i.id.toString() !== editableLevel.current.id.toString(),
      )
    }

    const levels = editableLevel.current
      ? levelsWithoutEditable
      : localStorageLevels

    const index = objects.findIndex((obj) => obj.id === 'car')
    const objectListWithoutCar = [
      ...objects.slice(0, index),
      ...objects.slice(index + 1),
    ]
    const carObject = objects[index]

    const newObject = {
      id: editableLevel.current
        ? // @ts-ignore
          editableLevel.current.id
        : Date.now().toString(),
      img: '/img/no-image.png',
      car: carObject,
      objects: objectListWithoutCar.map((obj) => transformEditObjToPlay(obj)),
    }

    const newTransformed = objectListWithoutCar.map((obj) =>
      transformLevelObjToServer(obj),
    )

    console.log({ newObject, objectListWithoutCar, newTransformed })

    localStorage.setItem(CUSTOM_LEVELS, JSON.stringify([newObject, ...levels]))
    navigate(`/${HREF_MENU}`, { replace: true })
  }

  const onEditObject = (obj: IEditableObject) => {
    editObject(obj)
    setSelectedObj(obj)
  }

  useEffect(() => {
    let levelObjects = defaultObjs as IEditableObject[]
    const editableLevelId = params[PATH_LEVEL]
    if (editableLevelId) {
      const existedLevels = localStorage.getItem(CUSTOM_LEVELS)
      const levels = existedLevels ? JSON.parse(existedLevels) : []

      const curLevel = levels.find(
        (i: any) => i.id.toString() === editableLevelId,
      )
      if (curLevel) {
        editableLevel.current = curLevel
        const objects = curLevel.objects.map((i: any) =>
          transformPlayObjToEdit(i),
        )

        levelObjects = [curLevel.car, ...objects]
      }
    }

    setObjects(levelObjects)
    return () => {
      editableLevel.current = null
    }
  }, [])

  return (
    <main className="h-screen relative">
      <GameMenu className="absolute z-50" />
      <ModelListSideMenu
        className="absolute right-0 top-0 z-50"
        onAddObject={addObject}
        onSave={save}
        selectedObj={selectedObj}
        onEditObject={onEditObject}
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
          objects.map((obj) => (
            <ObjectWithTransformControl
              key={obj.id}
              obj={obj}
              editMode={editMode}
              selectedObj={selectedObj}
              onClick={setSelectedObj}
              onEdit={onEditObject}
            />
          ))}

        <OrbitControls makeDefault />
      </Canvas>
    </main>
  )
}

export default EditLevelPage
