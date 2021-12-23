import { useState } from 'react'
import Button from 'src/components/Button'
import Select from 'src/components/Input_Select'
import Text from 'src/components/Text'
import { useKeyPress } from 'src/hooks/useKeyPress'
import { BoxImg, CylinderImg } from 'src/res/images'
import { USERDATA_PILLAR, USERDATA_WALL } from 'src/res/userDataName'
import { IEditableObject } from 'src/types/EditableObject'
import { TPhysicType } from 'src/types/PhysicType'

const optionsCollide = [
  { label: 'Do not touch', value: USERDATA_WALL },
  { label: 'Touchable', value: USERDATA_PILLAR },
]
const optionsPhysic = [
  { label: 'Static', value: 'Static' },
  { label: 'Dynamic', value: 'Dynamic' },
]

interface IProps {
  className?: string
  onAddObject: (obj: any) => void
  onSave: () => void
  selectedObj: IEditableObject | null
  onEditObject: (obj: IEditableObject) => void
}

const ModelListSideMenu = ({
  className = '',
  onAddObject,
  onSave,
  selectedObj,
  onEditObject,
}: IProps) => {
  const [isSideMenu, setSideMenu] = useState(true)

  useKeyPress(['q', 'Q'], (pressed: boolean) => {
    if (pressed) {
      setSideMenu((prev) => !prev)
    }
  })
  const changeObjProp = (
    value: TPhysicType,
    propName: keyof Pick<IEditableObject, 'collideType' | 'physicType'>,
  ) => {
    if (selectedObj) {
      onEditObject({
        ...selectedObj,
        [propName]: value,
      })
    }
  }

  return (
    <div className={className}>
      <div
        className={`bg-black bg-opacity-70 overflow-x-hidden overflow-y-auto transition-all h-screen ${
          isSideMenu ? 'w-80' : 'w-0'
        }`}
      >
        <div className="text-white px-2 py-1">
          <Text className="mb-4">Primitives:</Text>
          <div className="flex space-x-4">
            <MenuItem
              src={BoxImg}
              onClick={() =>
                onAddObject({
                  id: Date.now(),
                  objectType: 'box',
                  position: [0, 0.5, 0],
                  physicType: 'Static',
                  collideType: USERDATA_WALL,
                })
              }
            />
            <MenuItem
              src={CylinderImg}
              onClick={() =>
                onAddObject({
                  id: Date.now(),
                  objectType: 'cylinder',
                  position: [0, 0.5, 0],
                  physicType: 'Static',
                  collideType: USERDATA_WALL,
                })
              }
            />
          </div>

          <Button className="mt-20" onClick={onSave}>
            Save
          </Button>
        </div>

        {selectedObj && (
          <div className="text-white ml-2 mt-5">
            <Text weight="black">Editable object config</Text>
            <div className="mt-4">
              <p>Physic type:</p>
              <Select
                value={selectedObj.physicType}
                options={optionsPhysic}
                onChange={(v) => changeObjProp(v, 'physicType')}
              />
            </div>

            <div className="mt-4">
              <p>Collision type:</p>
              <Select
                value={selectedObj.collideType}
                options={optionsCollide}
                onChange={(v) => changeObjProp(v, 'collideType')}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ModelListSideMenu

interface IItemProps {
  src: string
  alt?: string
  onClick: () => void
}

const MenuItem = ({ src, alt = '', onClick }: IItemProps) => {
  return (
    <button
      onClick={onClick}
      className="w-16 h-16 transform transition hover:scale-105 select-none"
    >
      <img src={src} alt={alt} className="w-full h-full select-none" />
    </button>
  )
}
