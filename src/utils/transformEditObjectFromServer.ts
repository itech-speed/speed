import { USERDATA_WALL } from 'src/res/userDataName'
import { IEditableObject } from 'src/types/EditableObject'

const transformEditObjectFromServer = (obj: any): IEditableObject => {
  const newObj = {
    ...obj,
    position: obj.position && [obj.position.x, obj.position.y, obj.position.z],
    rotation: obj.rotation && [obj.rotation.x, obj.rotation.y, obj.rotation.z],
    scale:
      obj.size &&
      (obj.objectType === 'cylinder'
        ? [obj.size.x, obj.size.z, obj.size.y]
        : [obj.size.x, obj.size.y, obj.size.z]),
    physicType: obj.physicType || 'Static',
    collideType: obj.collideType || USERDATA_WALL,
  }
  if (!obj.size) {
    delete newObj.scale
  }
  delete newObj.size

  return newObj
}

export default transformEditObjectFromServer
