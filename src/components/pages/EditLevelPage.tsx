import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import getLevels from 'src/api/requests/getLevels'
import postLevel from 'src/api/requests/postLevel'
import updateLevel from 'src/api/requests/updateLevel'
import EditMenu from 'src/components/Menu_Edit'
import GameMenu from 'src/components/Menu_Game'
import ObjectWithTransformControl from 'src/components/models/ObjectWithTransformControl'
import PlaneFiber from 'src/components/models/PlaneFiber'
import { useStore } from 'src/components/Zustand_EditLevelPage'
import { useKeyPress } from 'src/hooks/useKeyPress'
import defaultObjs from 'src/res/defaultEditObj.json'
import { HREF_MENU, PATH_LEVEL } from 'src/res/routes'
import { IDatabaseLevel } from 'src/types/DatabaseObject'
import { IEditableObject } from 'src/types/EditableObject'
import { EditMode } from 'src/types/EditMode'
import transformBDCarToPlay from 'src/utils/transformBDCarToPlay'
import transformDBObjectToEdit from 'src/utils/transformDBObjectToEdit'
import transformEditObjToDB from 'src/utils/transformEditObjToDB'

const EditLevelPage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const editableLevel = useRef<IDatabaseLevel | null>(null)

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

  const save = async () => {
    const index = objects.findIndex((obj) => obj.id === 'car')
    const objectListWithoutCar = [
      ...objects.slice(0, index),
      ...objects.slice(index + 1),
    ]
    const carObject = objects[index]

    const newObject = {
      id: editableLevel.current
        ? editableLevel.current.id
        : Date.now().toString(),
      img: '/img/no-image.png',
      car: transformEditObjToDB(carObject),
      objects: objectListWithoutCar.map((obj) => transformEditObjToDB(obj)),
    }

    if (editableLevel.current && editableLevel.current.uid) {
      await updateLevel(newObject, editableLevel.current.uid)
    } else await postLevel(newObject)

    navigate(`/${HREF_MENU}`, { replace: true })
  }

  const onEditObject = (obj: IEditableObject) => {
    editObject(obj)
    setSelectedObj(obj)
  }

  useEffect(() => {
    const setStartSetup = async () => {
      let levelObjects = defaultObjs as IEditableObject[]
      const editableLevelId = params[PATH_LEVEL]
      if (editableLevelId) {
        const customLevels = await getLevels()
        const customLevel = customLevels.find(
          (i) => i.id.toString() === editableLevelId,
        )
        if (customLevel) {
          editableLevel.current = customLevel
          const objects = customLevel.objects.map((i) =>
            transformDBObjectToEdit(i),
          )

          levelObjects = [transformBDCarToPlay(customLevel.car), ...objects]
        }
      }

      setObjects(levelObjects)
    }

    setStartSetup()

    return () => {
      editableLevel.current = null
    }
  }, [])

  return (
    <main className="h-screen relative">
      <GameMenu className="absolute z-50" />
      <EditMenu
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
