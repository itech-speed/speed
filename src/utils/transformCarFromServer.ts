import { IEditableObject } from '../types/EditableObject'

const transformCarFromServer = (obj: any): IEditableObject => {
  const newObj = {
    ...obj,
    position: obj.position && [obj.position.x, obj.position.y, obj.position.z],
    rotation: obj.rotation && [obj.rotation.x, obj.rotation.y, obj.rotation.z],
  }

  if (!obj.rotation) {
    delete newObj.rotation
  }
  delete newObj.size

  return newObj
}

export default transformCarFromServer
