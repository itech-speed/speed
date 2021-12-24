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
    value: string,
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
    <>
      {selectedObj && (
        <div className="text-white mt-5">
          <Text weight="black">Editable object config</Text>
          <div className="mt-1">
            <p className="mb-2">Physic type:</p>
            <Radio
              value={selectedObj.physicType}
              options={optionsPhysic}
              onChange={(v) => changeObjProp(v, 'physicType')}
            />
          </div>

          <div className="mt-3">
            <p className="mb-2">Collision type:</p>
            <Radio
              value={selectedObj.collideType}
              options={optionsCollide}
              onChange={(v) => changeObjProp(v, 'collideType')}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default SetTypesMenu
