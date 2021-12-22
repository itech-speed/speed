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
import { HREF_MENU, PATH_LEVEL } from 'src/res/routes'
import { IEditableObject } from 'src/types/EditableObject'
import { EditMode } from 'src/types/EditMode'
import create from 'zustand'

import { getLevels } from '../../api/get'
import { createLevel } from '../../api/post'
import { updateLevel } from '../../api/update'
import transformCarFromServer from '../../utils/transformCarFromServer'
import transformEditObjectFromServer from '../../utils/transformEditObjectFromServer'
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
  const [customLevels, setCustomLevels] = useState<any>(null)

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

  const save = async () => {
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
      car: transformLevelObjToServer(carObject),
      objects: objectListWithoutCar.map((obj) =>
        transformLevelObjToServer(obj),
      ),
    }

    if (editableLevel.current) {
      // @ts-ignore
      await updateLevel(newObject, editableLevel.current.uid)
    } else await createLevel(newObject)

    navigate(`/${HREF_MENU}`, { replace: true })
  }

  const onEditObject = (obj: IEditableObject) => {
    editObject(obj)
    setSelectedObj(obj)
  }

  useEffect(() => {
    ;(async () => {
      // @ts-ignore
      setCustomLevels(await getLevels())
    })()
  }, [])

  useEffect(() => {
    if (!customLevels) return

    let levelObjects = defaultObjs as IEditableObject[]
    const editableLevelId = params[PATH_LEVEL]
    if (editableLevelId) {
      const curLevel = customLevels.find(
        (i: any) => i.id.toString() === editableLevelId,
      )
      if (curLevel) {
        editableLevel.current = curLevel
        const objects = curLevel.objects.map((i: any) =>
          transformEditObjectFromServer(i),
        )

        levelObjects = [transformCarFromServer(curLevel.car), ...objects]
      }
    }

    setObjects(levelObjects)
    return () => {
      editableLevel.current = null
    }
  }, [customLevels])

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
