import Text from 'src/components/Text'
import { USERDATA_PILLAR, USERDATA_WALL } from 'src/res/userDataName'
import { IEditableObject } from 'src/types/EditableObject'

import Radio from './Input_Radio'

const optionsCollide = [
  { label: 'Do not touch', value: USERDATA_WALL },
  { label: 'Touchable', value: USERDATA_PILLAR },
]
const optionsPhysic = [
  { label: 'Static', value: 'Static' },
  { label: 'Dynamic', value: 'Dynamic' },
]

interface IProps {
  selectedObj: IEditableObject | null
  onEditObject: (obj: IEditableObject) => void
}

const SetTypesMenu = ({ selectedObj, onEditObject }: IProps) => {
  const changeObjProp = (
    value: any,
    propName: keyof Pick<
      IEditableObject,
      'collideType' | 'physicType' | 'castShadow'
    >,
  ) => {
    if (selectedObj) {
      console.log(value)

      onEditObject({
        ...selectedObj,
        [propName]: value,
      })
    }
  }

  return (
    <>
      {selectedObj && selectedObj.id !== 'car' && selectedObj.id !== 'arrow' && (
        <div className="text-white mt-5 bg-gray-800 p-2 rounded">
          <Text weight="black">Editable object config</Text>
          <div className="mt-1 bg-gray-600 p-1 rounded">
            <p className="mb-2">Physic type:</p>
            <Radio
              value={selectedObj.physicType}
              options={optionsPhysic}
              onChange={(v) => changeObjProp(v, 'physicType')}
            />
          </div>

          <div className="mt-3 bg-gray-600 p-1 rounded">
            <p className="mb-2">Collision type:</p>
            <Radio
              value={selectedObj.collideType}
              options={optionsCollide}
              onChange={(v) => changeObjProp(v, 'collideType')}
            />
          </div>

          <div className="flex items-center space-x-4">
            <p>Cast Shadow:</p>
            <input
              type="checkbox"
              defaultChecked={
                selectedObj.castShadow !== undefined
                  ? selectedObj.castShadow
                  : true
              }
              onChange={(e) => changeObjProp(e.target.checked, 'castShadow')}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default SetTypesMenu
