import { USERDATA_WALL } from 'src/res/userDataName'
import { IEditableObject } from 'src/types/EditableObject'

const transformEditObjToPlay = (obj: IEditableObject): any => {
  const newObj = {
    ...obj,
    args:
      obj.scale &&
      (obj.objectType === 'cylinder'
        ? // @ts-ignore
          [obj.scale[0], obj.scale[2], obj.scale[1], 16]
        : obj.scale),
    type: obj.physicType || 'Static',
    userData: {
      id: obj.id === 'arrow' ? 'arrow' : obj.collideType || USERDATA_WALL,
    },
  }

  delete newObj.scale
  delete newObj.physicType
  delete newObj.collideType

  return newObj
}

export default transformEditObjToPlay
